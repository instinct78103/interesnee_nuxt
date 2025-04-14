<template>
  <section :class="[$style.root]">
    <div :class="[$style.container, $style.formContainer]">
      <div :class="$style.row">
        <div :class="[$style.col, $style.sendFeedback]">
          <button :class="$style.submit" aria-label="Отправить заявку" @click="openPopup()">Отправить заявку</button>
        </div>
      </div>
    </div>
  </section>
  <Dialog ref="dialog">
    <template #body>
      <BaseForm
        v-if="isContactFormLoaded"
        :select="[
            { name: '.NET', value: 'Ofn6Ny', },
            { name: 'Android', value: 'Ns3S4M', },
            { name: 'DevOps', value: '1KGkguBAGo', },
            { name: 'JavaScript', value: 'VbrPUEWE3i', },
            { name: 'Python', value: 'RW2ekO', },
            { name: 'QA Automation', value: '6OWrIMNCFu', },
            { name: 'Unity', value: '5kAduUUV73', },
            { name: 'iOS', value: '9lA7XN', },
          ]"
        :show-camp-city="true"
        bg-color="#fff"
        title="Отправить заявку"
        file-title="Прикрепить резюме"
        namePostfix=" - Практикант"
        text-area-placeholder="Или напишите текст здесь"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import Dialog from '@/components/Dialog.vue';

const dialog = ref(null);
const BaseForm = defineAsyncComponent(() => import('@/components/BaseForm.vue'));
const isContactFormLoaded = ref(false);

const showModal = () => dialog?.value?.showModal();

const openPopup = () => {
  isContactFormLoaded.value = true;
  showModal();
};
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.root {
  text-align: center;
  padding: 0;
}

.root.backgrounded {
  background: var(--white-gray);
}

.container {
  @extend %container;
  max-width: 1170px;
}

.formContainer {
  max-width: 770px;
  padding-top: 55px;
}

.submit {
  @extend %button;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;

  @media(width <= 480px) {
    display: block;
    margin: 0 auto;
    width: auto;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  &:disabled {
    background-color: var(--red-light);
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-inline: calc(-1 * var(--grid-gutter));
}

.col {
  position: relative;
  padding: 5px 10px 25px;
}

.sendFeedback {
  margin: 0 auto;
}

</style>
