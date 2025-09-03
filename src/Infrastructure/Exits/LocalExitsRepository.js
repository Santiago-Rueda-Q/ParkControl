import ExitsRepository from '@/Domain/Exits/ExitsRepository'

const KEY = 'park:exits:v1'

export default class LocalExitsRepository extends ExitsRepository {
  _read() {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  }
  _write(list) { localStorage.setItem(KEY, JSON.stringify(list)) }

  async list({ page=1, size=20, q='' } = {}) {
    const all = this._read()
    const filtered = q ? all.filter(e => e.plate.includes(q.toUpperCase())) : all
    const start = (page-1)*size
    return { total: filtered.length, rows: filtered.slice(start, start + size) }
  }

  async create(exitRecord) {
    const list = this._read()
    list.unshift(exitRecord)
    this._write(list)
    return exitRecord
  }

  async findById(id) {
    return this._read().find(r => r.id === id) || null
  }
}
