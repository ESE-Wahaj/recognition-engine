import path from 'path'
import fs from 'fs'
import { RESOURCE_LINKS, type ResourceLinks } from './config'

const DATA_FILE = path.join(process.cwd(), 'data', 'links.json')

export function readLinks(): ResourceLinks {
  try {
    // On Vercel, check environment variables first
    if (process.env.VERCEL) {
      const envLinks = process.env.RESOURCE_LINKS
      if (envLinks) {
        try {
          return JSON.parse(envLinks) as ResourceLinks
        } catch (e) {
          console.warn('Failed to parse RESOURCE_LINKS env var:', e)
        }
      }
    }

    // Try filesystem (works on local development)
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(raw) as ResourceLinks
    }
  } catch (error) {
    console.warn('Failed to read links, using defaults:', error)
  }
  return RESOURCE_LINKS
}

export function writeLinks(links: ResourceLinks): void {
  try {
    // Try to write to filesystem (works on local)
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2), 'utf-8')
    console.log('Links saved to data/links.json')
  } catch (error) {
    console.warn('Filesystem write failed:', error)
    
    // On Vercel, filesystem writes aren't persisted
    if (process.env.VERCEL) {
      console.error(
        'Running on Vercel: Filesystem is read-only. ' +
        'To persist changes, set up Vercel KV (recommended) or store the links in environment variables. ' +
        'Current changes will be lost when the function ends.'
      )
      throw new Error(
        'Cannot persist changes on Vercel. Please set up Vercel KV storage or contact your administrator.'
      )
    }
    
    throw error
  }
}
