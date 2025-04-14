<template>
  <section :class="$style.hero">
    <div :class="$style.container">
      <NuxtImg
        :class="$style.image"
        src="/images/camp/summer-camp-2025-closed.webp"
        alt="Summer Camp 2025 Closed"
        style="max-width: 100%"
      ></NuxtImg>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" module>
@use '@/scss/helpers';

$hero-color-left: #ef423c;
$hero-color-right: #f16c43;

.container {
  @extend %container;
  padding-right: 0;
  padding-left: 0;
}

.hero {
  position: relative;
  background: linear-gradient(90deg, #ee403d, #f27043);
}

.image img {
  display: block;
  width: 100%;
}
</style>
