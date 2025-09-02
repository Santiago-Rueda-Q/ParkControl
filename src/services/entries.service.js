import { DEFAULT_CATEGORIES } from '@/Domain/Slots/categories'
import di from '@/services/di'

    export class EntriesService {
    /** @param {import('@/Domain/Entries/EntriesRepository').EntriesRepository} repo */
    constructor(repo) { this.repo = repo }

    async listActive() {
        return await this.repo.listActive()
    }

    async summaryByType() {
        const [cats, active] = await Promise.all([
        di.slotsService.getCategoriesWithValues(),
        this.repo.listActive(),
        ])

        const counters = Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c.key, 0]))
        for (const e of active) {
        if (counters[e.type] != null) counters[e.type]++
        }

        return cats.map(c => ({
        key: c.key, label: c.label, icon: c.icon,
        occupied: counters[c.key] ?? 0,
        capacity: Number(c.value ?? 0)
        }))
    }

    async canPark(type) {
        const s = await this.summaryByType()
        const row = s.find(x => x.key === type)
        if (!row) return false
        return row.occupied < row.capacity
    }

    /**
     * @param {import('@/Domain/Entries/Entry.schema').Entry} data
     */
    async registerEntry(data) {
        if (!data.plate || !data.type || !data.slotCode) {
        throw new Error('Faltan datos obligatorios (placa, tipo, espacio).')
        }
        const active = await this.repo.listActive()
        const exists = active.some(e => e.plate.toUpperCase() === data.plate.toUpperCase())
        if (exists) throw new Error('La placa ya tiene un ingreso activo.')

        if (!(await this.canPark(data.type))) {
        throw new Error('No hay cupos disponibles para el tipo seleccionado.')
        }

        const entry = {
        ...data,
        vip: !!data.vip,
        disability: !!data.disability,
        client: data.client ?? null,
        startedAtISO: new Date().toISOString(),
        }
        return await this.repo.create(entry)
    }

    async checkOutByPlate(plate) {
        return await this.repo.checkOutByPlate(plate)
    }
    }
