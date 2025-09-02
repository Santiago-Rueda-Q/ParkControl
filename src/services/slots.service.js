import { DEFAULT_CATEGORIES } from '@/Domain/Slots/categories'

export class SlotsService {
    /** @param {import('@/domain/slots/SlotsRepository').SlotsRepository} repo */
    constructor(repo) { this.repo = repo }

    async getCategoriesWithValues() {
        const saved = await this.repo.load()
        return DEFAULT_CATEGORIES.map(c => ({ ...c, value: Number(saved?.[c.key] ?? 0) }))
    }

    async saveConfig(categories) {
        const data = {}
        for (const c of categories) {
        const v = Number(c.value ?? 0)
        data[c.key] = Number.isFinite(v) && v >= 0 ? Math.trunc(v) : 0
        }
        await this.repo.save(data)
        return data
    }
}
