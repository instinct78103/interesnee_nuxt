<template>

  <Dialog v-if="isFormSubmitted" ref="dialog">
    <template #body>
    <div>
      <h3>{{isSuccess ? 'Спасибо!' : 'Что-то пошло не так!'}}</h3>
      <p>
        {{isSuccess
        ? 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время.'
        : 'Не получилось обработать Ваш запрос. Вы можете связаться с нами, отправив письмо на почту <a href="mailto:hr@interesnee.ru">hr@interesnee.ru</a>, или попробовать позже.'
        }}
      </p>
      <button>Закрыть</button>
    </div>
    </template>
  </Dialog>

<!--  <section v-if="filteredJob && renderJob">-->
<!--    <Hero kind="small">{{ filteredJob?.title.replace('(RU)', '') }}</Hero>-->
<!--    <div :class="$style.root">-->
<!--      <div :class="$style.container">-->
<!--        <p :class="$style.contentTitle">Описание:</p>-->
<!--        <div :class="$style.content" v-clean-html="filteredJob.description" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->

  <section :class="[$style.root, $style.backgrounded]" :style="{ backgroundColor: bgColor}">
    <div :class="[$style.container, $style.formContainer]">
      <h2 :class="$style.title">{{ props.title }}</h2>
      <form @submit.prevent="handleSubmit" style="--gap: 15px;display:flex;flex-flow:row wrap; gap: var(--gap);" autocomplete="off">

        <div :class="[$style.col, $style.col_6]">
          <input v-model="form.firstname.value" @blur="validateField('firstname')" :class="[$style.input, {[$style.error]: errors.firstname && !isFirstnameValid}]" name="firstname" type="text" placeholder="Имя" />
          <transition name="slide-top"><span v-show="errors.firstname && !isFirstnameValid" :class="[$style.detail]">{{ errors.firstname }}</span></transition>
        </div>

        <div :class="[$style.col, $style.col_6]">
          <input v-model="form.lastname.value" @blur="validateField('lastname')" :class="[$style.input, {[$style.error]: errors.lastname && !isLastnameValid}]" name="lastname" type="text" placeholder="Фамилия" />
          <transition name="slide-top"><span v-show="errors.lastname && !isLastnameValid" :class="$style.detail">{{ errors.lastname }}</span></transition>
        </div>

        <div :class="[$style.col, $style.col_6]">
          <input v-model="form.phone.value" @blur="validateField('phone')" @change="onChangePhone" :class="[$style.input, {[$style.error]: errors.phone && !isPhoneValid}]" v-mask="'+7 (###) ###-##-##'" name="phone" type="text" placeholder="Телефон" />
          <transition name="slide-top"><span v-show="errors.phone && !isPhoneValid" :class="$style.detail">{{ errors.phone }}</span></transition>
        </div>

        <div :class="[$style.col, $style.col_6]">
          <input v-model="form.userEmail.value" @blur="validateField('userEmail')" name="email" :class="[$style.input, {[$style.error]: errors.userEmail && !isEmailValid}]" type="text" placeholder="Email"/>
          <transition name="slide-top"><span v-show="errors.userEmail && !isEmailValid" :class="$style.detail">{{ errors.userEmail }}</span></transition>
        </div>

        <div :class="[$style.col, $style.col_12]">
          <template v-if="select">
            <select :class="[$style.input, {[$style.error]: errors.camp }, $style.select]" v-model="form.selectedCamp.value" @blur="validateField('selectedCamp')" name="campSelect">
              <option value="" disabled hidden>Направление практики</option>
              <option v-for="(value, index) in props.select" :key="index" :value="index">{{ value.name }}</option>
            </select>
            <input v-model="form.selectedCamp" name="camp" type="hidden" />
            <transition name="slide-top"><span v-show="errors.selectedCamp && !isSelectCampValid" :class="$style.detail">{{ errors.selectedCamp }}</span></transition>
          </template>
          <template v-else>
            <input v-model="form.vacancy.value" @blur="validateField('vacancy')" :class="[$style.input, {[$style.error]: errors.vacancy && !isVacancyValid }]" name="vacancy" type="text" placeholder="Интересующая вакансия" />
            <transition name="slide-top"><span v-show="errors.vacancy && !isVacancyValid" :class="$style.detail">{{ errors.vacancy }}</span></transition>
          </template>
        </div>

        <template v-if="showCampCity">
          <div :class="[$style.col, $style.col_12]">
            <select :class="[$style.input, {[$style.error]: errors.campSelectedCity }, $style.select]" v-model="form.selectedCity.value" @blur="validateField('selectedCity')" name="campCitySelect">
              <option value="" disabled hidden>Город</option>
              <option v-for="(city, cityName) in cities" :key="cityName" :value="cityName">{{ city }}</option>
            </select>
            <input v-model="form.selectedCity.value" name="campSelectedCity" type="hidden" />
            <transition name="slide-top"><span v-show="errors.selectedCity && !isSelectedCityValid" :class="$style.detail">{{ errors.selectedCity }}</span></transition>
          </div>

          <div v-if="form.selectedCity.value === 'other'" :class="[$style.col, $style.col_12]">
            <input v-model="form.campCity.value" @blur="validateField('campCity')" :class="[$style.input, {[$style.error]: errors.campCity }]" name="campCity" type="text" placeholder="Город" />
            <transition name="slide-top"><span v-show="errors.campCity" :class="$style.detail">{{ errors.campCity }}</span></transition>
          </div>

          <div :class="[$style.col, $style.col_12]">
            <input v-model="form.link.value" :class="[$style.input]" name="link" type="text" placeholder="Ссылка на ваш профиль в социальных сетях">
          </div>

          <div :class="[$style.col, $style.col_12]">
            <select :class="[$style.input, {[$style.error]: errors.selectedStudy }, $style.select]" v-model="form.selectedStudy.value" name="camp">
              <option value="" disabled hidden>Учитесь или уже окончили?</option>
              <option v-for="(education, index) in educations" :key="index" :value="index">{{ education }}</option>
            </select>
            <transition name="slide-top"><span v-show="errors.selectedStudy" :class="$style.detail">{{ errors.selectedStudy }}</span></transition>
          </div>

          <div v-if="form.selectedStudy.value === 'other'" :class="[$style.col, $style.col_12]">
            <input v-model="form.study.value" @blur="validateField('study')" :class="[$style.input, {[$style.error]: errors.study && !isStudyValid }]" name="study" type="text" placeholder="Учитесь или уже окончили?" />
            <transition name="slide-top"><span v-show="errors.study && !isStudyValid" :class="$style.detail">{{ errors.study }}</span></transition>
          </div>

          <div :class="[$style.col, $style.col_12]">
            <input v-model="form.university.value" :class="[$style.input]" name="university" type="text" placeholder="Название вуза">
          </div>

          <div :class="[$style.col, $style.col_12]">
            <input v-model="form.department.value" :class="[$style.input]" name="department" type="text" placeholder="Факультет / Институт">
          </div>

          <div :class="[$style.col, $style.col_12]">
            <input v-model="form.specialty.value" :class="[$style.input]" name="specialty" type="text" placeholder="Специальность">
          </div>

          <div :class="[$style.col, $style.col_12]">
            <input v-mask="'####'" v-model.trim="form.year.value" :class="[$style.input]" name="year" type="text" placeholder="Год окончания">
          </div>

          <div :class="[$style.col, $style.col_12]">
            <input v-model="form.diploma.value" :class="[$style.input]" name="diploma" type="text" placeholder="Тема диплома">
          </div>

          <div :class="[$style.col, $style.col_12]">
            <textarea
              v-model="form.languages.value"
              :class="[$style.input]"
              name="languages"
              placeholder="Перечислите языки программирования и технологии, которые вы используете (в порядке предпочтения). Оцените уровень владения ими."
              @focus="languagesHint = true"
              @blur="languagesHint = false"
            />
            <p v-if="languagesHint" :class="$style.inputLabel">Перечислите языки программирования и технологии, которые вы используете (в порядке предпочтения). Оцените уровень владения ими.</p>
          </div>

          <div :class="[$style.col, $style.col_12]">
            <textarea
              v-model="form.achievements.value"
              :class="[$style.input, $style.achievements]"
              name="achievements"
              placeholder="Расскажите о своих достижениях - почему мы должны взять на практику именно вас? Если добились успеха в учебе - укажите средний балл зачетки. Вы участвовали в олимпиадах/конференциях/конкурсах - напишите об этом. Какие делали курсовые/дипломные работы. Если уже есть опыт работы (удаленная работа или что-то еще), то обязательно напишите об этом."
              @focus="achievementsHint = true"
              @blur="achievementsHint = false"
            />
            <p v-if="achievementsHint" :class="$style.inputLabel">Расскажите о своих достижениях - почему мы должны взять на практику именно вас? Если добились успеха в учебе - укажите средний балл зачетки. Вы участвовали в олимпиадах/конференциях/конкурсах - напишите об этом. Какие делали курсовые/дипломные работы. Если уже есть опыт работы (удаленная работа или что-то еще), то обязательно напишите об этом.</p>
          </div>

          <div :class="[$style.col, $style.col_12]">
            <textarea v-model="form.expectations.value" :class="[$style.input]" name="expectations" placeholder="Ожидания от практики" />
          </div>

          <div :class="[$style.col, $style.col_12]">
            <textarea v-model="form.whereFind.value" :class="[$style.input]" name="whereFind" placeholder="Откуда вы узнали о практике?" />
          </div>

          <div :class="[$style.col, $style.col_12]">
            <textarea
              v-model="form.hobby.value"
              :class="[$style.input]"
              name="hobby"
              placeholder="Укажите дополнительную информацию о себе – увлечения, хобби, игра на музыкальных инструментах и т.п."
              @focus="hobbyHint = true"
              @blur="hobbyHint = false"
            />
            <p v-if="hobbyHint" :class="$style.inputLabel">Укажите дополнительную информацию о себе – увлечения, хобби, игра на музыкальных инструментах и т.п.</p>
          </div>

          <div :class="[$style.col, $style.col_12]">
            <textarea
              v-model="form.feedback.value"
              :class="[$style.input]"
              name="feedback"
              placeholder="Обратная связь - возможно, вы хотели бы получить еще какую-то информацию о нашей компании? Если вам есть что спросить - пишите, не стесняйтесь."
              @focus="feedbackHint = true"
              @blur="feedbackHint = false"
            />
            <p v-if="feedbackHint" :class="$style.inputLabel">Обратная связь - возможно, вы хотели бы получить еще какую-то информацию о нашей компании? Если вам есть что спросить - пишите, не стесняйтесь.</p>
          </div>
        </template>

        <div :class="[$style.col, $style.col_12]">
          <p :class="$style.chooseText">{{ fileTitle }}</p>
          <div :class="$style.choose">
            <input id="choose-file" type="file" accept="application/pdf, text/rtf, .txt, .doc, .docx" @change="onFileChange">
            <label for="choose-file">Выбрать файл</label>
            <small v-if="form.resumeFileName.value">{{ form.resumeFileName.value }}</small>
            <small v-else>Выбранный файл не должен превышать 500 KB</small>
            <transition name="slide-top"><span v-if="fileError" :class="$style.detail">{{ fileError }}</span></transition>
          </div>
        </div>

        <div v-if="!showCampCity" :class="[$style.col, $style.col_12]">
          <textarea v-model="form.resumeText.value" :class="$style.input" :placeholder="textAreaPlaceholder" name="resumeText" rows="6" />
        </div>

        <div :class="[$style.col]">
          <label>
            <input name="terms" type="checkbox" v-model="form.personalData.value" style="margin-right: 5px;" @change="validateField('personalData')"/>
            <small>Я даю согласие на обработку моих персональных данных, указанных в форме обращения и всех приложенных файлах, в ООО "Очень Интересно", с целью предложения мне вакансий ООО "Очень Интересно". Я понимаю и соглашаюсь, что мои данные будут храниться и обрабатываться в ООО "Очень Интересно" в течение пяти лет, в соответствии с Федеральным законом "О персональных данных" и <a aria-label="Политикой обработки персональных данных" target="_blank" rel="noreferrer noopener" href="/static/docs/privacy_policy.pdf">Политикой обработки персональных данных</a>.</small>
          </label>
          <transition name="slide-top"><span v-show="errors.personalData && !isPersonalDataValid" :class="$style.detail">{{ errors.personalData }}</span></transition>
        </div>

        <div :class="$style.captchaWrapper">
          <div class="g-recaptcha" :data-sitekey="recaptchaToken" :data-callback="onReCAPTCHA"></div>
          <div :class="$style.robot">
            <transition name="slide-top"><span v-show="errors.recaptcha && !isRecaptchaValid">{{ errors.recaptcha }}</span></transition>
          </div>
        </div>

        <button :class="[$style.submit, {[$style.submitCamp]: showCampCity }]" type="submit" aria-label="Подтвердить форму">Отправить</button>

      </form>
    </div>

    <ContactsListBlock v-if="!showCampCity" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/store/useJobs.js';
import { useRoute } from 'vue-router/auto';
import { mask } from 'vue-the-mask';
const vMask = mask;
const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'));
import Hero from '@/components/Hero.vue';
import ContactsListBlock from '@/components/ContactsListBlock.vue';

const dialog = ref(null);
const showModal = () => dialog?.value?.showModal();

const cities = {
  ekaterinburg: 'Екатеринбург',
  krasnoyarsk: 'Красноярск',
  sochi: 'Сочи',
  other: 'Другой',
};
const educations = {
  bachelor: 'Студент бакалавриата',
  master: 'Студент магистратуры',
  specialist: 'Студент специалитета',
  graduateStudent: 'Аспирант',
  other: 'Другое',
};
const recaptchaToken = '6Lco8VEUAAAAAJ4BaSfaC1jAfjyPubO3D4lFkMqk';

const { jobs } = storeToRefs(useJobsStore());
const route = useRoute();
const props = defineProps(
  {
    title: {
      type: String,
      required: false,
      default: 'Связаться с нами',
    },
    fileTitle: {
      type: String,
      required: false,
      default: 'Прикрепить резюмe',
    },
    select: {
      type: Array,
      required: false,
      default: undefined,
    },
    bgColor: {
      type: String,
      required: false,
      default: '#7f7f7',
    },
    showCampCity: {
      type: Boolean,
      required: false,
      default: false,
    },
    textAreaPlaceholder: {
      type: String,
      required: false,
      default: 'Или напишите резюме здесь',
    },
    namePostfix: {
      type: String,
      required: false,
      default: '',
    },
  },
);

const achievementsHint = ref(false);
const feedbackHint = ref(false);
const fileError = ref(false);
const hobbyHint = ref(false);
const isFormSubmitted = ref(false)
const isSuccess = ref(false);
const job = ref([]);
const languagesHint = ref(false);
const recaptchaError = ref(null);
const recaptchaVerifyToken = ref(null);
const selectVal = ref(0);

const form = {
  firstname: ref(''),
  lastname: ref(''),
  phone: ref(''),
  userEmail: ref(''),
  selectedCamp: ref(''),
  vacancy: ref(''),
  selectedCity: ref(''),
  campCity: ref(''),
  link: ref(''),
  selectedStudy: ref(''),
  study: ref(''),
  university: ref(''),
  department: ref(''),
  specialty: ref(''),
  year: ref(''),
  diploma: ref(''),
  languages: ref(''),
  achievements: ref(''),
  expectations: ref(''),
  whereFind: ref(''),
  hobby: ref(''),
  feedback: ref(''),
  resumeFileName: ref(''),
  resumeText: ref(''),
  personalData: ref(false),
  recaptcha: ref(false)
}
const errors = ref({})

const isFirstnameValid = computed(() => form.firstname.value.trim() !== '');
const isLastnameValid = computed(() => form.lastname.value.trim() !== '');
const isPhoneValid = computed(() => form.phone.value.replaceAll(/[^0-9]/g, '').length === 11);
const isEmailValid = computed(() => form.userEmail.value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim));
const isSelectCampValid = computed(() => form.selectedCamp.value !== '' || !props.select);
const isVacancyValid = computed(() => form.vacancy.value !== '');
const isSelectedCityValid = computed(() => form.selectedCity.value !== '' || !props.showCampCity);
const isCampCityValid = computed(() => form.campCity.value !== '' || form.selectedCity.value !== 'other');
const isStudyValid = computed(() => form.study.value !== '' || form.selectedStudy.value !== 'other');
const isPersonalDataValid = computed(() => form.personalData.value === true)
const isRecaptchaValid = computed(() => form.recaptcha.value === true)

const validateField = (field) => {
  if (Object.hasOwn(errors.value, field)) {
    delete errors.value[field]
  }
  if (field === 'firstname' && !isFirstnameValid.value) {
    errors.value.firstname = 'Поле Имя обязательно для заполнения';
  }
  if (field === 'lastname' && !isLastnameValid.value) {
    errors.value.lastname = 'Поле Фамилия обязательно для заполнения';
  }
  if (field === 'phone' && !isPhoneValid.value) {
    errors.value.phone = 'Поле Телефон обязательно для заполнения';
  }
  if (field === 'userEmail' && !isEmailValid.value) {
    errors.value.userEmail = 'Поле E-mail обязательно для заполнения';
  }
  if (field === 'selectedCamp' && !isSelectCampValid.value) {
    errors.value.selectedCamp = 'Поле Направление практики обязательно для заполнения';
  }
  if (field === 'vacancy' && !isVacancyValid.value) {
    errors.value.vacancy = 'Поле Направление практики обязательно для заполнения';
  }
  if (field === 'selectedCity' && !isSelectedCityValid.value) {
    errors.value.selectedCity = 'Поле Город обязательно для заполнения';
  }
  if (field === 'campCity' && !isCampCityValid.value) {
    errors.value.campCity = 'Поле Город обязательно для заполнения';
  }
  if (field === 'study' && !isStudyValid.value) {
    errors.value.study = 'Поле Образование обязательно для заполнения';
  }
  if (field === 'personalData' && !isPersonalDataValid.value) {
    errors.value.personalData = 'Ваше согласие обязательно';
  }
  if (field === 'recaptchaError' && !isRecaptchaValid.value) {
    errors.value.recaptcha = 'Подтвердите, что вы не робот';
  }
};

const handleSubmit = async () => {
  errors.value = {}; // Clear previous errors

  const fieldsToValidate = [
    'firstname',
    'lastname',
    'phone',
    'userEmail',
    'selectedCamp',
    'vacancy',
    'selectedCity',
    'campCity',
    'study',
    'personalData',
    'recaptchaError',
  ];

  fieldsToValidate.forEach(field => validateField(field))

  try {
    if (!recaptchaVerifyToken.value) {
      return false;
    }

    if (fileError.value) {
      return false;
    }

    if (Object.values(errors.value).every(e => e !== '')) {
      return false;
    }

    await submitForm();

  } catch (e) {
    console.warn(e)
  }
};

async function submitForm() {

  if (form.selectedCamp.value) {
    filterJob(props.select[form.selectedCamp.value]);
  }

  const { hash, sessionId } = await (await fetch('/sign-form.php')).json();

  const data = {
    firstname: form.firstname.value,
    lastname: `${form.lastname.value}${props.namePostfix ? ` ${props.namePostfix}` : ''}`,
    phone: form.phone.value,
    vacancy: form.vacancy.value,
    email: form.userEmail.value,
    resumeText: form.resumeText.value,
    resumeFile: form.resumeFile.value,
    resumeFileName: form.resumeFileName.value,
    jobID: job.value.id,
    city: route.query.city || form.selectedCity.value,
    campCity: form.selectedCity.value,
    hash,
    sessionId,
  };

  if (props.showCampCity) {
    data.fromCampPage = true;
    data.campCity = form.selectedCity.value || cities[form.selectedCity.value];
    data.city = form.campCity.value || cities[form.selectedCity.value];
    data.study = form.study.value || educations[form.selectedStudy.value];
    data.university = form.university.value;
    data.department = form.department.value;
    data.specialty = form.specialty.value;
    data.year = form.year.value;
    data.diploma = form.diploma.value;
    data.languages = form.languages.value;
    data.achievements = form.achievements.value;
    data.expectations = form.expectations.value;
    data.whereFind = form.whereFind.value;
    data.hobby = form.hobby.value;
    data.feedback = form.feedback.value;
    data.link = form.link.value;
  }

  const resp = await (await fetch('/save-form.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })).json();

  isFormSubmitted.value = true; // Download component
  isSuccess.value = resp?.success || false;

  if (isSuccess.value) {
    form.achievements.value = '';
    form.campCity.value = '';
    form.campCity.value = '';
    form.department.value = '';
    form.diploma.value = '';
    form.expectations.value = '';
    form.feedback.value = '';
    form.firstname.value = '';
    form.hobby.value = '';
    form.languages.value = '';
    form.lastname.value = '';
    form.link.value = '';
    form.phone.value = '';
    form.resumeFile.value = '';
    form.resumeFileName.value = '';
    form.resumeText.value = '';
    form.specialty.value = '';
    form.study.value = '';
    form.university.value = '';
    form.userEmail.value = '';
    form.vacancy.value = '';
    form.whereFind.value = '';
    form.year.value = '';
  }

  showModal();
}

/**
 * Custom directive -- start
 */
const vCleanHtml = {
  mounted(el, binding) {
    el.innerHTML = binding.value;
    sanitizeHtml(el);
  },
  updated(el, binding) {
    el.innerHTML = binding.value;
    sanitizeHtml(el);
  },
};

function sanitizeHtml(container) {
  container.querySelectorAll('*').forEach(el => {
    // remove all attributes
    [...el.attributes].forEach(attr => el.removeAttribute(attr.name));

    //remove &nbsp
    if (el.innerHTML) {
      el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
    }
  });
}
/**
 * Custom directive -- end
 */

const emits = defineEmits(['onChangePhone']);

function onChangePhone(event) {
  form.phone.value = event.target.value;
  emits('onChangePhone', form.phone.value);
}

const isJobPage = computed(() => route.name === '/job');

function onFileChange(e) {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) {
    fileError.value = false;
    return;
  }

  const ext = /\.(pdf|doc|docx|txt|rtf)$/i.test(e.target.files[0].name);
  if (!ext) {
    let msg = 'Файл должен быть в формате';
    if (isJobPage.value) {
      msg = 'Пожалуйста прикрепите резюме в формате';
    }
    fileError.value = `${msg} pdf, doc, docx, txt, rtf`;
    return;
  }

  const attachSize = 0.5 * 1024 * 1024;
  const attachFile = e.target.files[0];
  if (attachFile.size > attachSize) {
    let msg = 'Размер файла привышает';
    if (isJobPage.value) {
      msg = 'Размер резюме больше';
    }
    fileError.value = `${msg} 500 KB`;
    return;
  }

  fileError.value = false;
  createFile(files[0]);
}

function createFile(file) {
  const reader = new FileReader();

  reader.onload = e => {
    form.resumeFile.value = e.target.result;
    form.resumeFileName.value = file.name;
  };
  reader.readAsDataURL(file);
}

function filterJob(boardCode) {
  const currentJob = jobs.value.filter(job => job.board_code === boardCode)[0];

  job.value = currentJob;
  form.vacancy.value = currentJob?.title;
  form.vacancy.value = currentJob?.title;

  return currentJob;
}

const filteredJob = computed(() => {
  if (jobs.value.length === 0) {
    return false;
  }

  const currentJobBoardCode = useRoute().query.job || props.select[selectVal.value];

  return filterJob(currentJobBoardCode);
});

const renderJob = computed(() => !!useRoute().query.job);

function loadRecaptchaScript() {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js`;
  script.id = 'recaptcha';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

onMounted(() => loadRecaptchaScript());
onUnmounted(() => document.querySelector('#recaptcha').remove());

const onReCAPTCHA = (token) => {
  recaptchaVerifyToken.value = token;
  recaptchaError.value = null;
};
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.root {
  @extend %section;
  text-align: left;
}

.root.backgrounded {
  background: var(--white-gray);
}

.container {
  @extend %container;
  max-width: 1170px;
}

.formContainer {
  max-width: 790px;
}

.vacancyRow {
  margin-top: 10px;

  @media(width < 480px) {
    margin-top: 0;
  }
}

.col {
  position: relative;
  padding: 0 0 25px;
}

.col_6 {
  width: calc(50% - var(--gap, 20px) / 2);

  @media(width <= 576px) {
    width: 100%;
  }
}

.col_12 {
  width: 100%;
}

.contentTitle {
  font-size: clamp(20px, 5vw, 24px);
  margin: 0 0 20px;
  color: var(--red);

  @media(width <= 480px) {
    text-align: center;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  * {
    text-wrap: pretty;

    @media(width <= 480px) {
      text-wrap: balance;
    }

    &:empty {
      display: none;
    }
  }
}

.content :where(p, strong, li) {
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-dark);
}

.content strong {
  display: block;
  color: var(--blue);

  @media(width <= 480px) {
    text-align: center;
  }
}

.content ul {
  list-style: none;
  margin-left: 20px;
}

.content li {
  position: relative;
  list-style: disc;

  &::marker {
    font-size: 14px;
  }
}

.title {
  @extend %sectionTitle;
  margin: 0 0 clamp(46px, 5vw, 60px);
  text-align: center;
}

.input {
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  padding: 16px 20px;
  border: 1px solid var(--gray-4);
  border-radius: 5px;
  outline: none;
  background-color: #fff;
  color: var(--gray-dark);
  resize: vertical;
  position: relative;
  z-index: 3;
  field-sizing: content;

  &:focus {
    border-color: var(--gray-3);
  }
}

.input::placeholder {
  word-break: break-word;
}

.input.error {
  border-color: var(--red-light);
}

.select {
  cursor: pointer;
  padding-right: 30px;
}

.select option {
  color: var(--black);
}

.select option[disabled] {
  display: none;
}

.placeholder {
  color: #2e2e2eb3;
}

.captchaWrapper {
  padding-bottom: 25px;
}

.submit {
  @extend %button;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  @media(width <= 480px) {
    display: block;
    margin: 0 auto;
    width: auto;
    padding-block: 15px;
  }

  &:disabled {
    background-color: var(--red-light);
  }
}

.choose {
  font-size: 0;
}

.choose input {
  display: none;
}

.choose label {
  font-size: 10px;
  line-height: 14px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  padding: 5px 10px;
  border: 2px solid var(--red-light);
  border-radius: 50px;
  color: var(--red-light);
  font-weight: bold;
  text-transform: uppercase;

  @media(width <= 480px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
}

.choose input + label {
  cursor: pointer;
}

.choose small {
  font-size: 14px;
  line-height: 16px;
  display: inline-block;
  vertical-align: middle;
  color: var(--gray-3);

  @media(width <= 480px) {
    display: block;
  }
}

.chooseText {
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 20px;
  color: var(--gray-dark);
}

.inputLabel {
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 5px;
  color: var(--gray-5);
}

.detail {
  font-size: 12px;
  line-height: 14px;
  position: absolute;
  top: calc(100% - 20px);
  left: 0;
  color: var(--red-light);
  text-wrap: pretty;
}

.robot {
  font-size: 12px;
  line-height: 14px;
  height: 30px;
  color: var(--red-light);
  display: flex;
  align-items: center;
}

.submitCamp {
  font-size: 20px;
}

.achievements {
  min-height: 150px;
}
</style>

<style lang="scss">
.slide-top-enter-active {
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
}

.slide-top-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.slide-top-leave-from,
.slide-top-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
