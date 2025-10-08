import { describe, it, expect } from 'vitest'
import { RatesService } from '@/services/rates.service'

describe('RatesService', () => {
    const repoMock = {
        async load() {
        return {
            carPerHour: 5,
            motorcyclePerHour: 3,
            bicyclePerHour: 1,
            vipDiscountPercent: 10,
            disabilityDiscountPercent: 50
        }
        }
    }
    const svc = new RatesService(repoMock)

    it('calcula horas facturables correctamente', () => {
        const start = new Date('2025-10-08T00:00:00Z')
        const end   = new Date('2025-10-08T03:30:00Z')
        const h = svc.billableHours(start, end)
        expect(h).toBeGreaterThanOrEqual(3.5)
    })

    it('aplica descuentos VIP', async () => {
        const rate = await svc.pricePerHour('car', { vip: true, disability: false })
        expect(rate).toBeCloseTo(4.5, 1)
    })

    it('aplica descuentos discapacidad', async () => {
        const rate = await svc.pricePerHour('car', { vip: false, disability: true })
        expect(rate).toBeCloseTo(2.5, 1)
    })

    it('usa tarifas base por tipo', async () => {
        expect(await svc.pricePerHour('motorcycle', {})).toBe(3)
        expect(await svc.pricePerHour('bicycle', {})).toBe(1)
    })
})
