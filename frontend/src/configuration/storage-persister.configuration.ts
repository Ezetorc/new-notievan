import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

export const persister = createAsyncStoragePersister({
	storage: window.localStorage
})
