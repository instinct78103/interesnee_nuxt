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
  const currentJob = jobs.value.find(job => job.board_code === boardCode);

  job.value = currentJob;

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
  <section v-if="filteredJob">
    <Hero kind="small">{{ filteredJob?.title.replace('(RU)', '') }}</Hero>
    <div :class="$style.root">
      <div :class="$style.container">
        <div v-clean-html="filteredJob.description" :class="$style.content"></div>
      </div>
    </div>
  </section>
  <BaseForm></BaseForm>
</template>

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

  :is(:where(p, h2) strong, h2) {
    font-size: 16px;
    font-weight: 700;
  }

  :is(br, p:empty) {
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
</style>