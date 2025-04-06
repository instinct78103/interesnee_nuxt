<script setup>

</script>

<template>
  <div :class="$style.root">
    <div :class="$style.rotated">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" module>

@use '@/scss/helpers';

.root {
  @extend %content;
  position: relative;
}

.rotated {
  transform: rotateZ(-90deg);
  display: flex;
  justify-content: flex-end;
  width: 1px;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: -80px;
  text-transform: uppercase;
  padding-block: 0 20px;

  @media(width <= 1440px) {
    left: -50px;
  }

  @media(width <= 1440px) {
    position: static;
    transform: rotateZ(0);
    width: auto;
    justify-content: flex-start;
  }

  @media(width <= 1024px) {
    display: none;
  }
}

.rotated > * {
  color: var(--gray-3);
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
  margin: 0;
}

</style>