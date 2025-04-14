<template>
  <div :class="$style.root">
    <CampHero />
    <CampInfo />
    <DumpStickers />
    <CampSlider />
    <CampForm />
    <OurHRs />
  </div>
</template>

<script setup>

import { SITE_NAME } from '@/helpers.js';

useHead({
  title: `${SITE_NAME} - Summer Camp`,
});

import CampHero from '@/components/camp/CampHero.vue';
import CampInfo from '@/components/camp/CampInfo.vue';
import DumpStickers from '@/components/camp/DumpStickers.vue';
import CampSlider from '@/components/camp/CampSlider.vue';
import CampForm from '@/components/camp/CampForm.vue';
import OurHRs from '@/components/OurHRs.vue';

</script>

<style lang="scss" module>

.root .sideButton {
  background: var(--red);
}
</style>
