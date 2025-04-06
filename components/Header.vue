<template>
  <header id="masthead" class="site-header sticky">
    <div class="site-branding-container">
      <div class="site-branding">
        <div class="site-logo">
          <NuxtLink to="/">
            <picture class="logo">
              <source srcset="" type="image/webp">
              <img srcset="https://blog.interesnee.ru/wp-content/themes/interesnee/project/assets/images/logo.svg" alt="Очень Интересно" decoding="async">
            </picture>
          </NuxtLink>
        </div>
        <nav id="site-navigation" class="main-navigation" aria-label="Top Menu">
          <div class="menu-top-menu-container">
            <ul id="menu-top-menu" class="main-menu">
              <li class="menu-item" v-for="item in menuItems" :key="item.path">
                <NuxtLink v-if="!item.external" :to="item.path">{{ item.label }}</NuxtLink>
                <a v-else :href="item.path">{{ item.label }}</a>
              </li>
            </ul>
          </div>
          <a class="mobile-menu-toggle" href="#" @click.prevent="isMobileMenuOpen = !isMobileMenuOpen">
            <i class="lines-button">
              <i class="lines"></i>
              <i class="lines"></i>
              <i class="lines"></i>
            </i>
          </a></nav>
      </div>
    </div>
  </header>
  <div :class="['mobile-menu-container', {'open': isMobileMenuOpen}]" style="top: 71px; height: calc(-71px + 100vh);">
    <ul class="mobile-nav">
      <li class="menu-item" v-for="item in menuItems" :key="item.path">
        <NuxtLink v-if="!item.external" :to="item.path">{{ item.label }}</NuxtLink>
        <a v-else :href="item.path">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const isMobileMenuOpen = ref(false);
const route = useRoute();

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});

const menuItems = [
  { path: '/camp', label: 'Devops camp' },
  { path: '/projects', label: 'Проекты' },
  { path: '/join', label: 'Присоединяйся к нам' },
  { path: '/team', label: 'Команда' },
  { path: '#', label: 'Блог', external: true },
];

</script>