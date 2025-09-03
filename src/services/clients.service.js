export class ClientsService {
    constructor(repo) { this.repo = repo }

    async list() { return await this.repo.listAll() }
    async create(data) {
        const name = (data.name || '').trim()
        if (!name) throw new Error('El nombre es obligatorio.')

        const phone = (data.phone || '').trim()
        const email = (data.email || '').trim()
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('El email no es válido.')
        }
        return await this.repo.create({
        name,
        phone,
        email: email.toLowerCase(),
        vip: !!data.vip
        })
    }

    async delete(id) { return await this.repo.delete(id) }
    async searchAndPaginate(query, page = 1, size = 10) {
        const q = (query || '').trim().toLowerCase()
        const all = await this.repo.listAll()
        const filtered = q
        ? all.filter(c =>
            (c.name || '').toLowerCase().includes(q) ||
            (c.phone || '').toLowerCase().includes(q) ||
            (c.email || '').toLowerCase().includes(q))
        : all
        const total = filtered.length
        const start = (page - 1) * size
        const items = filtered.slice(start, start + size)
        return { items, total }
    }
}
