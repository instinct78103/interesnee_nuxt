<template>
  <NuxtLink v-if="isRoute" :class="$style.sidebar" :to="pathTo">
    <span :class="$style.text">
      <slot />
    </span>
  </NuxtLink>
  <a v-else :class="$style.sidebar" :href="pathTo" aria-label="Кнопка слайдера">
    <span :class="$style.text">
      <slot />
    </span>
  </a>
</template>

<script setup>

defineProps({
  pathTo: {
    type: String,
    default: '/',
  },
  type: {
    type: String,
    default: 'link',
  },
});
const isRoute = () => this.type === 'route';

</script>

<style lang="scss" module>
.sidebar {
  position: fixed;
  z-index: 2;
  bottom: 10%;
  right: 0;
  padding: clamp(12px, 5vw, 15px) clamp(17px, 5vw, 40px);
  background: var(--red-light);
  box-shadow: 0 0 9px 0 rgb(from var(--red-light) r g b / 0.7);
  text-decoration: none;
  transform-origin: right top;
  transform: rotate(-270deg);
}

.text {
  font-size: clamp(12px, 5vw, 17px);
  line-height: 1.25;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
}
</style>
