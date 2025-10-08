
import LocalRatesRepository from '@/Infrastructure/Rates/LocalRatesRepository'


export class RatesService {
  constructor(ratesRepository) {

    this.ratesRepository = ratesRepository || new LocalRatesRepository()
  }

  getRates() {
    return this.ratesRepository.getRates()
  }

  saveRates(rates) {
    return this.ratesRepository.saveRates(rates)
  }

  saveRatesConfig(rates) {
    return this.saveRates(rates)
  }
}

export const ratesService = new RatesService(new LocalRatesRepository())

export function getRates() {
  return ratesService.getRates()
}

export function saveRates(rates) {
  return ratesService.saveRates(rates)
}

export function saveRatesConfig(rates) {
  return ratesService.saveRatesConfig(rates)
}

export default ratesService
