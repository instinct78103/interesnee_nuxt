<template>
  <section :class="$style.root">
    <div :class="$style.container">
      <div :class="$style.scrollSnap" ref="sliderRef">
        <NuxtImg
          v-for="(imageName, index) in stickersImages"
          :class="$style.stickerImage"
          :key="index"
          :alt="imageName"
          :src="`/images/stickers/${imageName}`"
        ></NuxtImg>
      </div>
      <a :class="$style.button" href="https://t.me/addstickers/interesneeru" target="_blank">Получи забавный Стикер-пак в Telegram</a>
    </div>
  </section>
</template>

<script setup>
import { useSliderClient } from '@/composables/useSlider.client.js';
import { ref } from 'vue';

const sliderRef = ref(null);

useSliderClient(sliderRef, { autoplay: true, autoplaySpeed: 3000 });

const stickersImages = [
  'a-01-min.png',
  'a-02-min.png',
  'a-03-min.png',
  'a-04-min.png',
  'a-05-min.png',
  'a-06-min.png',
  'a-07-min.png',
  'a-08-min.png',
  'a-09-min.png',
  'a-10-min.png',
  'a-11-min.png',
  'a-12-min.png',
  'a-13-min.png',
  'a-14-min.png',
  'a-15-min.png',
  'a-16-min.png',
  'a-17-min.png',
  'a-18-min.png',
  'a-28-min.png',
  'a-29-min.png',
  'a-30-min.png',
];

</script>

<style lang="scss" module>
@use '@/scss/helpers';

.scrollSnap {
  --gap: 20px;
  --column-count: 5;
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  @media (width < 1024px) {
    --column-count: 3;
  }

  @media (width < 768px) {
    --column-count: 2;
  }

  @media (width < 480px) {
    --column-count: 1;
  }

  > * {
    min-width: calc((100% - var(--gap) * (var(--column-count) - 1)) / var(--column-count));
  }
}

.root {
  @extend %section;
  text-align: center;
}

.root:nth-child(odd) {
  @media(width <= 480px) {
    background-color: #fff;
  }
}

.stickerImage {
  padding: 20px;
}

.root::after {
  display: none;
}

.root .rotated {
  @media(width <= 1440px) {
    max-width: 100%;
  }
}

.container {
  @extend %container;
}

.title {
  @extend %sectionTitle;
  margin: 0;
  text-align: center;
}

.desktopImage {
  width: 100%;

  @media(width <= 480px) {
    display: none;
  }

  @media(width > 480px) {
    display: initial;
  }
}

.mobileImage {
  width: 100%;

  @media(width <= 480px) {
    display: initial;
  }

  @media(width > 480px) {
    display: none;
  }
}

.button {
  @extend %button;
  margin-top: 15px;
}
</style>
