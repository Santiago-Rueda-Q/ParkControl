import { MapRepository } from '@/Domain/Map/MapRepository'

const KEY = 'pc:map-config'

export class LocalMapRepository extends MapRepository {
    async loadConfig() {
        const raw = localStorage.getItem(KEY)
        const cfg = raw ? JSON.parse(raw) : null
        return cfg ?? { rows: 3, cols: 5, vip: ['A3'], disability: ['A1','A2'] }
    }
    async saveConfig(cfg) {
        localStorage.setItem(KEY, JSON.stringify(cfg))
    }
}