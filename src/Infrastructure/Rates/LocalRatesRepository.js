import { RatesRepository } from '@/Domain/Rates/RatesRepository'

export class LocalRatesRepository extends RatesRepository {
    async getRates() {
        return {
            car: 58,
            motorcycle: 35,
            bicycle: 8,
            vipFactor: 1.2,
            disabilityFactor: 1.0,
        }
    }
}