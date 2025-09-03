import { EntriesRepository } from '@/Domain/Entries/EntriesRepository'

const KEY = 'pc:entries-active'

export class LocalEntriesRepository extends EntriesRepository {
    async listActive() {
        const raw = localStorage.getItem(KEY)
        return raw ? JSON.parse(raw) : []
    }
    async add(entry) {
        const list = await this.listActive()
        list.push(entry)
        localStorage.setItem(KEY, JSON.stringify(list))
    }
    async removeByPlate(plate) {
        const list = await this.listActive()
        const idx = list.findIndex(e => (e.plate||'').toUpperCase() === plate.toUpperCase())
        if (idx >= 0) {
            const [removed] = list.splice(idx, 1)
            localStorage.setItem(KEY, JSON.stringify(list))
            return removed
        }
        return null
    }
}