<script setup>
import RotatedHeading from '@/components/RotatedHeading.vue';
import $style from '@/components/home/HomeJoin.module.scss'

const images = [
  {
    src: {
      x1: '/images/photos/home_photo_3.jpg',
      x2: '/images/photos/home_photo_3@2x.jpg',
      placeholder: '/images/photos/home_photo_3@placeholder.jpg',
      webp: '/images/photos/home_photo_3.webp',
    },
    name: 'Join-3',
    sizeClass: $style.large,
  },
  {
    src: {
      x1: '/images/photos/home_photo_2.jpg',
      x2: '/images/photos/home_photo_2@2x.jpg',
      placeholder: '/images/photos/home_photo_2@placeholder.jpg',
      webp: '/images/photos/home_photo_2.webp',
    },
    name: 'Join-2',
    sizeClass: $style.medium,
  },
  {
    src: {
      x1: '/images/photos/students.jpg',
      x2: '/images/photos/students.jpg',
      placeholder: '/images/photos/students@placeholder.jpg',
      webp: '/images/photos/students.webp',
    },
    name: 'Join-1',
    sizeClass: $style.small,
  },
];
</script>

<template>
  <section :class="$style.root">
    <div :class="$style.container">

      <RotatedHeading>
        <h3>Присоединяйся к нам</h3>
      </RotatedHeading>

      <div :class="$style.wrapper">

        <div>
          <h2 :class="$style.subHeading">
            Объединяй идеи <br>
            Развивайся <br>
            Создавай
          </h2>
          <NuxtLink :class="$style.button" to="/join">Присоединиться</NuxtLink>
        </div>
        <div :class="$style.imgWrapper">
          <NuxtImg
            v-for="(item, index) in images"
            :src="item.src.x1"
            :key="index"
            :alt="item.name"
            :class="[$style.img, item.sizeClass]"
            loading="lazy"
          ></NuxtImg>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" module>

</style>