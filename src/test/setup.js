import { afterEach, vi } from 'vitest'

afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
})

if (!globalThis.crypto || !globalThis.crypto.randomUUID) {
    globalThis.crypto = {
        randomUUID: () => '00000000-0000-4000-8000-TESTUUID0000'
    }
}
