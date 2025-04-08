<script setup>

import { useProjectsStore } from '@/store/useProjects.js';
import { storeToRefs } from 'pinia';

useHead({ title: 'Очень интересно - Наши проекты' });

const { projects, currentProject } = storeToRefs(useProjectsStore());

const { fetchProjects, updateCurrentProject } = useProjectsStore();

if (!projects.value.length) {
  await fetchProjects();
}

await updateCurrentProject(useRoute().params.slug);

if (!currentProject.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project Not Found' })
}

import ProjectHero from '@/components/project/ProjectHero.vue';
import ProjectDescription from '@/components/project/ProjectDescription.vue';
import SideButton from '@/components/BaseSideButton.vue';
import { computed } from 'vue';

const currentIndexBySlug = computed(() => projects.value.findIndex(project => project.slug === useRoute().params.slug));
const prevProject = computed(() => projects.value[currentIndexBySlug.value - 1] || null);
const nextProject = computed(() => projects.value[currentIndexBySlug.value + 1] || null);
</script>

<template>
  <ProjectHero />
  <ProjectDescription />
  <div :class="$style.projectsNav">
    <NuxtLink v-if="prevProject" :to="`/projects/${prevProject.slug}`">Предыдущий проект</NuxtLink>
    <NuxtLink v-if="nextProject" :to="`/projects/${nextProject.slug}`">Следующий проект</NuxtLink>
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