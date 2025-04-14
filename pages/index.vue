<template>
  <HomeHero />
  <HomeTechnologies />
  <HomeNumbers />
  <HomeJoin />
  <HomeCases />
  <HomeMap />
</template>

<script setup>
import HomeHero from '@/components/home/HomeHero.vue';
import HomeTechnologies from '@/components/home/HomeTechnologies.vue';
import HomeNumbers from '../components/home/HomeNumbers.vue';
import HomeJoin from '@/components/home/HomeJoin.vue';
import HomeCases from '@/components/home/HomeCases.vue';
import HomeMap from '@/components/home/HomeMap.vue';
import {SITE_NAME} from '~/helpers.js';

useHead({ title: SITE_NAME });

</script>

<style scoped></style>
