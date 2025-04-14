<template>
  <section :class="[$style.root, {[$style.promoRoot]: showPromoTitle }]">
    <div :class="$style.container">
      <h2 :class="$style.title">
        <template v-if="showPromoTitle">
          Summer Camp {{ (new Date()).getFullYear() }}
        </template>
        <template v-else>
          В настоящий момент набор на практику уже закрыт, но вы можете прислать заявку по интересующему Вас направлению.
        </template>
      </h2>
      <div :class="$style.content">

        <div :class="$style.contentMain">
          <div :class="$style.contentRow">
            <h2 :class="$style.contentTitle">Это для тебя, если ты:</h2>
            <ul :class="$style.contentList">
              <li>студент, выпускник технических направлений, начинающий специалист;</li>
              <li>имеешь непреодолимое желание присоединиться к команде профессионалов;</li>
              <li>жаждешь начать карьеру в крутой ИТ-компании;</li>
              <li>не боишься ответственности и работаешь на результат;</li>
              <li>имеешь чувство юмора :-)</li>
            </ul>
          </div>
          <div :class="$style.contentRow">
            <h2 :class="$style.contentTitle">Наши условия:</h2>
            <ul :class="$style.contentList">
              <li>возможность подключиться к команде разработки;</li>
              <li>гибкое начало рабочего дня;</li>
              <li>обязательное присутствие в офисе 4 часа в день;</li>
              <li>пицца по четвергам.</li>
            </ul>
          </div>
          <div :class="$style.contentRow">
            <h2 :class="$style.contentTitle">Для участия необходимо:</h2>
            <ul :class="$style.contentList">
              <li>пройти собеседование;</li>
              <li>выполнить тестовое задание;</li>
              <li>получить предложение пройти обучение у нас!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

defineProps({
  showPromoTitle: {
    type: Boolean,
    required: false,
    default: false,
  },
})

</script>

<style lang="scss" module>
@use '@/scss/helpers';

$team-offer-background: #fff2f2;

.root {
  @extend %section;
  padding-bottom: 0;
}

.root:nth-child(odd) {
  @media(width <= 480px) {
    background-color: #fff;
  }
}

.root::after {
  display: none;
}

.container {
  @extend %container;
  max-width: 1170px;
}

.root .rotated {
  max-width: 100%;
}

.title {
  @extend %sectionTitle;
  margin-block: clamp(20px, 6vw, 45px);
  text-align: center;
  text-wrap: balance;
}

/*========== content ===========*/
.content {
  display: flex;
  gap: 20px;

  @media (width < 1024px) {
    flex-direction: column;
  }
}

.contentMain {
  border: 2px solid #f75050;
  border-radius: 4px;
  background: #fff2f2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  gap: 20px;

  @media (width <= 480px) {
    padding: 20px;
  }

  @media (width < 1024px) {
    max-width: 100%;
  }
}

.contentTitle {
  color: var(--red);
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 20px;
}

.contentTitleSmall {
  color: var(--blue);
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}

.contentList {
  opacity: 0.8;
  color: var(--gray-dark);
  font-size: 16px;
  line-height: 1.2;
  font-weight: normal;
  padding-left: 0;
  margin-top: 0;
  list-style: none;
  margin-left: 20px;

  li {
    position: relative;
    list-style: disc;

    &::marker {
      font-size: 14px;
    }
  }
}

.contentSide {
  flex-direction: column;
  flex-basis: 150px;
  justify-content: space-between;

  @media (width < 1024px) {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 0 25px;
    flex-basis: auto;
  }
}

.sideItem {
  height: 130px;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  padding: 10px;
  background: #fff;
  box-shadow: inset 0 1px 2px 0 rgba(139, 139, 139, 0.5);
  margin-top: 20px;

  @media (width < 1024px) {
    margin: 0;
    padding: 10px;
  }

  @media (width <= 480px) {
    margin: 0;
    height: 120px;
    width: 40%;
    padding: 5px;
  }

  &:first-child {
    margin-top: 0;
  }

  &:not(:last-child) {
    margin-right: 3px;
  }
}

.sideItem > img {
  flex-shrink: 1;
  border-radius: 5px;
  width: 100%;
}

.sliderDots {
  bottom: 105px;
}

.promoRoot {
  padding-top: 0;
}
</style>
