import { useJobsStore } from '@/store/useJobs.js'
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.name === 'job-code' || to.name === 'join') {
        const store = useJobsStore()
        const { jobs } = storeToRefs(store)

        if (!jobs.value?.length) {
            await store.fetchJobs()
        }
    }
})