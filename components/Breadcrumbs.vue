<template>
  <nav :class="$style.root">
    <ul :class="$style.list">
      <li
        v-for="(link, index) in links"
        :class="$style.item"
        :key="index">
        <template v-if="link.path">
          <NuxtLink
            :to="link.path"
            :class="$style.link"
          >{{ link.name }}
          </NuxtLink>
        </template>
        <template v-else>
          {{ link.name }}
        </template>
      </li>
    </ul>
  </nav>
</template>
<script setup>
defineProps({
  links: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss" module>
@use '@/scss/helpers';

.root {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  font-size: 16px;
  line-height: 30px;
  color: var(--gray-6);

  @media(width < 1024px) {
    display: none;
  }
}

.list {
  list-style-type: none;
  display: flex;
  padding: 1em 40px;
}

.item {
  &:not(:last-child)::after {
    content: '/';
    padding: 0 5px;
  }
}

.link {
  color: var(--red);
  text-decoration: none;

  //@include on-event {
  //  color: var(--red);
  //  text-decoration: underline;
  //}
}
</style>
