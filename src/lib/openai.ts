import OpenAI from 'openai'
import { ScrapedContent } from './scraper'

const KEYWORDS_BY_NICHE: Record<string, string[]> = {
  tech: ['tech', 'saas', 'software', 'startup', 'ai', 'code', 'digital', 'product'],
  fashion: ['fashion', 'mode', 'style', 'collection', 'look', 'vêtement', 'luxe', 'streetwear'],
  food: ['food', 'cuisine', 'recette', 'restaurant', 'chef', 'gastronomie', 'meal', 'drink'],
  fitness: ['fitness', 'sport', 'workout', 'yoga', 'musculation', 'nutrition', 'santé', 'running'],
}

const FALLBACK_KEYWORDS: Record<string, string[]> = {
  tech: ['SaaS', 'Innovation', 'Produit', 'Digital', 'Automatisation'],
  fashion: ['Mode', 'Style', 'Tendances', 'Lifestyle', 'Luxe'],
  food: ['Cuisine', 'Recettes', 'Gastronomie', 'Food', 'Lifestyle'],
  fitness: ['Fitness', 'Bien-être', 'Sport', 'Santé', 'Performance'],
  default: ['Lifestyle', 'Créativité', 'Contenu', 'Communauté', 'Branding'],
}

export interface NicheAnalysis {
  niche: string // Ex: "E-commerce Mode Féminine"
  keywords: string[] // 5-8 mots-clés représentatifs
  targetAudience: string // Ex: "Femmes 18-35 ans intéressées par la mode"
  confidence: number // 0-100
  language: string // 'fr' | 'en' | etc.
}

function detectLanguage(text: string): string {
  const lower = text.toLowerCase()
  const frenchHints = [' le ', ' la ', ' les ', ' de ', ' des ', 'avec', 'pour', 'votre', 'nous', 'vous']
  return frenchHints.some((hint) => lower.includes(hint)) ? 'fr' : 'en'
}

function fallbackNicheAnalysis(content: ScrapedContent): NicheAnalysis {
  const corpus = `${content.title} ${content.description} ${content.headings.join(' ')} ${content.bodyText}`.toLowerCase()

  let bestKey: keyof typeof KEYWORDS_BY_NICHE | 'default' = 'default'
  let bestScore = 0

  for (const [key, words] of Object.entries(KEYWORDS_BY_NICHE) as [keyof typeof KEYWORDS_BY_NICHE, string[]][]) {
    const score = words.reduce((sum, word) => sum + (corpus.includes(word) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      bestKey = key
    }
  }

  const nicheLabel: Record<string, string> = {
    tech: 'Tech & SaaS',
    fashion: 'Mode & Lifestyle',
    food: 'Food & Cuisine',
    fitness: 'Fitness & Bien-être',
    default: 'Lifestyle & Business',
  }

  return {
    niche: nicheLabel[bestKey],
    keywords: FALLBACK_KEYWORDS[bestKey].slice(0, 5),
    targetAudience:
      bestKey === 'default'
        ? 'Audience générale intéressée par des contenus premium et tendances.'
        : `Audience intéressée par ${nicheLabel[bestKey].toLowerCase()}.`,
    confidence: bestScore > 0 ? Math.min(88, 65 + bestScore * 4) : 60,
    language: detectLanguage(corpus),
  }
}

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === 'sk-...') {
    return null
  }

  return new OpenAI({ apiKey })
}

export async function analyzeNiche(content: ScrapedContent): Promise<NicheAnalysis> {
  const client = getOpenAIClient()

  if (!client) {
    return fallbackNicheAnalysis(content)
  }

  const prompt = `Analyse ce site web et détermine sa niche principale.

URL: ${content.url}
Titre: ${content.title}
Description: ${content.description}
Titres: ${content.headings.join(', ')}
Contenu: ${content.bodyText.slice(0, 800)}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "niche": "niche principale en 2-4 mots",
  "keywords": ["mot1", "mot2", "mot3", "mot4", "mot5"],
  "targetAudience": "description de l'audience cible",
  "confidence": 85,
  "language": "fr"
}`

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 300,
    })

    const result = JSON.parse(response.choices[0]?.message?.content || '{}')

    return {
      niche: result.niche || 'Contenu Général',
      keywords: Array.isArray(result.keywords) ? result.keywords : [],
      targetAudience: result.targetAudience || '',
      confidence: Math.min(100, Math.max(0, result.confidence || 70)),
      language: result.language || 'fr',
    }
  } catch {
    return fallbackNicheAnalysis(content)
  }
}
