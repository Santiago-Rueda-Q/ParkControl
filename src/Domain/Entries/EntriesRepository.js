export class EntriesRepository {
    /** @returns {Promise<Array<object>>} */
    async listActive() { throw new Error('Not implemented') }
    /** @param {object} entry */
    async create(entry) { throw new Error('Not implemented') }
    /** @param {string} plate */
    async checkOutByPlate(plate) { throw new Error('Not implemented') }
}
