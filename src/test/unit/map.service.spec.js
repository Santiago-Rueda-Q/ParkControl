import { describe, it, expect } from 'vitest'
import { MapService } from '@/services/map.service'

describe('MapService', () => {
  const repo = {
    async load() { return { rows: 2, cols: 3, occupied: ['A1'] } },
    async save(x) { this.saved = x }
  }
  const entriesMock = { async listActive() { return [] } }
  const svc = new MapService(repo, entriesMock)

  it('genera estructura válida del mapa', async () => {
    const grid = await svc.getGrid()

    // 1️⃣ valida que sea array y contenga objetos
    expect(Array.isArray(grid)).toBe(true)
    expect(grid.length).toBeGreaterThan(0)

    // 2️⃣ verifica que cada elemento tenga código y estado
    expect(grid[0]).toHaveProperty('code')
    expect(grid[0]).toHaveProperty('occupied')

    // 3️⃣ confirma que incluye la celda ocupada A1
    const codes = grid.map(c => c.code)
    expect(codes).toContain('A1')
  })
})
