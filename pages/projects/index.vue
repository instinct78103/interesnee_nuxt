<script setup lang="ts">
import Hero from '@/components/Hero.vue';
import ProjectsCustomers from '@/components/projects/ProjectsCustomers.vue';
import ProjectsList from '@/components/projects/ProjectsList.vue';
</script>

<template>
  <section>
    <Hero>
      <strong>Вдохновленные вызовом,</strong> создаем <em>удивительные продукты!</em>
    </Hero>
    <ProjectsCustomers />
    <ProjectsList />
  </section>
</template>

<style scoped>

</style>