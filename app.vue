<template>

  <Header />
  <NuxtPage />
  <Footer />

</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
// This file is for global layout and app-wide settings.
// No need to do anything specific for static generation or page fetching in here.
</script>

<style lang="scss">
/* You can add global styles here if needed */
</style>
