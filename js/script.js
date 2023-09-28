document.addEventListener('DOMContentLoaded', () => {
    const smallImages = document.querySelectorAll('.column_item');
    const largeImage = document.querySelector('.large__img');
    
    smallImages.forEach((image) => {
      image.addEventListener('click', () => {
        const smallImageUrl = image.src;
        const largeImageUrl = largeImage.src;
        
        // Обмен ссылками на изображения
        image.src = largeImageUrl;
        largeImage.src = smallImageUrl;
      });
    });
  });



//burgers
  $(document).ready(function() {
    const menuToggle = $(".menu-toggle");
    const mobileNav = $(".header__nav-mob");
  
    menuToggle.click(function(e) {
      e.stopPropagation(); 
      $(document).click(function(e) {
        if (!e.target.closest('.menu-toggle, .header__nav-mob')) {
          $('.menu-toggle, .header__nav-mob').removeClass('active');
          $(document).off('click');
        }
      });
      $('.menu-toggle, .header__nav-mob').toggleClass('active');
    });
  
    mobileNav.click(function(e) {
      e.stopPropagation();
    });
  });


  
  
  


  //scroll
  function scrollToSection() {
    const targetSection = document.getElementById ('targetSection');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Pop-up
const section = document.getElementById('targetSection');
const popup = document.getElementById('popupForm');

section.addEventListener('click', (event) => {
  if (event.target.id === 'openFormBtn') {
    showPopup();
  } else if (event.target.classList.contains('close')) {
    hidePopup();
  }
});

function showPopup() {
  popup.style.display = 'block';
  document.body.classList.add('no-scroll');
}

function hidePopup() {
  popup.style.display = 'none';
  document.body.classList.remove('no-scroll');
}






// const section = document.getElementById('targetSection');
// const popup = document.getElementById('popupForm');
// const openFormBtn = document.getElementById('openFormBtn');
// const closeBtn = popup.querySelector('.close');

// function showPopup() {
//   popup.style.display = 'block';
//   document.body.style.overflow = 'hidden'; // Забороняємо прокрутку документа
// }

// function hidePopup() {
//   popup.style.display = 'none';
//   document.body.style.overflow = 'auto'; // Дозволяємо прокрутку документа
// }

// // Показати поп-ап
// openFormBtn.addEventListener('click', () => {
//   showPopup();
// });

// // Приховати поп-ап
// closeBtn.addEventListener('click', () => {
//   hidePopup();
// });




// const openFormBtn = document.getElementById('openFormBtn');
// const popupForm = document.getElementById('popupForm');
// const closeBtn = popupForm.querySelector('.close');

// openFormBtn.addEventListener('click', () => {
//   popupForm.style.display = 'block';
// });

// closeBtn.addEventListener('click', () => {
//   popupForm.style.display = 'none';
// });






const selectContainer = document.getElementById("js_pn-select");
const countrySearchInput = document.getElementById("js_search-input");
const noResultListItem = document.getElementById("js_no-results-found");
const dropdownTrigger = document.getElementById("js_trigger-dropdown");
const phoneNumberInput = document.getElementById("js_input-phonenumber");
const dropdownContainer = document.getElementById("js_dropdown");
const selectedPrefix = document.getElementById("js_number-prefix");
const selectedFlag = document.getElementById("js_selected-flag");
const listContainer = document.getElementById("js_list");

let countryList;

const selectCountry = (e) => {
  const listItem = e.target.closest("li");
  const flag = listItem.getAttribute("data-flag");
  const prefix = listItem.getAttribute("data-prefix");
  setNewSelected(prefix, flag);
  closeDropdown();
  addSelectedModifier(flag);
};

const setNewSelected = (prefix, flag) => {
  selectedFlag.src = `https://flagpedia.net/data/flags/icon/36x27/${flag}.png`;
  selectedPrefix.value = `+${prefix}`;
  selectContainer.style.setProperty("--prefix-length", prefix.length);
};

const addSelectedModifier = (flag) => {
  const previousSelected = document.querySelector(".pn-list-item--selected");
  const newSelected = document.querySelector(`.pn-list-item[data-flag="${flag}"]`);
  previousSelected.classList.remove("pn-list-item--selected");
  newSelected.classList.add("pn-list-item--selected");
};

const closeDropdown = () => {
  selectContainer.classList.remove("pn-select--open");
  listContainer.scrollTop = 0;
  countrySearchInput.value = "";
  countryList.search();
  phoneNumberInput.focus();
  removeDropdownEvents();
};

const openDropdown = () => {
  selectContainer.classList.add("pn-select--open");
  attatchDropdownEvents();
};

let countdown;

const closeOnMouseLeave = () => {
  countdown = setTimeout(closeDropdown, 2000);
};

const clearTimeOut = () => {
  clearTimeout(countdown);
};

const attatchDropdownEvents = () => {
  dropdownContainer.addEventListener("mouseleave", closeOnMouseLeave);
  dropdownContainer.addEventListener("mouseenter", clearTimeOut);
};

const removeDropdownEvents = () => {
  clearTimeout(countdown);
  dropdownContainer.removeEventListener("mouseleave", closeOnMouseLeave);
  dropdownContainer.removeEventListener("mouseenter", clearTimeOut);
};

const createList = () =>
  new Promise((resolve, _) => {
    countries.forEach((country, index, countries) => {
      const { name, prefix, flag } = country;

      const element = `
        <li class="pn-list-item ${flag === "nl" ? "pn-list-item--selected" : ""} js_pn-list-item"
          data-flag="${flag}" data-prefix="${prefix}" tabindex="0" role="button" aria-pressed="false">
          <img class="pn-list-item__flag" src="https://flagpedia.net/data/flags/icon/36x27/${flag}.png" />
          <span class="pn-list-item__country js_country-name">${name}</span>
          <span class="pn-list-item__prefix js_country-prefix">(+${prefix})</span>
        </li>`;

      listContainer.innerHTML += element;

      if (index === countries.length - 1) {
        resolve();
      }
    });
  });

const attatchListItemEventListeners = () =>
  new Promise((resolve, _) => {
    const listItems = document.querySelectorAll(".js_pn-list-item");

    listItems.forEach((item, index, listItems) => {
      item.addEventListener("click", (event) => {
        selectCountry(event);
      });
      item.addEventListener("keydown", (e) => {
        const keyD = e.key !== undefined ? e.key : e.keyCode;
        if (keyD === "Enter" || keyD === 13 || ["Spacebar", " "].indexOf(keyD) >= 0 || keyD === 32) {
          e.preventDefault();
          item.click();
        }
      });

      if (index === listItems.length - 1) {
        resolve();
      }
    });
  });

const initiateList = () => {
  countryList = new List("js_pn-select", {
    valueNames: ["js_country-name", "js_country-prefix"],
  });

  countryList.on("updated", (list) => {
    if (list.matchingItems.length < 5) {
      listContainer.classList.toggle("pn-list--no-scroll");
    }
    noResultListItem.style.display = list.matchingItems.length > 0 ? "none" : "block";
  });
};


const init = (countries) => {
  createList().then(attatchListItemEventListeners).then(initiateList);

  dropdownTrigger.addEventListener("click", () => {
    const isOpen = selectContainer.classList.contains("pn-select--open");
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });
};

const countries = [
    {
    name: "Austria",
    prefix: 43,
    flag: "at",
  },
  {
    name: "Belgium",
    prefix: 32,
    flag: "be",
  },
  {
    name: "Bulgaria",
    prefix: 359,
    flag: "bg",
  },
  {
    name: "Croatia",
    prefix: 385,
    flag: "hr",
  },
  {
    name: "Cyprus",
    prefix: 357,
    flag: "cy",
  },
  {
    name: "Czech Republic",
    prefix: 420,
    flag: "cz",
  },
  {
    name: "Denmark",
    prefix: 45,
    flag: "dk",
  },
  {
    name: "Estonia",
    prefix: 372,
    flag: "ee",
  },
  {
    name: "Finland",
    prefix: 358,
    flag: "fi",
  },
  {
    name: "France",
    prefix: 33,
    flag: "fr",
  },
  {
    name: "Germany",
    prefix: 49,
    flag: "de",
  },
  {
    name: "Greece",
    prefix: 30,
    flag: "gr",
  },
  {
    name: "Hungary",
    prefix: 36,
    flag: "hu",
  },
  {
    name: "Iceland",
    prefix: 354,
    flag: "is",
  },
  {
    name: "Republic of Ireland",
    prefix: 353,
    flag: "ie",
  },
  {
    name: "Italy",
    prefix: 39,
    flag: "it",
  },
  {
    name: "Latvia",
    prefix: 371,
    flag: "lv",
  },
  {
    name: "Liechtenstein",
    prefix: 423,
    flag: "li",
  },
  {
    name: "Lithuania",
    prefix: 370,
    flag: "lt",
  },
  {
    name: "Luxembourg",
    prefix: 352,
    flag: "lu",
  },
  {
    name: "Malta",
    prefix: 356,
    flag: "mt",
  },
  {
    name: "Netherlands",
    prefix: 31,
    flag: "nl",
  },
  {
    name: "Norway",
    prefix: 47,
    flag: "no",
  },
  {
    name: "Poland",
    prefix: 48,
    flag: "pl",
  },
  {
    name: "Portugal",
    prefix: 351,
    flag: "pt",
  },
  {
    name: "Romania",
    prefix: 40,
    flag: "ro",
  },
  {
    name: "Slovakia",
    prefix: 421,
    flag: "sk",
  },
  {
    name: "Slovenia",
    prefix: 386,
    flag: "si",
  },
  {
    name: "Spain",
    prefix: 34,
    flag: "es",
  },
  {
    name: "Sweden",
    prefix: 46,
    flag: "se",
  },
];

init(countries);




const pricePerItem = 197; // Ціна одного товару
let quantityInput = document.querySelector('.quantity-input');
let totalPriceElement = document.getElementById('totalPrice');

function updateTotalPrice() {
  const quantity = parseInt(quantityInput.value);
  const totalPrice = pricePerItem * quantity;
  totalPriceElement.textContent = `Total Price: €${totalPrice}`;
}

quantityInput.addEventListener('input', updateTotalPrice);

// Ви також можете додати обробник подій для кнопок зменшення/збільшення
// для автоматичного оновлення загальної суми:
let quantityDecreaseBtn = document.querySelector('.quantity-decrease');
let quantityIncreaseBtn = document.querySelector('.quantity-increase');

quantityDecreaseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
    updateTotalPrice();
  }
});

quantityIncreaseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let currentValue = parseInt(quantityInput.value);
  if (currentValue < 15) {
    quantityInput.value = currentValue + 1;
  updateTotalPrice();
  }
});

// Виклик функції для початкового відображення загальної суми
updateTotalPrice();


const emailInput = document.querySelector(".form-input input[type='email']");
const errorText = document.querySelector(".form-input__error");

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue.trim() || emailPattern.test(emailValue)) {
    errorText.classList.remove("active");
  } else {
    errorText.classList.add("active");
  }
});



// const button = document.querySelector('.submit__button');
// const arrowIcon = document.querySelector('.icon-arrow');
// const birdIcon = document.querySelector('.icon-check');

// button.addEventListener('click', (event) => {
//   event.preventDefault(); // Забороняємо перехід за замовчуванням
//   anime({
//     targets: arrowIcon,
//     opacity: 0,
//     duration: 300, // Тривалість анімації
//     easing: 'easeInOutQuad', // Згладжена функція руху для більшої плавності
//     complete: () => {
//       arrowIcon.classList.add('hidden');
//       birdIcon.classList.remove('hidden');
//     }
    
//   });
// });

// Получаем все кнопки на странице
// const buttons = document.querySelectorAll('.submit__button');

// // Проходимся по каждой кнопке и добавляем обработчик событий
// buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     event.preventDefault();
    
//     const arrowIcon = button.querySelector('.icon-arrow');
//     const birdIcon = button.querySelector('.icon-check');
    
//     anime({
//       targets: arrowIcon,
//       opacity: 0,
//       duration: 1100,
//       scale: 0,
//       easing: 'easeInOutQuad',
//       complete: () => {
//         arrowIcon.classList.add('hidden');
//         birdIcon.classList.remove('hidden');
//       }
//     });
//   });
// });

const buttons = document.querySelectorAll('.submit__button');

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    
    const arrowIcon = button.querySelector('.icon-arrow');
    const birdIcon = button.querySelector('.icon-check');
    
    // Анимация для исчезновения стрелки и появления птички
    anime({
      targets: [arrowIcon, birdIcon], // Анимируем оба элемента одновременно
      opacity: [1, 0], // Сначала opacity 1 (показать), затем opacity 0 (скрыть)
      scale: [1, 0], // Сначала масштаб 1 (показать), затем масштаб 0 (скрыть)
      duration: 1100,
      easing: 'easeInOutQuad',
    });
  });
});


// const button = document.querySelector('.submit__button');
// const arrowIcon = document.querySelector('.icon-arrow');
// const birdIcon = document.querySelector('.icon-check');

// button.addEventListener('click', (event) => {
//   event.preventDefault();
  
//   anime({
//     targets: arrowIcon,
//     opacity: 0,
//     duration: 300,
//     easing: 'easeInOutQuad',
//     complete: () => {
//       arrowIcon.classList.add('hidden');
//       birdIcon.classList.remove('hidden');
//       animateBirdIcon();
//     }
//   });
// });

// function animateBirdIcon() {
//   anime({
//     targets: birdIcon,
//     opacity: 1,
//     scale: 1,
//     duration: 300,
//     easing: 'easeInOutQuad'
//   });
// }

// const button = document.querySelector('.submit__button');
// const arrowIcon = document.querySelector('.icon-arrow');
// const birdIcon = document.querySelector('.icon-check');

// button.addEventListener('click', (event) => {
//   event.preventDefault();
//   let opacity = 1;
//   const animationDuration = 300;
//   const animationStartTime = performance.now();

//   function animateIcon(timestamp) {
//     const progress = timestamp - animationStartTime;
//     if (progress < animationDuration) {
//       opacity = 1 - progress / animationDuration;
//       arrowIcon.style.opacity = opacity;
//       requestAnimationFrame(animateIcon);
//     } else {
//       arrowIcon.classList.add('hidden');
//       birdIcon.classList.remove('hidden');
//     }
//   }

//   requestAnimationFrame(animateIcon);
// });

// const button = document.querySelector('.submit__button');
// const arrowIcon = document.querySelector('.icon-arrow');
// const birdIcon = document.querySelector('.icon-check');

// button.addEventListener('click', (event) => {
//   event.preventDefault();
  
//   arrowIcon.classList.add('hidden');
//   birdIcon.classList.remove('hidden');
// });

// const button = document.querySelector('.submit__button');

// button.addEventListener('click', (event) => {
//   event.preventDefault();
  
//   button.classList.add('hidden');
//   birdIcon.classList.remove('hidden');
// });

