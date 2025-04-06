<template>
  <div :class="[$style.root, { [$style.small]: kind === 'small' }, { [$style.empty]: kind === 'empty' } ]">
    <h1
      v-if="kind !== 'empty'"
      :class="[$style.heading, { [$style.smallHeading]: kind === 'small' } ]">
      <slot />
    </h1>
  </div>
</template>
<script setup>

defineProps({
  kind: {
    type: String,
    default: 'default',
  },
});

</script>

<style lang="scss" module>
@use '@/scss/helpers';

.root {
  min-height: clamp(320px, 25vw, 400px);
  background: var(--red) url('/static/back-image.png') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(width <= 480px) {
    min-height: 336px;
  }
}

h1 {
  text-wrap: balance;
}

.small {
  min-height: 150px;
}

.empty {
  background: var(--red-dark);
  height: clamp(40px, 4vwm, 67px);
  min-height: 0;
}

.heading {
  color: #fff;
  font-size: clamp(26px, 4vw, 40px);
  font-weight: normal;
  text-align: center;
  width: clamp(20ch, 60vw, 30ch);
}

.smallHeading {
  font-size: clamp(20px, 4vw, 32px);
}

em {
  background-color: var(--blue-deep);
  font-weight: 100;
  font-style: normal;
  padding-inline: 5px;
}
</style>
