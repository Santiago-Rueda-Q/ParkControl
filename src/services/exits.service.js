import { v4 as uuid } from 'uuid'

export default class ExitsService {
  constructor({ exitsRepo, entriesRepo, feesService, slotsService }) {
    this.exitsRepo = exitsRepo
    this.entriesRepo = entriesRepo
    this.feesService = feesService
    this.slotsService = slotsService
  }

  async recordExitByPlate(plate, { cashierId=null, paymentMethod='cash' } = {}) {
    const normalized = (plate || '').toUpperCase().trim()
    const entry = await this.entriesRepo.findByPlate(normalized)
    if (!entry) throw new Error('No active entry found')

    const endedAt = new Date().toISOString()
    const startedAt = new Date(entry.startedAtISO)
    const durationMin = Math.ceil((new Date(endedAt) - startedAt) / 60000)
    const amountCents = this.feesService.calculate({ type: entry.type, minutes: durationMin })

    const exitRecord = {
      id: uuid(),
      entryId: entry.id,
      plate: entry.plate,
      type: entry.type,
      slotCode: entry.slotCode,
      startedAtISO: entry.startedAtISO,
      endedAtISO: endedAt,
      durationMinutes: durationMin,
      amountCents,
      cashierId,
      paymentMethod,
      createdAt: new Date().toISOString()
    }
    await this.exitsRepo.create(exitRecord)

    await this.entriesRepo.removeByPlate(normalized)
    if (this.slotsService && typeof this.slotsService.decrementOccupied === 'function') {
      await this.slotsService.decrementOccupied(entry.type)
    }

    return exitRecord
  }

  async list({ page=1, size=20, q='' } = {}) {
    return this.exitsRepo.list({ page, size, q })
  }
}
