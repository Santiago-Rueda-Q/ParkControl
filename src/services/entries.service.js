// src/Application/Entries/EntriesService.js
import { normalizePlate } from '@/Domain/Entries/plate.utils.js';

export class EntriesService {
    /** @param {import('@/Domain/Entries/ntriesRepository').EntriesRepository} repo */
    constructor(repo) { this.repo = repo }

    async listActive() {
        const list = await this.repo.listActive();
        return list
        .filter(e => e && e.startedAtISO)
        .sort((a,b) => new Date(a.startedAtISO) - new Date(b.startedAtISO));
    }

    async summaryByType() {
        const list = await this.listActive();
        const summary = { car:0, motorcycle:0, bicycle:0, vip:0, disability:0 };
        for (const e of list) {
        if (summary[e.type] != null) summary[e.type]++; // cuenta por tipo
        if (e.vip) summary.vip++;                       // flags como atributos
        if (e.disability) summary.disability++;
        }
        return summary;
    }

    async isPlateActive(plate) {
        const p = normalizePlate(plate); // <-- siempre normalizado
        const list = await this.listActive();
        return list.some(e => normalizePlate(e.plate) === p);
    }

    async isSlotOccupied(slotCode) {
        const p = String(slotCode||'').toUpperCase().trim();
        const list = await this.listActive();
        return list.some(e => String(e.slotCode||'').toUpperCase().trim() === p);
    }

    /**
     * @typedef {Object} EntryInput
     * @property {string} plate
     * @property {'car'|'motorcycle'|'bicycle'} type
     * @property {string} slotCode
     * @property {boolean} [vip]
     * @property {boolean} [disability]
     * @property {string} [client]
     */

    /** @param {EntryInput} data */
    async registerEntry(data) {
        if (!data || typeof data !== 'object') {
        throw new Error('Entrada inválida.');
        }
        if (!data.type)     throw new Error('Seleccione tipo de vehículo.');
        if (!data.slotCode) throw new Error('Seleccione espacio.');

        // normalización de placa centralizada
        let plate;
        try {
        plate = normalizePlate(data.plate ?? '');
        } catch {
        // fallback: si no hay placa legible, usar marcador
        plate = 'SIN-PLT';
        }

        if (await this.isPlateActive(plate)) {
        throw new Error('La placa ya tiene un ingreso activo.');
        }
        if (await this.isSlotOccupied(data.slotCode)) {
        throw new Error('El espacio seleccionado ya está ocupado.');
        }

        const entry = {
        id: (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`),
        plate,
        type: data.type,
        slotCode: String(data.slotCode).toUpperCase().trim(),
        vip: !!data.vip,
        disability: !!data.disability,
        client: data.client?.trim() || 'Cliente Ocasional',
        startedAtISO: new Date().toISOString(),
        };

        await this.repo.add(entry);
        return entry;
    }

    async checkOutByPlate(plate) {
        const p = normalizePlate(plate);
        return await this.repo.removeByPlate(p);
    }
}
