import { LocalSlotsRepository } from '@/infrastructure/slots/LocalSlotsRepository'
import { SlotsService } from '@/services/slots.service'

const di = {
    slotsRepository: new LocalSlotsRepository(),  
}
di.slotsService = new SlotsService(di.slotsRepository)

export default di
