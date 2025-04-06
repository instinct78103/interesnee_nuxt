<script setup lang="ts">
import { useAsyncData } from 'nuxt/app';

//const {data} = useAsyncData('posts', () => $fetch('https://0.0.0.0:3000/wp-json/sar/v2/work/posts'))

const {data} = useFetch('http://192.168.88.180:8080/wp-json/sar/v2/work/posts');

</script>

<template>
  data: {{ data }}
</template>

<style scoped>

</style>