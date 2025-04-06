<template>
  <section :class="$style.root" ref="root">
    <slot />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import $style from '@/components/home/BackgroundAnimation.module.scss';
const root = ref(null);

let visibilitySection = null;
const container = ref(null);
let dots = ref([]);
const isVisible = ref(false);

const destroy = () => {
  if (container.value) {
    Velocity(container.value, 'stop');
    Velocity(dots.value, 'stop');
    container.value?.remove();
  }
};

const debounce = (func, wait) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), wait);
  };
};

const handleResize = debounce(() => {
  destroy();
  initialize();
}, 250);

const createDots = () => {
  const width = window.innerWidth;
  const dotsCount = width > breakpoints.desktop ? 120 : width > breakpoints.phone ? 80 : 40;

  dots.value = Array.from({ length: dotsCount }).map(() => {
    const dot = document.createElement('div');
    dot.className = $style.dot;
    dot.style.backgroundColor = dotsColor;
    return dot;
  });
};

const setupContainer = () => {
  containerWidth.value = container.value.offsetWidth;
  containerHeight.value = container.value.offsetHeight;
  container.value.style.perspectiveOrigin = `${containerWidth.value / 2}px ${containerHeight.value * 0.45}px`;
};

const animateDots = () => {
  dots.value.forEach(dot => container.value.appendChild(dot));

  Velocity(
    dots.value,
    {
      translateX: [
        () => `+=${randomNumb(-containerWidth.value / 2.5, containerWidth.value / 2.5)}`,
        () => randomNumb(0, containerWidth.value),
      ],
      translateY: [
        () => `+=${randomNumb(-containerHeight.value / 2.75, containerHeight.value / 2.75)}`,
        () => randomNumb(0, containerHeight.value),
      ],
      translateZ: [
        () => `+=${randomNumb(translateZMin, translateZMax)}`,
        () => randomNumb(translateZMin, translateZMax),
      ],
      opacity: [() => Math.random(), () => Math.random() + 0.1],
    },
    { duration: 6000, loop: true },
  );
};

const animateContainer = () => {
  Velocity(container.value, containerAnimationMap, { duration: 800, loop: true, delay: 3250 });
};

const randomNumb = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const containerAnimationMap = {
  perspective: [50, 215],
};

const breakpoints = {
  desktop: 1024,
  tablet: 768,
  phone: 480,
};

let containerWidth = ref(0);
let containerHeight = ref(0);
const dotsColor = '#f75050';
const translateZMin = -725;
const translateZMax = 600;

const initialize = () => {
  if (!isVisible.value) return;
  container.value = document.createElement('div');
  container.value.className = $style.dotsContainer;
  root.value.appendChild(container.value);

  createDots();
  setupContainer();
  animateDots();
  animateContainer();
};

onMounted(async () => {
  const Velocity = (await import('velocity-animate')).default;

  const observeSection = () => {
    visibilitySection = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible.value = entry.isIntersecting;
        if (isVisible.value) {
          initialize();
        } else {
          destroy();
        }
      });
    }, { threshold: 0.1 });

    visibilitySection.observe(root.value);
  };

  window.addEventListener('resize', handleResize, { passive: true });
  observeSection();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  visibilitySection?.disconnect();
  destroy();
});
</script>
