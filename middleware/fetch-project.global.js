import { useJobsStore } from '@/store/useJobs.js'
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name === 'job' || to.name === 'join') {
    const { jobs } = storeToRefs(useJobsStore());
    if (!jobs.value.length) {
      const { fetchJobs } = useJobsStore();
      await fetchJobs();
    }
  }
})