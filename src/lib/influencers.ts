import { Influencer } from '@/types'
import { NicheAnalysis } from './openai'
import { generateMockInfluencers } from './mock-data'

export async function findInfluencers(niche: NicheAnalysis, count: number = 12): Promise<Influencer[]> {
  const useMock = process.env.USE_MOCK_DATA === 'true' || !process.env.MODASH_API_KEY || process.env.MODASH_API_KEY === '...'

  if (useMock) {
    return generateMockInfluencers(niche.niche, count)
  }

  // Appel Modash (à implémenter quand la clé API est disponible)
  return searchModash(niche, count)
}

async function searchModash(niche: NicheAnalysis, count: number): Promise<Influencer[]> {
  // Placeholder pour l'intégration Modash
  // https://modash.io/docs/api
  // En attendant, fallback sur mock
  console.warn('Modash API not fully implemented, falling back to mock data')
  return generateMockInfluencers(niche.niche, count)
}

export function computeStats(influencers: Influencer[]) {
  if (influencers.length === 0) return { totalFound: 0, avgEngagement: 0, totalReach: 0, topScore: 0 }

  const totalFound = influencers.length
  const avgEngagement = parseFloat((influencers.reduce((sum, i) => sum + i.engagementRate, 0) / totalFound).toFixed(1))
  const totalReach = influencers.reduce((sum, i) => sum + i.followers, 0)
  const topScore = Math.max(...influencers.map((i) => i.matchScore))

  return { totalFound, avgEngagement, totalReach, topScore }
}
