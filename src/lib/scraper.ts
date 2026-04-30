import * as cheerio from 'cheerio'

export interface ScrapedContent {
  title: string
  description: string
  headings: string[]
  bodyText: string
  url: string
}

export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

  const response = await fetch(normalizedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; TrouveTonInfluBot/1.0)',
    },
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) {
    throw new Error(`Impossible de charger l'URL: ${response.status}`)
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  // Supprimer scripts, styles, nav, footer
  $('script, style, nav, footer, header, aside, .cookie, #cookie, [class*="cookie"], [class*="popup"]').remove()

  const title = $('title').text().trim() || $('meta[property="og:title"]').attr('content') || ''

  const description =
    $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || ''

  const headings: string[] = []
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 2 && text.length < 120) headings.push(text)
  })

  const paragraphs: string[] = []
  $('p, li').each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 30) paragraphs.push(text)
  })

  const bodyText = paragraphs.slice(0, 15).join(' ').slice(0, 2000)

  return {
    title: title.slice(0, 200),
    description: description.slice(0, 500),
    headings: headings.slice(0, 10),
    bodyText,
    url: normalizedUrl,
  }
}
