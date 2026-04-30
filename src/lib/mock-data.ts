import { Influencer, Platform } from '@/types'

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatHandle(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
}

const NICHE_INFLUENCERS: Record<string, Partial<Influencer>[]> = {
  tech: [
    { name: 'Alex Dubois', niche: 'Tech & Startups', location: 'Paris, FR', platform: 'twitter' },
    { name: 'Marie Chen', niche: 'IA & Machine Learning', location: 'Lyon, FR', platform: 'youtube' },
    { name: 'Thomas Leroy', niche: 'Dev & Code', location: 'Bordeaux, FR', platform: 'tiktok' },
    { name: 'Sophia Müller', niche: 'Product Design', location: 'Berlin, DE', platform: 'instagram' },
    { name: 'Lucas Martin', niche: 'SaaS & Outils', location: 'Nantes, FR', platform: 'twitter' },
    { name: 'Emma Petit', niche: 'Cybersécurité', location: 'Toulouse, FR', platform: 'youtube' },
    { name: 'Jules Bernard', niche: 'No-Code & Automation', location: 'Strasbourg, FR', platform: 'tiktok' },
    { name: 'Clara Fontaine', niche: 'UX/UI Design', location: 'Lille, FR', platform: 'instagram' },
    { name: 'Nathan Roux', niche: 'Crypto & Web3', location: 'Montpellier, FR', platform: 'twitter' },
    { name: 'Inès Moreau', niche: 'Tech News', location: 'Nice, FR', platform: 'youtube' },
    { name: 'Maxime Girard', niche: 'Cloud & DevOps', location: 'Rennes, FR', platform: 'instagram' },
    { name: 'Camille Durand', niche: 'Entrepreneuriat Tech', location: 'Marseille, FR', platform: 'tiktok' },
  ],
  fashion: [
    { name: 'Léa Rousseau', niche: 'Mode & Style', location: 'Paris, FR', platform: 'instagram' },
    { name: 'Hugo Laurent', niche: 'Streetwear', location: 'Lyon, FR', platform: 'tiktok' },
    { name: 'Chloé Mercier', niche: 'Mode Luxe', location: 'Paris, FR', platform: 'instagram' },
    { name: 'Antoine Simon', niche: 'Mode Homme', location: 'Bordeaux, FR', platform: 'tiktok' },
    { name: 'Jade Lefebvre', niche: 'Mode Durable', location: 'Nantes, FR', platform: 'instagram' },
    { name: 'Baptiste Morel', niche: 'Tendances Mode', location: 'Toulouse, FR', platform: 'youtube' },
    { name: 'Elisa Blanc', niche: 'Accessoires & Bijoux', location: 'Montpellier, FR', platform: 'instagram' },
    { name: 'Romain Guerin', niche: 'Fashion Week', location: 'Paris, FR', platform: 'twitter' },
    { name: 'Pauline Dupont', niche: 'Mode Vintage', location: 'Lille, FR', platform: 'tiktok' },
    { name: 'Victor Lemaire', niche: 'Mode Sportswear', location: 'Nice, FR', platform: 'instagram' },
    { name: 'Sarah Barbier', niche: 'Looks du Jour', location: 'Rennes, FR', platform: 'tiktok' },
    { name: 'Florian Chevalier', niche: 'Mode Minimaliste', location: 'Strasbourg, FR', platform: 'instagram' },
  ],
  food: [
    { name: 'Juliette Colin', niche: 'Cuisine Française', location: 'Paris, FR', platform: 'instagram' },
    { name: 'Pierre Noel', niche: 'Pâtisserie', location: 'Lyon, FR', platform: 'youtube' },
    { name: 'Anaïs Roy', niche: 'Food Healthy', location: 'Bordeaux, FR', platform: 'instagram' },
    { name: 'Mathieu Perrin', niche: 'BBQ & Grillades', location: 'Toulouse, FR', platform: 'tiktok' },
    { name: 'Laura Gauthier', niche: 'Veggie & Vegan', location: 'Nantes, FR', platform: 'instagram' },
    { name: 'Sébastien Faure', niche: 'Chef Pro', location: 'Marseille, FR', platform: 'youtube' },
    { name: 'Mélanie Renard', niche: 'Boulangerie', location: 'Lille, FR', platform: 'instagram' },
    { name: 'Adrien Fournier', niche: 'Street Food', location: 'Nice, FR', platform: 'tiktok' },
    { name: 'Céline Marchand', niche: 'Cocktails & Mixologie', location: 'Strasbourg, FR', platform: 'instagram' },
    { name: 'Guillaume Picard', niche: 'Cuisine du Monde', location: 'Rennes, FR', platform: 'youtube' },
    { name: 'Alice Bonnet', niche: 'Recettes Rapides', location: 'Montpellier, FR', platform: 'tiktok' },
    { name: 'Damien Vasseur', niche: 'Gastronomie', location: 'Paris, FR', platform: 'instagram' },
  ],
  fitness: [
    { name: 'Kevin Arnaud', niche: 'Fitness & Musculation', location: 'Paris, FR', platform: 'instagram' },
    { name: 'Aurélie Dupuis', niche: 'Yoga & Méditation', location: 'Lyon, FR', platform: 'youtube' },
    { name: 'Théo Legrand', niche: 'CrossFit', location: 'Bordeaux, FR', platform: 'instagram' },
    { name: 'Manon Jacquet', niche: 'Nutrition Sportive', location: 'Toulouse, FR', platform: 'tiktok' },
    { name: 'Alexis Bourgeois', niche: 'Running & Trail', location: 'Nantes, FR', platform: 'instagram' },
    { name: 'Lucie Giraud', niche: 'Pilates', location: 'Strasbourg, FR', platform: 'youtube' },
    { name: 'Enzo Remy', niche: 'Calisthenics', location: 'Marseille, FR', platform: 'tiktok' },
    { name: 'Camille Joubert', niche: 'Bien-être & Santé', location: 'Nice, FR', platform: 'instagram' },
    { name: 'Florent Millet', niche: 'Cyclisme', location: 'Rennes, FR', platform: 'twitter' },
    { name: 'Elise Baudoin', niche: 'Danse & Fitness', location: 'Lille, FR', platform: 'tiktok' },
    { name: 'Romain Tissier', niche: 'Natation', location: 'Montpellier, FR', platform: 'youtube' },
    { name: 'Stéphanie Moulin', niche: 'Transformation physique', location: 'Paris, FR', platform: 'instagram' },
  ],
  default: [
    { name: 'Marie Dubois', niche: 'Lifestyle & Tendances', location: 'Paris, FR', platform: 'instagram' },
    { name: 'Nicolas Lambert', niche: 'Contenu Créatif', location: 'Lyon, FR', platform: 'tiktok' },
    { name: 'Sophie Leclerc', niche: 'Vlogs & Daily', location: 'Bordeaux, FR', platform: 'youtube' },
    { name: 'Julien Rousseau', niche: 'Culture & Entertainment', location: 'Nantes, FR', platform: 'twitter' },
    { name: 'Amandine Bertin', niche: 'Reviews & Tests', location: 'Toulouse, FR', platform: 'instagram' },
    { name: 'Clément Marchal', niche: 'Humour & Entertainment', location: 'Strasbourg, FR', platform: 'tiktok' },
    { name: 'Laure Michaud', niche: 'Voyage & Découvertes', location: 'Marseille, FR', platform: 'instagram' },
    { name: 'Quentin Prevost', niche: 'Gaming & Tech', location: 'Nice, FR', platform: 'youtube' },
    { name: 'Jessica Boucher', niche: 'Family & Parentalité', location: 'Rennes, FR', platform: 'instagram' },
    { name: 'David Garnier', niche: 'Business & Finance', location: 'Lille, FR', platform: 'twitter' },
    { name: 'Elodie Collet', niche: 'Art & Créativité', location: 'Montpellier, FR', platform: 'tiktok' },
    { name: 'Bastien Aubert', niche: 'Développement Personnel', location: 'Paris, FR', platform: 'youtube' },
  ],
}

function detectNicheKey(niche: string): string {
  const n = niche.toLowerCase()
  if (n.includes('tech') || n.includes('ia') || n.includes('code') || n.includes('saas') || n.includes('startup')) return 'tech'
  if (n.includes('mode') || n.includes('fashion') || n.includes('style') || n.includes('vêtement')) return 'fashion'
  if (n.includes('food') || n.includes('cuisine') || n.includes('recette') || n.includes('restaurant')) return 'food'
  if (n.includes('fitness') || n.includes('sport') || n.includes('santé') || n.includes('yoga')) return 'fitness'
  return 'default'
}

export function generateMockInfluencers(niche: string, count: number = 12): Influencer[] {
  const key = detectNicheKey(niche)
  const templates = NICHE_INFLUENCERS[key] || NICHE_INFLUENCERS.default

  return templates
    .slice(0, count)
    .map((template, index): Influencer => {
      const followers = randomBetween(8000, 850000)
      const matchScore = Math.max(45, Math.min(98, 95 - index * 4 + randomBetween(-5, 5)))

      return {
        id: `mock-${key}-${index}`,
        name: template.name!,
        handle: formatHandle(template.name!),
        platform: template.platform as Platform,
        avatar: '',
        niche: template.niche!,
        followers,
        engagementRate: parseFloat((randomBetween(15, 85) / 10).toFixed(1)),
        matchScore,
        location: template.location!,
        bio: `Créateur de contenu ${template.niche} avec une communauté engagée.`,
        profileUrl: `https://${template.platform}.com/${formatHandle(template.name!)}`,
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}
