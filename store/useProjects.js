import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([]);
  const currentProject = ref(null);

  async function fetchProjects() {
    const { projects: staticProjects } = await import('@/data/projects.js');
    projects.value = staticProjects;
  }

  async function updateCurrentProject(slug) {
    currentProject.value = projects.value.find(project => project.slug === slug);
  }

  return {
    projects,
    currentProject,
    fetchProjects,
    updateCurrentProject,
  };
});