export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin'

export interface Influencer {
  id: string
  name: string
  handle: string
  platform: Platform
  avatar: string // URL ou initiales fallback
  niche: string
  followers: number
  engagementRate: number // Pourcentage ex: 3.2
  matchScore: number // 0-100
  location: string
  bio: string
  profileUrl: string
}

export interface AnalysisResult {
  url: string
  detectedNiche: string
  nicheKeywords: string[]
  confidence: number // 0-100
  influencers: Influencer[]
  stats: {
    totalFound: number
    avgEngagement: number
    totalReach: number
    topScore: number
  }
}

export interface AnalyzeRequest {
  url: string
}

export interface AnalyzeResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
}
