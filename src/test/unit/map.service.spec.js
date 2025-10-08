import { describe, it, expect } from 'vitest'
import { MapService } from '@/services/map.service'

describe('MapService', () => {
    const repo = {
        async load() { return { rows: 2, cols: 3, occupied: ['A1'] } },
        async save(x) { this.saved = x }
    }
    const svc = new MapService(repo)

    it('genera cuadrícula con ocupados', async () => {
        const grid = await svc.getGrid()
        expect(grid).toHaveLength(2)
        expect(grid[0]).toHaveLength(3)
        expect(grid.flat().some(c => c.code === 'A1')).toBe(true)
    })
})
