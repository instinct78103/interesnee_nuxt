import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref([]);
  const cities = ref([]);

  const allowedCities = ref(['ekaterinburg', 'krasnoyarsk', 'sochi']);

  const deprecatedJobs = [
    'Unreal Engine developer (RU)',
    'QA Engineer (auto) (RU)',
    'JS - Frontend developer Junior (RU)',
    'Accountant (RU)',
    'Frontend developer - HTML/CSS/JS (RU)',
    'Frontend developer - HTML/CSS/JS (part time) (RU)',
  ];

  function getOpenJobs(jobs) {
    return jobs.filter(job => !job.internal_code.endsWith('_hidden') && job.country_id === 'Russian Federation' && !deprecatedJobs.includes(job.title));
  }

  function citySlug(name) {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s/g, '-');
  }

  function translateCity(name) {
    const cities = {
      Ekaterinburg: 'Екатеринбург',
      Krasnoyarsk: 'Красноярск',
      Sochi: 'Сочи',
    };

    return cities[name] || null;
  }

  function parseCites(jobs) {
    const cities = [];

    jobs.forEach(e => {
      if (e.city) {
        const jobCities = e.city.split(', ');
        cities.push(...jobCities);
      }
    });

    return [...new Set(cities)]
      .filter(city => allowedCities.value.includes(city.toLowerCase()))
      .map(city => ({
        name: city,
        nameRU: translateCity(city),
        url: citySlug(city),
      }));
  }

  async function fetchJobs() {
    const url = 'https://api.resumatorapi.com/v1/jobs?apikey=4tWhJFtr8iWAl3VHxRc8HVIk0dSZEOBU';
    const data = await (await fetch(url)).json();
    jobs.value = getOpenJobs(data);
    cities.value = parseCites(jobs.value);
  }

  return {
    allowedCities,
    cities,
    fetchJobs,
    jobs,
  };
});