export class EntriesService {
    /** @param {import('@/Domain/Entries/EntriesRepository').EntriesRepository} repo */
    constructor(repo) { this.repo = repo }

    normalizePlate(raw) {

        const cleaned = String(raw ?? '')
        .toUpperCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[‐-‒–—−]/g, '-')        
        .replace(/[^A-Z0-9]/g, '');        

        const letters = (cleaned.match(/[A-Z]/g) || []).join('').slice(0, 3);
        const digits  = (cleaned.match(/\d/g)   || []).join('').slice(0, 3);

        if (letters.length === 3 && digits.length === 3) {
        return `${letters}-${digits}`;
        }
        throw new Error('Placa inválida (AAA-123).');
    }

    async listActive() {
        const list = await this.repo.listActive()
        return list.sort((a,b) => new Date(a.startedAtISO) - new Date(b.startedAtISO))
    }

    async summaryByType() {
        const list = await this.listActive()
        const m = { car:0, motorcycle:0, bicycle:0, vip:0, disability:0 }
        for (const e of list) {
        if (m[e.type] != null) m[e.type]++
        if (e.vip)        m.vip++
        if (e.disability) m.disability++
        }
        return m
    }

    async isPlateActive(plate) {
        const list = await this.listActive()
        const p = plate.toUpperCase()
        return list.some(e => (e.plate||'').toUpperCase() === p)
    }

    async isSlotOccupied(slotCode) {
        const p = (slotCode||'').toUpperCase()
        const list = await this.listActive()
        return list.some(e => (e.slotCode||'').toUpperCase() === p)
    }

    async registerEntry(data) {
        const plate = this.normalizePlate(data.plate)  

        if (!data.type)     throw new Error('Seleccione tipo de vehículo.')
        if (!data.slotCode) throw new Error('Seleccione espacio.')

        if (await this.isPlateActive(plate)) {
        throw new Error('La placa ya tiene un ingreso activo.')
        }
        if (await this.isSlotOccupied(data.slotCode)) {
        throw new Error('El espacio seleccionado ya está ocupado.')
        }

        const entry = {
        id: crypto?.randomUUID?.() || String(Date.now()),
        plate,
        type: data.type,
        slotCode: String(data.slotCode).toUpperCase(),
        vip: !!data.vip,
        disability: !!data.disability,
        client: data.client || 'Cliente Ocasional',
        startedAtISO: new Date().toISOString(),
        }

        await this.repo.add(entry)
        return entry
    }

    async checkOutByPlate(plate) {
        return await this.repo.removeByPlate(plate)
    }
}
