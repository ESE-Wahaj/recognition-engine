import path from 'node:path'
import fs from 'node:fs'
import { Redis } from '@upstash/redis'
import { RESOURCE_LINKS, type ResourceLinks } from './config'

const DATA_FILE = path.join(process.cwd(), 'data', 'links.json')
const KV_KEY = 'resource_links'

const hasKV = () =>
  !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

export async function readLinks(): Promise<ResourceLinks> {
  if (hasKV()) {
    try {
      const stored = await getRedis().get<ResourceLinks>(KV_KEY)
      if (stored) return stored
    } catch (e) {
      console.warn('[links] Redis read failed, falling back to filesystem:', e)
    }
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(raw) as ResourceLinks
    }
  } catch (e) {
    console.warn('[links] Filesystem read failed, using defaults:', e)
  }

  return RESOURCE_LINKS
}

export async function writeLinks(links: ResourceLinks): Promise<void> {
  if (hasKV()) {
    await getRedis().set(KV_KEY, links)
    return
  }

  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2), 'utf-8')
}
