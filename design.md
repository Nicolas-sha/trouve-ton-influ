# design.md — Trouve-Ton-Influ

> Charte graphique complète. Ce fichier est la référence unique pour toutes les décisions visuelles du projet. Cursor doit s'y référer pour chaque composant, page, et interaction.

---

## 1. Identité visuelle

**Nom du produit** : Trouve-Ton-Influ  
**Tagline** : *Find the right voice for your brand.*  
**Positionnement** : Premium SaaS, luxe & exclusif. L'outil que les vraies marques utilisent pour trouver les bons créateurs.  
**Ambiance** : Dark-first, violet profond, contrastes forts. Proche de Linear, Vercel, ou Resend — mais avec plus de personnalité et de couleur.

---

## 2. Palette de couleurs

### Mode Dark (défaut)

| Token | Valeur | Usage |
|---|---|---|
| `--bg-base` | `#0A0A0F` | Background principal (quasi-noir avec teinte violet) |
| `--bg-surface` | `#111118` | Cards, sidebars, panels |
| `--bg-elevated` | `#1A1A26` | Modals, dropdowns, tooltips |
| `--bg-subtle` | `#1E1E2E` | Hover states, inputs |
| `--border-default` | `#2A2A3D` | Bordures par défaut |
| `--border-subtle` | `#1E1E2E` | Séparateurs légers |
| `--border-glow` | `rgba(139, 92, 246, 0.4)` | Glow violet sur focus / hover |
| `--accent-primary` | `#8B5CF6` | Violet principal (actions, CTAs, highlights) |
| `--accent-secondary` | `#6D28D9` | Violet foncé (hover des CTAs) |
| `--accent-glow` | `rgba(139, 92, 246, 0.15)` | Background des badges, chips actifs |
| `--accent-gradient` | `linear-gradient(135deg, #8B5CF6, #6366F1)` | Gradient subtil CTA / cards premium |
| `--text-primary` | `#F4F4F8` | Texte principal |
| `--text-secondary` | `#9090A8` | Sous-titres, labels, muted |
| `--text-tertiary` | `#5A5A72` | Placeholders, hints |
| `--text-on-accent` | `#FFFFFF` | Texte sur fond violet |
| `--success` | `#22C55E` | Indicateurs positifs |
| `--warning` | `#F59E0B` | Score moyen, alertes |
| `--danger` | `#EF4444` | Erreurs |
| `--info` | `#38BDF8` | Infos neutres |

### Mode Light

| Token | Valeur | Usage |
|---|---|---|
| `--bg-base` | `#FAFAFA` | Background principal |
| `--bg-surface` | `#FFFFFF` | Cards, panels |
| `--bg-elevated` | `#F4F4F8` | Modals |
| `--bg-subtle` | `#EEEEFC` | Hover, inputs |
| `--border-default` | `#E2E2EE` | Bordures |
| `--border-glow` | `rgba(139, 92, 246, 0.3)` | Focus glow |
| `--accent-primary` | `#7C3AED` | Violet (légèrement plus sombre en light) |
| `--text-primary` | `#0A0A0F` | Texte principal |
| `--text-secondary` | `#6060788` | Muted |
| `--text-tertiary` | `#A0A0B8` | Hints |

> **Règle** : le toggle dark/light est géré via `data-theme="dark"` sur `<html>`. Toutes les variables CSS sont redéfinies dans `[data-theme="light"]`.

---

## 3. Typographie

**Font principale** : [Geist](https://vercel.com/font) — importée via `next/font/local` ou CDN Vercel.  
**Font display (titres H1/H2)** : Geist en `font-weight: 600–700`, `letter-spacing: -0.03em`.  
**Font mono** : Geist Mono — pour les stats, scores, URLs, données techniques.

```css
/* Import dans globals.css */
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');

font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Échelle typographique

| Rôle | Size | Weight | Letter-spacing | Usage |
|---|---|---|---|---|
| `display` | `48px` | `700` | `-0.04em` | Hero titles |
| `h1` | `36px` | `700` | `-0.03em` | Titres de page |
| `h2` | `24px` | `600` | `-0.02em` | Sections |
| `h3` | `18px` | `600` | `-0.01em` | Card titles |
| `body-lg` | `16px` | `400` | `0` | Corps de texte principal |
| `body` | `14px` | `400` | `0` | Texte courant |
| `body-sm` | `13px` | `400` | `0` | Labels, metadata |
| `caption` | `12px` | `400` | `0.01em` | Hints, badges |
| `mono` | `13px` | `400` | `0` | Stats, scores, URLs |

---

## 4. Espacements & Layout

```css
/* Spacing scale — utiliser exclusivement ces valeurs */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

**Layout principal** : sidebar fixe (`240px`) + contenu fluide.  
**Max-width contenu** : `1200px` centré.  
**Gutter horizontal** : `24px` sur mobile, `40px` sur desktop.  
**Grid résultats** : `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`, gap `16px`.

---

## 5. Border radius

```css
--radius-sm:  6px;   /* Badges, chips, inputs */
--radius-md:  10px;  /* Boutons, small cards */
--radius-lg:  14px;  /* Cards principales */
--radius-xl:  20px;  /* Modals, panels */
--radius-full: 9999px; /* Pills, avatars */
```

---

## 6. Composants UI

### Boutons

```css
/* Primaire (CTA violet) */
.btn-primary {
  background: var(--accent-primary);
  color: var(--text-on-accent);
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
}
.btn-primary:hover {
  background: var(--accent-secondary);
  box-shadow: 0 0 16px rgba(139, 92, 246, 0.35);
}

/* Secondaire (outline) */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  transition: border-color 0.15s, background 0.15s;
}
.btn-secondary:hover {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
}

/* Ghost (texte seul) */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  transition: color 0.15s;
}
.btn-ghost:hover { color: var(--text-primary); }
```

### Cards influenceurs

```css
.influencer-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.influencer-card:hover {
  border-color: var(--border-glow);
  box-shadow: 0 0 24px rgba(139, 92, 246, 0.08);
}
```

### Input de recherche (URL)

```css
.url-input {
  width: 100%;
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 14px 18px;
  font-size: 15px;
  color: var(--text-primary);
  font-family: 'Geist Mono', monospace;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.url-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}
```

### Score badge (match %)

```css
/* Score élevé (≥75) : vert */
.score-high   { background: rgba(34,197,94,0.12);  color: #22C55E; }
/* Score moyen (50–74) : amber */
.score-medium { background: rgba(245,158,11,0.12); color: #F59E0B; }
/* Score bas (<50) : rouge */
.score-low    { background: rgba(239,68,68,0.12);  color: #EF4444; }

.score-badge {
  font-family: 'Geist Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}
```

### Stat cards (dashboard)

```css
.stat-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
}
/* Gradient subtil en haut des stat cards premium */
.stat-card.featured {
  background: linear-gradient(160deg, #1A1428 0%, var(--bg-surface) 60%);
  border-color: rgba(139, 92, 246, 0.25);
}
```

---

## 7. Effets visuels

### Glow sur les éléments actifs
```css
/* Utilisé sur : CTA hover, input focus, card active, score badge */
box-shadow: 0 0 20px rgba(139, 92, 246, 0.25);
```

### Gradient CTA (bouton principal ou section hero)
```css
background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
```

### Gradient subtle sur cards featured
```css
background: linear-gradient(160deg, rgba(139,92,246,0.08) 0%, transparent 50%);
```

### Règle d'usage
- **Pas de glassmorphism** (backdrop-filter: blur → exclure)
- **Pas d'animations d'entrée complexes** (priorité à la vitesse de dev)
- **Les glows sont réservés** aux états hover/focus/actif — jamais statiques sur tous les éléments
- **Gradient uniquement** sur le bouton CTA principal et les cards "featured"

---

## 8. Icônes

**Librairie** : [Lucide React](https://lucide.dev/) — `npm install lucide-react`  
**Taille par défaut** : `16px` (inline), `20px` (boutons), `24px` (navigation)  
**Stroke width** : `1.5` (par défaut Lucide, ne pas modifier)  
**Couleur** : hérite de `currentColor` — ne jamais hardcoder

---

## 9. Animations

Garder les animations minimes vu le délai de 1h30. Seules ces 3 sont autorisées :

```css
/* 1. Fade-in de page / résultats */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeUp 0.25s ease forwards; }

/* 2. Pulse loading (skeleton) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.skeleton { animation: pulse 1.5s ease infinite; }

/* 3. Spin (loader) */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner { animation: spin 0.8s linear infinite; }
```

---

## 10. Structure des pages

### Page principale (/)
- Hero centré : input URL large + bouton "Analyser"
- Sous l'input : 3 bullets de réassurance (ex. "Analyse en 10 sec", "20+ réseaux sociaux", "Score de pertinence")
- Fond : `--bg-base` avec un glow violet diffus centré derrière le hero (radial-gradient)

### Page résultats (/results)
- Header : URL analysée + niche détectée + badge
- Row de stat cards : nb influenceurs trouvés, engagement moyen, reach total, meilleur score
- Grille de cards influenceurs (avec skeleton loading)
- Chaque card : avatar, nom, réseau (icône), followers, engagement rate, score de match (badge coloré), bouton "Voir le profil"

### Sidebar (navigation)
- Logo + nom en haut
- Nav : Recherche, Historique, Favoris
- Bas : toggle dark/light, avatar user

---

## 11. Tailwind config (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#8B5CF6',
          dark:    '#6D28D9',
          glow:    'rgba(139,92,246,0.15)',
        },
        surface: {
          base:     '#0A0A0F',
          DEFAULT:  '#111118',
          elevated: '#1A1A26',
          subtle:   '#1E1E2E',
        },
        border: {
          DEFAULT: '#2A2A3D',
          subtle:  '#1E1E2E',
          glow:    'rgba(139,92,246,0.4)',
        },
      },
      fontFamily: {
        sans: ['Geist', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '14px',
        xl:   '20px',
        full: '9999px',
      },
      boxShadow: {
        glow:    '0 0 20px rgba(139, 92, 246, 0.25)',
        'glow-sm': '0 0 12px rgba(139, 92, 246, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## 12. Règles Cursor (à respecter absolument)

1. **Toujours utiliser les tokens CSS** — jamais de couleur hardcodée sauf dans le tailwind.config
2. **Un composant = un fichier** dans `/components/ui/`
3. **Pas de style inline** sauf pour les valeurs dynamiques (ex: largeur d'une progress bar)
4. **Les scores sont toujours affichés en Geist Mono**
5. **Chaque card influenceur** doit avoir le hover glow violet
6. **Le bouton CTA principal** (Analyser / Lancer la recherche) doit toujours avoir le gradient violet + glow au hover
7. **Skeleton loaders** obligatoires pendant le chargement des résultats
8. **Les icônes Lucide** uniquement — pas d'emojis dans l'UI
