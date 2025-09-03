import { DEFAULT_CATEGORIES } from '@/Domain/Slots/categories'

export class SlotsService {
    /** @param {import('@/Domain/Slots/SlotsRepository').SlotsRepository} repo */
    constructor(repo) { this.repo = repo }

    normalize(config) {
        const src = (config && (config.capacities || config.slots)) || config || {}
        return {
        car:         Number(src.car)         || 0,
        motorcycle:  Number(src.motorcycle)  || 0,
        bicycle:     Number(src.bicycle)     || 0,
        vip:         Number(src.vip)         || 0,
        disability:  Number(src.disability)  || 0,
        }
    }

    async load() {
        const raw = await this.repo.load()
        return this.normalize(raw)
    }

    async save(data) {
        const norm = this.normalize(data)
        await this.repo.save(norm)
        return norm
    }

    async getCapacities() { return await this.load() }

    async getCategoriesWithValues() {
        const caps = await this.getCapacities()
        return DEFAULT_CATEGORIES.map(c => ({ ...c, value: Number(caps[c.key] || 0) }))
    }
}
