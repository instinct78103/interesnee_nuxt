<template>
  <section :class="[$style.root, $style.background]">
    <div :class="$style.container">
      <RotatedHeading>
        <h3>Наши офисы</h3>
      </RotatedHeading>
      <div :class="$style.wrapper">
        <h2 :class="$style.subHeading">Мы находимся в нескольких городах</h2>
        <button
          v-for="(item, key) in offices"
          :key
          :class="[$style.placemarkBtn, item.className, {[$style.active]: currentSlide === key, }, officeClasses[item.value]]"
          :aria-label="`Перейти на город ${item.city}`"
          @click="scrollTo(key)"
        >
          <HomeMapMark :is-active="currentSlide === key" />
          <span :class="$style.placemarkCity">{{ item.city }}</span>
        </button>
      </div>

    </div>

    <div :class="$style.bottomLine">
      <OfficeSlider
        :office="offices"
        :current-slider="currentSlide"
      />
    </div>
  </section>
</template>

<script setup>
import $style from '@/components/home/HomeMap.module.scss';
import HomeMapMark from '@/components/home/HomeMapMark.vue';
import OfficeSlider from '@/components/OfficeSlider.vue';
import RotatedHeading from '@/components/RotatedHeading.vue';
import { offices } from '@/data/commonInfo.js';
import { ref, provide } from 'vue';

const currentSlide = ref(0);

const officeClasses = {
  ch: $style.placemarkCh,
  ekb: $style.placemarkEkb,
  hcm: $style.placemarkHcm,
  ksk: $style.placemarkKsk,
  nb: $style.placemarkNb,
  ny: $style.placemarkNy,
  rdn: $style.placemarkRdn,
  sch: $style.placemarkSch,
};

const updateCurrentSlide = (index) => {
  currentSlide.value = index;
};

const scrollTo = (key) => {
  document.querySelector('.slider:has(> .office)').children[key].scrollIntoView({
    behavior: 'smooth',
    inline: 'start',
    block: 'nearest',
  });
};

provide('activeIndex', currentSlide);
provide('updateActiveIndex', updateCurrentSlide);

</script>

<style lang="scss" module></style>
