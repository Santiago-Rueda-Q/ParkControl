import LocalEntriesRepository from '@/Infrastructure/Entries/LocalEntriesRepository'
import LocalExitsRepository from '@/Infrastructure/Exits/LocalExitsRepository'
import LocalSlotsRepository from '@/Infrastructure/Slots/LocalSlotsRepository'
import EntriesService from '@/services/entries.service'
import ExitsService from '@/services/exits.service'
import SlotsService from '@/services/slots.service'
import FeesService from '@/services/fees.service'

const slotsRepo = new LocalSlotsRepository()
const slotsService = new SlotsService({ slotsRepo })

const entriesRepo = new LocalEntriesRepository()
const entriesService = new EntriesService({ entriesRepo, slotsService })

const exitsRepo = new LocalExitsRepository()
const feesService = new FeesService()
const exitsService = new ExitsService({ exitsRepo, entriesRepo, feesService, slotsService })

export default { slotsService, entriesService, exitsService, feesService }
