<template>
  <div class="work-tiles"  style="display: grid; grid-template-columns: 320px 320px 320px; gap: 20px">
    <div v-for="post in posts" :key="post.id">
      <img :src="'https://saritasa.com' + post.image" :alt="post.title" width="320" height="192" style="max-width: 100%">
      <p><strong>{{ post.title }}</strong></p>
      <p>{{post.desc}}</p>
    </div>
  </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';

const { data: posts } = await useAsyncData('posts', () => $fetch('https://saritasa.com/wp-json/sar/v2/work/posts'));
if (process.server) {
  console.log(posts.value);
}
</script>

<style scoped></style>
