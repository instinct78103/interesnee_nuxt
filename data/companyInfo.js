export const companyInfo = {
  ekaterinburg: {
    name: 'Общество с ограниченной ответственностью «Очень Интересно»',
    inn: '6670121971',
    kpp: '667801001',
    ogrn: '1069670120178',
    legalAddress: '620027, г. Екатеринбург, пер. Красный, д. 5, к. 1, офис 210',
    actualAddress: '620027, г. Екатеринбург, пер. Красный, д. 5, к. 1, офис 210',
    email: 'office.e@interesnee.ru',
    director: 'Янковенко Владимир Викторович',
  },
  krasnoyarsk: {
    name: 'Общество с ограниченной ответственностью «Очень Интересно»',
    inn: '2460227734',
    kpp: '246001001',
    ogrn: '1112468002261',
    legalAddress: '660041, Красноярск, ул. Курчатова 1А - 64',
    actualAddress: '660017, Красноярск, ул. Красной Армии 10, стр 5',
    email: 'office.k@interesnee.ru',
    director: 'Бидус Борис Михайлович',
  },
  sochi: {
    name: 'Филиал «Сочинский» Общества с ограниченной ответственностью «Очень Интересно»',
    inn: '6670121971',
    kpp: '236643001',
    ogrn: '1069670120178',
    legalAddress: '620027, г. Екатеринбург, пер. Красный, д. 5, к. 1, офис 210',
    actualAddress: '354057, Краснодарский край, г. Сочи, ул. Невская, д. 23, офис 14',
    email: 'office.s@interesnee.ru',
    director: 'Васильев Константин Олегович',
  },
};

export const companyFields = [
  { key: 'name', title: 'Полное наименование предприятия' },
  { key: 'inn', title: 'ИНН' },
  { key: 'kpp', title: 'КПП' },
  { key: 'ogrn', title: 'ОГРН' },
  { key: 'legalAddress', title: 'Юридический адрес' },
  { key: 'actualAddress', title: 'Фактический адрес' },
  { key: 'email', title: 'Электронная почта' },
  { key: 'director', title: 'Директор' },
];