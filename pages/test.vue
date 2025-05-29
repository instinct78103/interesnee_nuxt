<template>
  <div class="work-tiles" style="display: grid; grid-template-columns: 320px 320px 320px; gap: 20px">
    <div v-for="{id, title, desc, image} in posts" :key="id">
      <img :src="'https://saritasa.com' + image" :alt="title" width="320" height="192" style="max-width: 100%">
      <p><strong>{{ title }}</strong></p>
      <p>{{desc}}</p>
    </div>
  </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';

/**
 * todo remove redundant data from the posts array
 */
const { data: posts } = await useAsyncData('posts', () => $fetch('https://saritasa.com/wp-json/sar/v2/work/posts'));
</script>

<style scoped></style>
