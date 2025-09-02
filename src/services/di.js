import { LocalSlotsRepository } from '@/infrastructure/slots/LocalSlotsRepository'
import { SlotsService } from '@/services/slots.service'
import { LocalEntriesRepository } from '@/Infrastructure/Entries/LocalEntriesRepository'
import { EntriesService } from '@/services/entries.service'

const di = {
    slotsRepository: new LocalSlotsRepository(),  
    entriesRepository: new LocalEntriesRepository(),

}
di.slotsService = new SlotsService(di.slotsRepository)
di.entriesService = new EntriesService(di.entriesRepository)

export default di
