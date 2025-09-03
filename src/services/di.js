import { LocalSlotsRepository } from '@/infrastructure/slots/LocalSlotsRepository'
import { SlotsService } from '@/services/slots.service'
import { LocalEntriesRepository } from '@/Infrastructure/Entries/LocalEntriesRepository'
import { EntriesService } from '@/services/entries.service'
import { LocalClientsRepository } from '@/Infrastructure/Clients/LocalClientsRepository'
import { ClientsService } from '@/services/clients.service'


const di = {
    slotsRepository: new LocalSlotsRepository(),  
    entriesRepository: new LocalEntriesRepository(),
    clientsRepository: new LocalClientsRepository(),

}
di.slotsService = new SlotsService(di.slotsRepository)
di.entriesService = new EntriesService(di.entriesRepository)
di.clientsService = new ClientsService(di.clientsRepository)

export default di
