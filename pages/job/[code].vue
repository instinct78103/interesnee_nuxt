<script setup>
import { storeToRefs } from 'pinia';
import { useJobsStore } from '~/store/useJobs.js';
import { computed, ref } from 'vue';
import Hero from '~/components/Hero.vue';

const job = ref([]);

/**
 * Custom directive -- start
 */
const vCleanHtml = {
  mounted(el, binding) {
    el.innerHTML = binding.value;
    sanitizeHtml(el);
  },
  updated(el, binding) {
    el.innerHTML = binding.value;
    sanitizeHtml(el);
  },
};

function sanitizeHtml(container) {
  container.querySelectorAll('*').forEach(el => {
    // remove all attributes
    [...el.attributes].forEach(attr => el.removeAttribute(attr.name));

    //remove &nbsp
    if (el.innerHTML) {
      el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
    }
  });
}
/**
 * Custom directive -- end
 */

useHead({ title: 'Очень Интересно - Вакансия', });

// import BaseForm from '@/components/BaseForm.vue';
const { jobs } = storeToRefs(useJobsStore());

function filterJob(boardCode) {
  const currentJob = jobs.value.filter(job => job.board_code === boardCode)[0];

  job.value = currentJob;
  // form.vacancy.value = currentJob?.title;
  // form.vacancy.value = currentJob?.title;

  return currentJob;
}

const filteredJob = computed(() => {
  if (jobs.value.length === 0) {
    return false;
  }

  const currentJobBoardCode = useRoute().params.code;

  return filterJob(currentJobBoardCode);
});

</script>

<template>
<!--  <BaseForm />-->

  <section v-if="filteredJob">
    <Hero kind="small">{{ filteredJob?.title.replace('(RU)', '') }}</Hero>
    <div :class="$style.root">
      <div :class="$style.container">
        <p :class="$style.contentTitle">Описание:</p>
        <div class="qwww" v-html="filteredJob.description" :class="$style.content"></div>
      </div>
    </div>
  </section>

</template>

<style lang="scss" module>
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