export class RatesService {
    /** @param {import('@/Domain/Rates/RatesRepository').RatesRepository} repo */
    constructor(repo) { this.repo = repo }

    async pricePerHour(type, flags = {}) {
        const r = await this.repo.getRates()
        let base = r[type] ?? 0
        if (flags.vip)        base *= (r.vipFactor ?? 1)
        if (flags.disability) base *= (r.disabilityFactor ?? 1)
        return Math.round(base * 100) / 100
    }

    billableHours(startISO, endISO = new Date().toISOString()) {
        const ms = new Date(endISO) - new Date(startISO)
        const h  = Math.ceil(ms / 3_600_000)
        return Math.max(1, h)
    }
}
