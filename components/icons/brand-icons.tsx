'use client'

// Real brand logos via official CDN (cdn.simpleicons.org)
// Falls back to colored text if image fails

import { useState } from 'react'

export const BrandIcons: Record<string, {
  name: string
  color: string
  darkColor?: string
  slug: string // simple-icons slug
}> = {
  // Payments
  stripe: { name: 'Stripe', color: '#635BFF', slug: 'stripe' },
  mercadopago: { name: 'Mercado Pago', color: '#00B1EA', slug: 'mercadopago' },
  
  // Databases
  supabase: { name: 'Supabase', color: '#3FCF8E', slug: 'supabase' },
  neon: { name: 'Neon', color: '#00E599', slug: 'neon' },
  airtable: { name: 'Airtable', color: '#18BFFF', slug: 'airtable' },
  
  // Deploy
  vercel: { name: 'Vercel', color: '#000000', darkColor: '#FFFFFF', slug: 'vercel' },
  github: { name: 'GitHub', color: '#181717', darkColor: '#FFFFFF', slug: 'github' },
  cloudflare: { name: 'Cloudflare', color: '#F38020', slug: 'cloudflare' },
  
  // AI
  openai: { name: 'OpenAI', color: '#412991', slug: 'openai' },
  anthropic: { name: 'Anthropic', color: '#191919', darkColor: '#FFFFFF', slug: 'anthropic' },
  
  // Auth
  clerk: { name: 'Clerk', color: '#6C47FF', slug: 'clerk' },
  
  // Communication
  twilio: { name: 'Twilio', color: '#F22F46', slug: 'twilio' },
  resend: { name: 'Resend', color: '#000000', darkColor: '#FFFFFF', slug: 'resend' },
  
  // Web3
  alchemy: { name: 'Alchemy', color: '#363FF9', slug: 'alchemy' },
  
  // Dev Tools
  cursor: { name: 'Cursor', color: '#000000', darkColor: '#FFFFFF', slug: 'cursor' },
  replit: { name: 'Replit', color: '#F26207', slug: 'replit' },
  react: { name: 'React', color: '#61DAFB', slug: 'react' },
  
  // Services  
  docusign: { name: 'DocuSign', color: '#FFCC22', slug: 'docusign' },
  jotform: { name: 'Jotform', color: '#FF6100', slug: 'jotform' },
  googlemaps: { name: 'Google Maps', color: '#4285F4', slug: 'googlemaps' },
  
  // Additional from user images
  bybit: { name: 'Bybit', color: '#F7A600', slug: 'bybit' },
  safe: { name: 'Safe (Gnosis)', color: '#12FF80', slug: 'safe' },
}

export type BrandIconKey = keyof typeof BrandIcons

interface BrandIconProps {
  name: BrandIconKey
  size?: number
  className?: string
  showLabel?: boolean
}

export function BrandIcon({ name, size = 24, className = '', showLabel = false }: BrandIconProps) {
  const icon = BrandIcons[name]
  const [imgError, setImgError] = useState(false)
  
  if (!icon) return null

  const iconColor = icon.color.replace('#', '')

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {!imgError ? (
        <img
          src={`https://cdn.simpleicons.org/${icon.slug}/${iconColor}`}
          alt={icon.name}
          width={size}
          height={size}
          className="transition-transform duration-200 hover:scale-110"
          onError={() => setImgError(true)}
          crossOrigin="anonymous"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-lg font-bold"
          style={{
            width: size,
            height: size,
            backgroundColor: `${icon.color}20`,
            color: icon.color,
            fontSize: size * 0.4,
          }}
        >
          {icon.name.charAt(0)}
        </div>
      )}
      {showLabel && (
        <span className="text-xs text-muted-foreground">{icon.name}</span>
      )}
    </div>
  )
}

export function getAllBrandIcons() {
  return Object.entries(BrandIcons).map(([key, value]) => ({
    id: key as BrandIconKey,
    ...value,
  }))
}
