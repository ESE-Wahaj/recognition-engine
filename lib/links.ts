import path from 'path'
import fs from 'fs'
import { RESOURCE_LINKS, type ResourceLinks } from './config'

const DATA_FILE = path.join(process.cwd(), 'data', 'links.json')

export function readLinks(): ResourceLinks {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(raw) as ResourceLinks
    }
  } catch {
    // fall through to defaults
  }
  return RESOURCE_LINKS
}

export function writeLinks(links: ResourceLinks): void {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2), 'utf-8')
}
