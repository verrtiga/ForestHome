import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';
import { initPhoneInput } from './modules/form-validate/init-phone-input';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();


  const scrollButton = document.getElementById('scroll');
  const button2 = document.getElementById('order');

  scrollButton.addEventListener('click', () => {
    button2.scrollIntoView({ behavior: 'smooth' });
  });

  const scrollButton2 = document.getElementById('scroll2');
  const button22 = document.getElementById('order');

  scrollButton2.addEventListener('click', () => {
    button22.scrollIntoView({ behavior: 'smooth' });
  });

  const scrollButton3 = document.getElementById('scroll3');
  const button33 = document.getElementById('order');

  scrollButton3.addEventListener('click', () => {
    button33.scrollIntoView({ behavior: 'smooth' });
  });

  const searchInput = document.getElementById('searchInput');
  const headings = document.querySelectorAll('h2,h1,h3');

  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      section.classList.remove('highlight');
    });

    headings.forEach(heading => {
      const headingText = heading.textContent.toLowerCase();

      if (headingText.includes(searchText)) {
        heading.classList.add('highlight');
        heading.setAttribute('id', `heading-${headingText}`);
      } else {
        heading.classList.remove('highlight');
        heading.removeAttribute('id');
      }
    });
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchText = searchInput.value.toLowerCase();

      headings.forEach(heading => {
        const headingText = heading.textContent.toLowerCase();

        if (headingText.includes(searchText)) {
          heading.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
  


  window.addEventListener('DOMContentLoaded', () => {
    const allAnchorLinks = document.querySelectorAll('a[href^="#heading-"]');

    allAnchorLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });


  // Mask-input 



  let parent = document.querySelector('.input-group');
  initPhoneInput(parent);

  // Modules
  // ---------------------------------
  

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    // Получаем ссылки на кнопку и модальное окно
    const modalButton = document.querySelector('.btn-order');
    const modal = document.querySelector('.modal');
    const inputName = document.getElementById('Name');
    const modalOverlay = document.querySelector('.modal__overlay');

    // Получаем ссылку на элемент для закрытия модального окна
    const closeButton = modal.querySelector('.modal__close-btn');

    // Инициализируем модальное окно
    initModals();

    // Добавляем обработчик на кнопку
    modalButton.addEventListener('click', function () {
      modal.classList.add('is-active');
      inputName.focus();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // добавляем стиль к <body>, который запрещает прокрутку
      document.body.style.overflow = 'hidden';

      // устанавливаем позицию прокрутки обратно на сохраненные значения
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };

    });

    function closeModal() {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
      window.onscroll = null;
    }

    // Добавляем обработчик на кнопку закрытия
    closeButton.addEventListener('click', function () {
      // Закрываем модальное окно
      closeModal();

    });

    // Обработчик события, который закрывает модальное окно при нажатии на клавишу ESC
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });

    modalOverlay.addEventListener('click', function () {
      closeModal();
    })


    let parent = modal.querySelector('.input-group');

    initPhoneInput(parent);

    const form = new Form();
    window.form = form;
    form.init();
  });

  const aboutButton = document.querySelector('.btn-about');
  const modalAbout = document.querySelector('.modal-about');
  const modalAboutOverlay = document.querySelector('.modal-about__overlay');

  // Получаем ссылку на элемент для закрытия модального окна
  const closeAboutButton = modalAbout.querySelector('.modal-about__close-btn');

  // Инициализируем модальное окно
  initModals();

  // Добавляем обработчик на кнопку
  aboutButton.addEventListener('click', function () {
    modalAbout.classList.add('is-active');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // добавляем стиль к <body>, который запрещает прокрутку
    document.body.style.overflow = 'hidden';

    // устанавливаем позицию прокрутки обратно на сохраненные значения
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };

  });

  function closeModal() {
    modalAbout.classList.remove('is-active');
    document.body.style.overflow = '';
    window.onscroll = null;
  }

  // Добавляем обработчик на кнопку закрытия
  closeAboutButton.addEventListener('click', function () {
    // Закрываем модальное окно
    closeModal();

  });

  // Обработчик события, который закрывает модальное окно при нажатии на клавишу ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  modalAboutOverlay.addEventListener('click', function () {
    closeModal();
  })


});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
