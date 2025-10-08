import { EntriesRepository } from '@/Domain/Entries/EntriesRepository';
import { normalizePlate } from '@/Domain/Entries/plate.utils.js';

const KEY = 'pc:entries-active';

function safeParse(json) {
    try { return JSON.parse(json); } catch { return null; }
}

export class LocalEntriesRepository extends EntriesRepository {
    async listActive() {
        const raw = localStorage.getItem(KEY);
        const parsed = raw ? safeParse(raw) : null;
        return Array.isArray(parsed) ? parsed : [];
    }

    async add(entry) {
        const list = await this.listActive();
        list.push(entry);
        localStorage.setItem(KEY, JSON.stringify(list));
    }

    async removeByPlate(plate) {
        const target = normalizePlate(plate);
        const list = await this.listActive();
        const idx = list.findIndex(e => {
        try { return normalizePlate(e.plate) === target; } catch { return false; }
        });
        if (idx >= 0) {
        const [removed] = list.splice(idx, 1);
        localStorage.setItem(KEY, JSON.stringify(list));
        return removed;
        }
        return null;
    }
}
