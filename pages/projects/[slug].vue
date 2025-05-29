<script setup>

useHead({ title: 'Очень интересно - Наши проекты' });

const { data: projects } = await useAsyncData('projects', async () => {
  const { projects } = await import('@/data/projects.js');
  return projects;
}, {
  server: true,
  lazy: false,
});

import ProjectHero from '@/components/project/ProjectHero.vue';
import ProjectDescription from '@/components/project/ProjectDescription.vue';
import SideButton from '@/components/BaseSideButton.vue';
import { computed } from 'vue';

const currentProject = computed(() => projects.value.find(project => project.slug === useRoute().params.slug));
const currentIndexBySlug = computed(() => projects.value.findIndex(project => project.slug === useRoute().params.slug));
const prevProject = computed(() => projects.value[currentIndexBySlug.value - 1] || null);
const nextProject = computed(() => projects.value[currentIndexBySlug.value + 1] || null);

if (!currentProject.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project Not Found' })
}
</script>

<template>
  <ProjectHero :currentProject="{mainImage: currentProject.mainImage, name: currentProject.name}" />
  <ProjectDescription :currentProject="{name: currentProject.name, description: currentProject.description, images: currentProject.images, videos: currentProject.videos}" />
  <div :class="$style.projectsNav">
    <a v-if="prevProject" :href="`/projects/${prevProject.slug}`">Предыдущий проект</a>
    <a v-if="nextProject" :href="`/projects/${nextProject.slug}`">Следующий проект</a>
  </div>
  <SideButton path-to="/projects" type="route">Назад к проектам</SideButton>
</template>

<style lang="scss" module>
.projectsNav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 20px 10px 40px;

  a {
    font-size: 14px;
    line-height: 1.25rem;
    background: #fff;
    border-radius: 24px;
    border: 1px solid #e7e5e4ff;
    padding: 8px 16px;
    text-decoration: none;
    color: var(--color-black, #000);
    text-align: center;

    &:hover {
      cursor: pointer;
      filter: brightness(95%);
    }
  }
}
</style>