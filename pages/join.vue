<template>

  <Hero>Найди лучшую работу <em>в твоей жизни</em></Hero>

  <section :class="$style.container">
    <h2 :class="$style.heading">Карьера</h2>
    <ul :class="$style.buttonsList">
      <li v-for="city in data.cities" :key="city.url">
        <NuxtLink
            :to="{ path: '/join', query: { city: city.url }}"
            :class="[$style.button, {[$style.buttonActive]: currentCity === city.url && isClient === true }, 'hover-scale']"
        >
          {{ city.nameRU }}
        </NuxtLink>
      </li>
    </ul>
    <ul :class="$style.list">
      <li v-for="{ board_code, status, title } in jobsByUrl" :key="board_code" :class="$style.listItem">
        <div :class="[ $style.item, { [$style.closed]: status === 'Closed' } ]">
          <NuxtLink external :to="`/job/${board_code}`" :class="$style.link">
            <span :class="$style.title">{{ title }}</span>
          </NuxtLink>
        </div>
      </li>
    </ul>
  </section>

  <OurHRs />
</template>

<script setup>
import { SITE_NAME } from '@/helpers.js';
useHead({ title: `${SITE_NAME} - Присоединяйся`, });

import Hero from '@/components/Hero.vue';
import OurHRs from '@/components/OurHRs.vue';

const currentCity = computed(() => useRoute()?.query?.city || 'ekaterinburg');
const isClient = ref(false);

const {data} = await useFetch('https://api.resumatorapi.com/v1/jobs?apikey=4tWhJFtr8iWAl3VHxRc8HVIk0dSZEOBU', {
  server: true,
  lazy: false,
  default: () => [],
  transform: (items) => {

    const allowedCities = ['ekaterinburg', 'krasnoyarsk', 'sochi'];

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
          .filter(city => allowedCities.includes(city.toLowerCase()))
          .map(city => ({
            name: city,
            nameRU: translateCity(city),
            url: citySlug(city),
          }));
    }

    const deprecatedJobs = [
      'Unreal Engine developer (RU)',
      'QA Engineer (auto) (RU)',
      'JS - Frontend developer Junior (RU)',
      'Accountant (RU)',
      'Frontend developer - HTML/CSS/JS (RU)',
      'Frontend developer - HTML/CSS/JS (part time) (RU)',
    ];

    const getOpenJobs = items.filter(job => !job.internal_code.endsWith('_hidden')
        && job.country_id === 'Russian Federation'
        && !deprecatedJobs.includes(job.title)
        && allowedCities.some(city => job.city.toLowerCase().includes(city))
    )

    return {
      jobs: getOpenJobs.map(({board_code, title, city, status}) => ({board_code, title: title.replace('(RU)', ''), city, status})),
      cities: parseCites(getOpenJobs)
    }
  }
})

onMounted(() => {
  isClient.value = true;
})

const jobsByUrl = computed(() => {
  return data.value.jobs.filter(job => job.city.toLowerCase().includes(currentCity.value.toLowerCase()));
});
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.container {
  @extend %container;
  @extend %section;
  padding-bottom: 160px;
  border-bottom: 0;
}

.heading {
  @extend %heading;
  text-align: center;
}

.list {
  --gap: clamp(5px, 4vw, 15px);
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;
  animation: fadeEff 0.3s;
  gap: var(--gap);
}

.listItem {
  --column-count: 3;
  width: calc((100% - (var(--column-count) - 1) * var(--gap)) / var(--column-count));

  @media(width < 768px) {
    --column-count: 2;
  }

  @media(width < 480px) {
    --column-count: 1;
  }
}

.item {
  height: 172px;
  border: 1px solid var(--gray-2);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: inset 0 1px 2px 0 rgba(2, 2, 2, 0.25);
  overflow: hidden;
  transition: border 0.3s, background 0.3s, box-shadow 0.3s;
  position: relative;

  @media(width < 768px) {
    height: 80px;
  }

  &:hover {
    border-color: var(--red-light);
    background-color: var(--white-gray);

    .title {
      @media(width < 768px) {
        color: var(--red-light);
      }
    }
  }
}

.closed {
  background-color: #bdbdbd;

  &:hover {
    border-color: #808080;
    background-color: #bdbdbd;
  }
}

.link {
  @extend %hoverBlock;

  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: clamp(20px, 3vw, 24px);
  line-height: 1.3;
  color: var(--gray-dark);
  transition: opacity 0.3s;
  text-wrap: balance;
}

.buttonsList {
  display: flex;
  justify-content: center;
  margin-bottom: 65px;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;
  gap: 15px;

  @media(width < 1024px) {
    justify-content: center;
  }
}

.button {
  text-decoration: none;
  padding: 15px 25px;
  border: 2px solid transparent;
  border-radius: 50px;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
  color: var(--gray-3);
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s, border 0.3s;
  display: block;

  @media(width < 768px) {
    padding: 10px 12px;
  }

  &:hover {
    color: oklch(from var(--gray-3) 10% c h);
  }
}

.buttonActive {
  border: 2px solid var(--red-light);
  border-radius: 50px;
  color: var(--red-light);

  &:hover {
    color: oklch(from #f75050 10% c h);
    border-color: oklch(from #f75050 10% c h);
  }
}

@keyframes fadeEff {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
