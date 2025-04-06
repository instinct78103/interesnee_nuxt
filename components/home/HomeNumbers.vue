<script setup>
const items = [
  {
    number: '2078',
    title: 'Выполненных проектов',
    text: 'eCommerce, Social Media, CRM, AR/VR, IoT – у нас есть все!',
  },
  {
    number: '200',
    title: 'Сотрудников в компании',
    text: 'Офисы в Калифорнии, Нью-Йорке, Вьетнаме, России и Казахстане',
  },
  {
    number: '18',
    title: 'Лет на рынке',
    text: 'Решаем нетривиальные задачи, используя современные технологии',
  },
  {
    number: '14',
    title: 'Языков программирования',
    text: 'Python, C#, TypeScript, Swift, Kotlin, PHP и другие',
  },
  {
    number: '> 37',
    title: 'Технологий и фреймворков',
    text: 'Django, Angular, React, Laravel, Flask, .NET Core, Kubernetes и другие',
  },
  {
    number: '> 42',
    title: 'Сервисов',
    text: 'Jira, GitHub, Google Workspace, Slack, AWS и другие',
  },
];
</script>

<template>
  <section class="root">
    <div class="container">

      <div class="heading">
        <h2 class="title">В цифрах</h2>
      </div>

      <div class="content">
        <div class="row">
          <div
            v-for="item in items"
            :key="item.title"
            class="col"
          >
            <p class="number">{{ item.number }}</p>
            <span class="divider mobHidden" />
            <p class="itemTitle">{{ item.title }}</p>
            <p class="text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/scss/helpers';

.root {
  @extend %section;
}

.container {
  padding-inline: 10px;
  //@extend %container;
}

.title {
  @extend %sectionTitle;
  margin: 0 0 70px;
  text-align: center;

  @media(width <= 768px) {
    margin-bottom: 50px;
  }
}

.divider {
  display: block;
  margin: 0 auto 6px;
  width: 68px;
  height: 3px;
  background-color: #dbdbdb;
}

.content {
  max-width: 1140px;
  margin: 0 auto;
  //padding-inline: var(--grid-gutter);
}

.row {
  //display: flex;
  //flex-wrap: wrap;
  //margin-inline: calc(-1 * var(--grid-gutter));
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 100%, 350px), 1fr));
  gap: 20px;
}

.col {
  //width: 33.3%;
  //padding: 0 var(--grid-gutter);
  text-align: center;
  //margin-bottom: 20px;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4;
  gap: 0;

  @media(width < 768px) {
    position: relative;
    //width: 100%;
    padding-bottom: 35px;
    margin-bottom: 35px;
  }
}

.col::after {
  @media(width < 768px) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 1px;
    background-color: var(--gray-4);
  }
}

.col:last-child {
  @media(width < 768px) {
    //padding-bottom: 0;
  }
}

.col:last-child::after {
  @media(width < 768px) {
    //display: none;
  }
}

.number {
  @extend %sectionTitle;
  //position: relative;
  margin: 0 0 4px;

  @media(width < 768px) {
    font-size: 46px;
    font-weight: normal;
  }
}

.itemTitle {
  font-size: clamp(20px, 6vw, 24px);
  line-height: 1.25;
  margin: 0 0 10px;
  color: var(--blue);

  @media(width < 768px) {
    font-weight: 600;
  }
}

.text {
  line-height: 25px;
  margin: 0;
  color: var(--gray-dark);
  text-wrap: balance;
  width: min(100%, 320px);
  justify-self: center;
}

//.button {
//  @extend %button;
//  padding-inline: 60px;
//}

.buttonWrapper {
  margin-top: 70px;
  text-align: center;

  @media(width < 768px) {
    margin-top: 10px;
  }
}

.mobHidden {
  @media(width < 768px) {
    display: none;
  }
}
</style>