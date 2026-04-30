import { NextRequest, NextResponse } from 'next/server'
import { scrapeUrl } from '@/lib/scraper'
import { analyzeNiche } from '@/lib/openai'
import { findInfluencers, computeStats } from '@/lib/influencers'
import { AnalyzeResponse } from '@/types'

const API_TIMEOUT_MS = 25_000

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout: analyse trop longue (>25s)')), timeoutMs)

    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

export async function POST(req: NextRequest): Promise<NextResponse<AnalyzeResponse>> {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, error: 'URL invalide ou manquante' }, { status: 400 })
    }

    const result = await withTimeout(
      (async () => {
        // 1. Scraper le site
        const scrapedContent = await scrapeUrl(url)

        // 2. Analyser la niche via OpenAI (ou fallback local)
        const nicheAnalysis = await analyzeNiche(scrapedContent)

        // 3. Trouver les influenceurs correspondants
        const influencers = await findInfluencers(nicheAnalysis, 12)

        // 4. Calculer les stats du dashboard
        const stats = computeStats(influencers)

        return {
          url: scrapedContent.url,
          detectedNiche: nicheAnalysis.niche,
          nicheKeywords: nicheAnalysis.keywords,
          confidence: nicheAnalysis.confidence,
          influencers,
          stats,
        }
      })(),
      API_TIMEOUT_MS
    )

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('[/api/analyze] Error:', error)
    const message = error instanceof Error ? error.message : 'Erreur serveur inconnue'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
