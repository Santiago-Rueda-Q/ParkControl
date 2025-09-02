import { EntriesRepository } from '@/Domain/Entries/EntriesRepository'
const STORAGE_KEY = 'pc:entries-active'

export class LocalEntriesRepository extends EntriesRepository {
    async listActive() {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    }
    async create(entry) {
        const list = await this.listActive()
        list.push(entry)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
        return entry
    }
    async checkOutByPlate(plate) {
        const list = await this.listActive()
        const next = list.filter(e => (e.plate || '').toUpperCase() !== plate.toUpperCase())
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return list.length - next.length   // 1 si removió, 0 si no existía
    }
}
