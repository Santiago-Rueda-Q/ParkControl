export class ExitsService {

  constructor(repo, entriesService, ratesService) {
    this.repo = repo
    this.entriesService = entriesService
    this.ratesService = ratesService
  }

  async listActiveFiltered(query = '', page = 1, size = 6) {
    const q = (query || '').trim().toUpperCase()
    const all = await this.entriesService.listActive()
    const filtered = q ? all.filter(e => (e.plate || '').toUpperCase().includes(q)) : all
    const total = filtered.length
    const start = (page - 1) * size
    const items = filtered.slice(start, start + size)
    return { items, total }
  }

  async findActiveByPlate(plate) {
    const p = (plate || '').toUpperCase()
    const all = await this.entriesService.listActive()
    return all.find(e => (e.plate || '').toUpperCase() === p) || null
  }

  async buildInvoice(plate) {
    const entry = await this.findActiveByPlate(plate)
    if (!entry) throw new Error('No se encontró un ingreso activo con esa placa.')

    const endedAtISO = new Date().toISOString()
    const hours = this.ratesService.billableHours(entry.startedAtISO, endedAtISO)
    const rate  = await this.ratesService.pricePerHour(entry.type, { vip: entry.vip, disability: entry.disability })
    const total = Math.round(hours * rate * 100) / 100

    return { entry, hours, ratePerHour: rate, total, endedAtISO }
  }

  async processExit(plate) {
    const invoice = await this.buildInvoice(plate)
    const removed = await this.entriesService.checkOutByPlate(plate)
    if (!removed) throw new Error('No había un ingreso activo para esa placa.')
    await this.repo.append({
      ...invoice.entry,
      endedAtISO: invoice.endedAtISO,
      hours: invoice.hours,
      ratePerHour: invoice.ratePerHour,
      total: invoice.total,
    })
    return invoice
  }

  async history() { return await this.repo.list() }
}
