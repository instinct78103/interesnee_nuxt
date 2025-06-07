<template>
  <section v-if="board">
    <Hero kind="small">{{ board?.title }}</Hero>
    <div :class="$style.root">
      <div :class="$style.container">
        <div v-html="board.description" :class="$style.content"></div>
      </div>
    </div>
    <BaseForm></BaseForm>
  </section>
</template>

<script setup>
useHead({title: 'Очень Интересно - Вакансия'});

import {ref} from "vue";
import Hero from "~/components/Hero.vue";
import BaseForm from "~/components/BaseForm.vue";

const route = useRoute()

// Always fetch on server side and never re-fetch on client
const {data} = await useFetch('https://api.resumatorapi.com/v1/jobs?apikey=4tWhJFtr8iWAl3VHxRc8HVIk0dSZEOBU', {
  server: true,
  lazy: false,
  default: () => [],
  transform: (items) => {

    const allowedCities = ref(['ekaterinburg', 'krasnoyarsk', 'sochi']);

    const deprecatedJobs = [
      'Unreal Engine developer (RU)',
      'QA Engineer (auto) (RU)',
      'JS - Frontend developer Junior (RU)',
      'Accountant (RU)',
      'Frontend developer - HTML/CSS/JS (RU)',
      'Frontend developer - HTML/CSS/JS (part time) (RU)',
    ];


    const filtered = items.filter(job => !job.internal_code.endsWith('_hidden')
        && job.country_id === 'Russian Federation'
        && !deprecatedJobs.includes(job.title))

    // Reduce each item to only the two needed props
    return filtered.map(({board_code, description, title}) => ({board_code, description, title: title.replace('(RU)', '')}))
  }
})

// `data` is a ref — extract synchronously
const board = computed(() => data.value.find(item => item.board_code === route.params.code))

if (!board.value) {
  throw createError({statusCode: 404, statusMessage: 'Code not found'})
}
</script>

<style lang="scss" module>
.container {
  width: min(100% - 40px, 1120px);
  margin-inline: auto;
  padding-block: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-block: 10px 0;

  p:empty {
    display: none;
  }

  ul {
    padding-left: 20px;

    > li {
      list-style: disc;
      text-wrap: balance;
    }
  }
}

.slide-top-enter-active {
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
}

.slide-top-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.slide-top-leave-from,
.slide-top-enter-to {
  transform: translateY(0);
  opacity: 1;
}

</style>