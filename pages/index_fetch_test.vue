<template>
  <div class="work-tiles">
    <div v-for="post in posts" :key="post.id">
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
