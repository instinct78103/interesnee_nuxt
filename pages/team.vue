<template>
    <Hero><strong>Работайте с лучшими,</strong> <em>в лучших условиях</em></Hero>
    <TeamOffer />
    <TeamCulture />
    <TeamVideos />
    <TeamGrid />
</template>

<script setup>

useHead({
    title: 'Очень Интересно - Наша команда',
})

import Hero from '@/components/Hero.vue';
import TeamOffer from '@/components/team/TeamOffer.vue';
import TeamCulture from '@/components/team/TeamCulture.vue';
import TeamVideos from '@/components/team/TeamVideos.vue';
import TeamGrid from '@/components/team/TeamGrid.vue';
</script>
