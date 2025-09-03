const A_CODE = 'A'.charCodeAt(0)

export class MapService {
    /** @param {import('./entries.service').EntriesService} entriesService */
    constructor(repo, entriesService) {
        this.repo = repo
        this.entriesService = entriesService
    }

    async getConfig() {
        const cfg = await this.repo.loadConfig()
        return {
            rows: Math.max(1, Number(cfg.rows || 1)),
            cols: Math.max(1, Number(cfg.cols || 1)),
            vip: Array.isArray(cfg.vip) ? cfg.vip : [],
            disability: Array.isArray(cfg.disability) ? cfg.disability : [],
        }
    }

    async saveConfig({ rows, cols, vip = [], disability = [] }) {
        const cfg = { rows: Math.max(1, rows|0), cols: Math.max(1, cols|0), vip, disability }
        await this.repo.saveConfig(cfg)
        return cfg
    }

    generateCodes(rows, cols) {
        const cells = []
        for (let r = 0; r < rows; r++) {
        const prefix = String.fromCharCode(A_CODE + r)
        for (let c = 1; c <= cols; c++) {
            cells.push(`${prefix}${c}`)
        }
        }
        return cells
    }

    async getGrid() {
        const cfg = await this.getConfig()
        const codes = this.generateCodes(cfg.rows, cfg.cols)

        const active = await this.entriesService.listActive()
        const occupied = new Set(active.map(e => String(e.slotCode || '').toUpperCase()))
        const vipSet = new Set((cfg.vip || []).map(x => x.toUpperCase()))
        const disSet = new Set((cfg.disability || []).map(x => x.toUpperCase()))

        return codes.map(code => ({
        code,
        isOccupied: occupied.has(code.toUpperCase()),
        isVip: vipSet.has(code.toUpperCase()),
        isDisability: disSet.has(code.toUpperCase()),
        }))
    }

    async toggleVip(code) {
        const cfg = await this.getConfig()
        const up = code.toUpperCase()
        const set = new Set(cfg.vip.map(x => x.toUpperCase()))
        set.has(up) ? set.delete(up) : set.add(up)
        cfg.vip = Array.from(set)
        await this.saveConfig(cfg)
        return cfg
    }
    async toggleDisability(code) {
        const cfg = await this.getConfig()
        const up = code.toUpperCase()
        const set = new Set(cfg.disability.map(x => x.toUpperCase()))
        set.has(up) ? set.delete(up) : set.add(up)
        cfg.disability = Array.from(set)
        await this.saveConfig(cfg)
        return cfg
    }
}
