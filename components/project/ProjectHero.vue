<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <Breadcrumbs :links />
    </div>

    <div :class="$style.imageContainer">
      <NuxtImg
        v-if="currentProject.mainImage"
        :class="$style.img"
        :src="currentProject.mainImage"
        :alt="currentProject.name"
        :key="`${currentProject.name}-head-image`"
      ></NuxtImg>
    </div>
  </div>
</template>
<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue';

const props = defineProps({
  currentProject: {
    mainImage: String,
    name: String,
  }
})

const links = [
  {
    name: 'Проекты',
    path: '/projects',
  },
  {
    name: props.currentProject.name,
  },
];
</script>

<style lang="scss" module scoped>
@use '@/scss/helpers';

.root {
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  min-height: clamp(235px, 5vw, 400px);
}

.imageContainer {
  width: 100%;
}

.imageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
}
</style>
