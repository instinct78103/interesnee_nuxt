<template>
  <div :class="$style.root">
    <h1>404</h1>
    <strong>Страница не найдена</strong>
  </div>
</template>

<script setup>

useHead({
  title: '404 - Страница не найдена',
})

</script>

<style lang="scss" module scoped>
.root {
  background: var(--red) url('/static/back-image.png') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: clamp(26px, 6vw, 40px);
  padding-inline: 20px;
  text-align: center;
  text-wrap: balance;
  flex-grow: 1;
  padding-block: clamp(40px, 10cqmin, 80px);

  > * {
    color: #fff;
  }
}

h1 {
  font-size: 2em;
  text-align: center;
}
</style>