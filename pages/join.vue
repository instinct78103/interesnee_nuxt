<template>

  <Hero>Найди лучшую работу <em>в твоей жизни</em></Hero>

  <section :class="$style.container">
    <h2 :class="$style.heading">Карьера</h2>
    <ul :class="$style.buttonsList" v-if="cities.length">
      <li v-for="(city, index) in cities" :key="index">
        <NuxtLink :to="{ path: '/join', query: { city: city.url }}" :class="[$style.button, {[$style.buttonActive]: currentCity === city.url }, 'hover-scale']">
          {{ city.nameRU }}
        </NuxtLink>
      </li>
    </ul>
    <ul v-if="renderJobs && jobs.length" :class="$style.list">
      <li v-for="job in filteredJobs" :key="job.id" :class="$style.listItem">
        <div :class="[ $style.item, { [$style.closed]: isJobClosed(job.status) } ]">
          <NuxtLink :to="{ path: '/job', query: { city: job.url, job: job.board_code }}" :class="$style.link">
            <div :class="$style.title">{{ job?.title?.replace('(RU)', '') }}</div>
          </NuxtLink>
        </div>
      </li>
    </ul>
    <svg v-else style="margin:160px auto 0;display:block;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50" aria-label="Loading...">
      <circle cx="25" cy="25" r="20" fill="none" stroke="var(--red)" stroke-width="4" stroke-dasharray="31.4 31.4" stroke-linecap="round" transform="rotate(-90, 25, 25)">
        <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  </section>

  <OurHRs />
</template>

<script setup>
import { SITE_NAME } from '@/helpers.js';
useHead({ title: `${SITE_NAME} - Присоединяйся`, });

import Hero from '@/components/Hero.vue';
import OurHRs from '@/components/OurHRs.vue';
import { computed } from 'vue';
import { useJobsStore } from '@/store/useJobs.js';
import { storeToRefs } from 'pinia';

const route = useRoute();
const { jobs, cities } = storeToRefs(useJobsStore());

const jobStatuses = {
  open: 'Open',
  onHold: 'On Hold',
  approved: 'Approved',
  needsApproval: 'Needs Approval',
  drafting: 'Drafting',
  filled: 'Filled',
  cancelled: 'Cancelled',
  closed: 'Closed',
};

const currentCity = computed(() => route.query.city || 'ekaterinburg');
const renderJobs = computed(() => !!currentCity.value);

function isJobClosed(status) {
  return status === jobStatuses.closed;
}

const filteredJobs = computed(() => {

  if (cities.value.length === 0) {
    return false;
  }

  const currentCityUrl = (route.query.city || 'ekaterinburg');

  const currentCity = cities.value.filter(city => city.url === currentCityUrl)[0].name;

  const filteredJobs = [...jobs.value];
  const newFilteredJobs = filteredJobs.filter(job => job.city.split(', ').includes(currentCity));

  const openJobs = newFilteredJobs.filter(job => !isJobClosed(job.status));

  const closedJobs = newFilteredJobs.filter(job => isJobClosed(job.status));

  return openJobs.concat(closedJobs);
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
