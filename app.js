"use strict";

/* =========================================================
   BUSINESS DISTRICT — APP.JS
   Версия 3.0
   ========================================================= */

const SAVE_KEY = "business_district_v3";
const VERSION = 3;

/* =========================================================
   ФОРМАТИРОВАНИЕ
   ========================================================= */

const money = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "UAH",
  maximumFractionDigits: 0
});

const integer = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function formatMoney(value) {
  return money.format(Math.round(value || 0));
}

function formatNumber(value) {
  return integer.format(Math.round(value || 0));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(random(min, max + 1));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   ИГРОВЫЕ ДАННЫЕ
   ========================================================= */

const INDUSTRIES = {
  COFFEE: {
    name: "Кофейня",
    short: "Кофе",
    baseDemand: 62,
    averagePrice: 180,
    productCost: 0.34
  },

  FASHION: {
    name: "Магазин одежды",
    short: "Мода",
    baseDemand: 30,
    averagePrice: 1200,
    productCost: 0.48
  },

  FOOD: {
    name: "Еда",
    short: "Еда",
    baseDemand: 50,
    averagePrice: 350,
    productCost: 0.45
  },

  IT: {
    name: "IT-компания",
    short: "IT",
    baseDemand: 20,
    averagePrice: 1800,
    productCost: 0.28
  },

  SERVICES: {
    name: "Услуги",
    short: "Услуги",
    baseDemand: 38,
    averagePrice: 700,
    productCost: 0.30
  },

  RETAIL: {
    name: "Розничный магазин",
    short: "Ритейл",
    baseDemand: 36,
    averagePrice: 950,
    productCost: 0.52
  }
};

const STRATEGIES = {
  PREMIUM: {
    name: "Премиум",
    price: 1.25,
    demand: 0.84,
    reputation: 1.08
  },

  BALANCED: {
    name: "Сбалансированная",
    price: 1,
    demand: 1,
    reputation: 1
  },

  LOW_COST: {
    name: "Низкая цена",
    price: 0.82,
    demand: 1.22,
    reputation: 0.97
  },

  INNOVATIVE: {
    name: "Инновационная",
    price: 1.05,
    demand: 1.05,
    reputation: 1.15
  }
};

const DISTRICTS = {
  CENTRAL: {
    name: "Центр",
    code: "CTR",
    demand: 1.15,
    rent: 1.35,
    competition: 1.25,
    traffic: 1.35
  },

  NORTH: {
    name: "Север",
    code: "NTH",
    demand: 0.90,
    rent: 0.85,
    competition: 0.85,
    traffic: 0.85
  },

  SOUTH: {
    name: "Юг",
    code: "STH",
    demand: 1.05,
    rent: 1.05,
    competition: 1,
    traffic: 1.10
  },

  INDUSTRIAL: {
    name: "Промзона",
    code: "IND",
    demand: 0.80,
    rent: 0.65,
    competition: 0.65,
    traffic: 0.70
  },

  RIVERSIDE: {
    name: "Набережная",
    code: "RIV",
    demand: 1.20,
    rent: 1.20,
    competition: 1.10,
    traffic: 1.25
  }
};

const STAFF = {
  SALES: {
    name: "Менеджер по продажам",
    salary: 650,
    efficiency: 1.08
  },

  ACCOUNTANT: {
    name: "Бухгалтер",
    salary: 700,
    efficiency: 1.05
  },

  DEVELOPER: {
    name: "Разработчик",
    salary: 1100,
    efficiency: 1.12
  },

  DESIGNER: {
    name: "Дизайнер",
    salary: 750,
    efficiency: 1.07
  },

  MARKETING: {
    name: "Маркетолог",
    salary: 800,
    efficiency: 1.12
  },

  OPERATIONS: {
    name: "Операционный менеджер",
    salary: 900,
    efficiency: 1.10
  }
};

const MARKETING = {
  SOCIAL: {
    name: "Социальные сети",
    cost: 350,
    multiplier: 1.12,
    days: 3,
    reputation: 1
  },

  SEARCH: {
    name: "Поисковая реклама",
    cost: 550,
    multiplier: 1.18,
    days: 4,
    reputation: 1
  },

  INFLUENCER: {
    name: "Инфлюенсер",
    cost: 1000,
    multiplier: 1.35,
    days: 5,
    reputation: 3
  },

  BILLBOARD: {
    name: "Билборд",
    cost: 1300,
    multiplier: 1.28,
    days: 7,
    reputation: 2
  },

  LOCAL_EVENT: {
    name: "Городское мероприятие",
    cost: 800,
    multiplier: 1.25,
    days: 3,
    reputation: 2
  }
};

const BUILDINGS = {
  SHOP: {
    name: "Небольшой магазин",
    price: 8000,
    rent: 350,
    capacity: 70,
    multiplier: 1.08
  },

  OFFICE: {
    name: "Офис",
    price: 12000,
    rent: 500,
    capacity: 45,
    multiplier: 1.07
  },

  WAREHOUSE: {
    name: "Склад",
    price: 9000,
    rent: 300,
    capacity: 90,
    multiplier: 1.05
  },

  CAFE: {
    name: "Кафе",
    price: 18000,
    rent: 750,
    capacity: 120,
    multiplier: 1.20
  },

  RESTAURANT: {
    name: "Ресторан",
    price: 32000,
    rent: 1200,
    capacity: 190,
    multiplier: 1.34
  }
};

const ACHIEVEMENTS = {
  FIRST_PROFIT: {
    title: "Первая прибыль",
    description: "Получить первую положительную прибыль."
  },

  FIRST_EMPLOYEE: {
    title: "Первый сотрудник",
    description: "Нанять первого сотрудника."
  },

  CUSTOMERS_100: {
    title: "100 клиентов",
    description: "Обслужить 100 клиентов."
  },

  CASH_100K: {
    title: "100 тысяч",
    description: "Накопить 100 000 ₴."
  },

  FIRST_BUILDING: {
    title: "Первая недвижимость",
    description: "Купить первое здание."
  },

  EMPLOYEES_10: {
    title: "Большая команда",
    description: "Нанять 10 сотрудников."
  },

  VALUE_1M: {
    title: "Миллионная компания",
    description: "Достичь стоимости 1 000 000 ₴."
  },

  REPUTATION_80: {
    title: "Репутация",
    description: "Достичь 80 репутации."
  },

  FIRST_LOAN: {
    title: "Первый кредит",
    description: "Взять первый кредит."
  },

  DEBT_FREE: {
    title: "Без долгов",
    description: "Полностью погасить кредиты."
  },

  DAY_100: {
    title: "100 дней",
    description: "Продержаться 100 дней."
  },

  BUILDINGS_10: {
    title: "Империя",
    description: "Построить 10 объектов."
  },

  REVENUE_1M: {
    title: "Миллион выручки",
    description: "Получить 1 000 000 ₴ общей выручки."
  },

  MARKETING: {
    title: "Громкий бренд",
    description: "Запустить сильную рекламную кампанию."
  },

  LEVEL_10: {
    title: "Бизнес-империя",
    description: "Достичь 10 уровня."
  }
};

/* =========================================================
   СОБЫТИЯ
   ========================================================= */

const EVENTS = [

  {
    title: "Рост цен поставщика",
    description: "Ваш основной поставщик повысил цены.",
    choices: [
      {
        title: "Принять новые цены",
        description: "Себестоимость увеличится на 10% на несколько дней.",
        action() {
          state.company.effects.cost *= 1.10;
          state.company.effects.costDays = 3;
        }
      },
      {
        title: "Найти нового поставщика",
        description: "Потратить 700 ₴, но избежать роста расходов.",
        action() {
          if (state.company.cash >= 700) {
            state.company.cash -= 700;
          } else {
            state.company.reputation -= 2;
          }
        }
      }
    ]
  },

  {
    title: "Вирусная публикация",
    description: "Пост о вашей компании неожиданно набрал популярность.",
    choices: [
      {
        title: "Поддержать волну",
        description: "Заплатить 500 ₴ и увеличить спрос.",
        action() {
          if (state.company.cash >= 500) {
            state.company.cash -= 500;
            state.company.effects.demand *= 1.25;
            state.company.effects.demandDays = 4;
            state.company.reputation += 5;
          }
        }
      },
      {
        title: "Ничего не делать",
        description: "Получить небольшой рост репутации.",
        action() {
          state.company.reputation += 2;
        }
      }
    ]
  },

  {
    title: "Новый конкурент",
    description: "Сильный конкурент открылся рядом с вами.",
    choices: [
      {
        title: "Снизить цену",
        description: "Цена снизится на 5%, спрос увеличится.",
        action() {
          state.company.priceMultiplier *= 0.95;
          state.company.effects.demand *= 1.08;
          state.company.effects.demandDays = 3;
        }
      },
      {
        title: "Усилить бренд",
        description: "Потратить 900 ₴ на продвижение.",
        action() {
          if (state.company.cash >= 900) {
            state.company.cash -= 900;
            state.company.reputation += 6;
          }
        }
      }
    ]
  },

  {
    title: "Городской фестиваль",
    description: "В вашем районе проходит крупное мероприятие.",
    choices: [
      {
        title: "Участвовать",
        description: "800 ₴. Спрос увеличится на 3 дня.",
        action() {
          if (state.company.cash >= 800) {
            state.company.cash -= 800;
            state.company.effects.demand *= 1.22;
            state.company.effects.demandDays = 3;
          }
        }
      },
      {
        title: "Пропустить",
        description: "Без изменений.",
        action() {}
      }
    ]
  },

  {
    title: "Крупный клиент",
    description: "Большая компания предлагает вам контракт.",
    choices: [
      {
        title: "Принять",
        description: "Получить 2500 ₴ и репутацию.",
        action() {
          state.company.cash += 2500;
          state.company.reputation += 4;
        }
      },
      {
        title: "Отказаться",
        description: "Сохранить текущую загрузку.",
        action() {}
      }
    ]
  },

  {
    title: "Плохой отзыв",
    description: "Недовольный клиент оставил негативный отзыв.",
    choices: [
      {
        title: "Компенсировать",
        description: "Потратить 300 ₴.",
        action() {
          if (state.company.cash >= 300) {
            state.company.cash -= 300;
          } else {
            state.company.reputation -= 2;
          }
        }
      },
      {
        title: "Проигнорировать",
        description: "Репутация снизится.",
        action() {
          state.company.reputation -= 5;
        }
      }
    ]
  },

  {
    title: "Отличный отзыв",
    description: "Популярный клиент положительно рассказал о компании.",
    choices: [
      {
        title: "Поблагодарить",
        description: "Репутация +4.",
        action() {
          state.company.reputation += 4;
        }
      },
      {
        title: "Продвинуть отзыв",
        description: "400 ₴. Репутация +8.",
        action() {
          if (state.company.cash >= 400) {
            state.company.cash -= 400;
            state.company.reputation += 8;
          }
        }
      }
    ]
  },

  {
    title: "Рынок растёт",
    description: "Потребительский спрос резко увеличился.",
    choices: [
      {
        title: "Увеличить запасы",
        description: "900 ₴. Спрос увеличится.",
        action() {
          if (state.company.cash >= 900) {
            state.company.cash -= 900;
            state.company.effects.demand *= 1.15;
            state.company.effects.demandDays = 3;
          }
        }
      },
      {
        title: "Ничего не менять",
        description: "Работать как обычно.",
        action() {}
      }
    ]
  },

  {
    title: "Просадка рынка",
    description: "Люди стали осторожнее тратить деньги.",
    choices: [
      {
        title: "Снизить цену",
        description: "Цена -8%, спрос частично восстановится.",
        action() {
          state.company.priceMultiplier *= 0.92;
          state.company.effects.demand *= 1.10;
          state.company.effects.demandDays = 3;
        }
      },
      {
        title: "Сохранить цену",
        description: "Не менять стратегию.",
        action() {}
      }
    ]
  },

  {
    title: "Предложение инфлюенсера",
    description: "Известный блогер предлагает рекламную интеграцию.",
    choices: [
      {
        title: "Согласиться",
        description: "1200 ₴. Сильный рост спроса.",
        action() {
          if (state.company.cash >= 1200) {
            state.company.cash -= 1200;
            state.company.effects.demand *= 1.35;
            state.company.effects.demandDays = 5;
            state.company.reputation += 5;
          }
        }
      },
      {
        title: "Отказаться",
        description: "Слишком дорого.",
        action() {}
      }
    ]
  },

  {
    title: "Поломка оборудования",
    description: "Оборудование неожиданно вышло из строя.",
    choices: [
      {
        title: "Починить",
        description: "Заплатить 600 ₴.",
        action() {
          if (state.company.cash >= 600) {
            state.company.cash -= 600;
          }
        }
      },
      {
        title: "Работать с ограничениями",
        description: "Вместимость снизится на один день.",
        action() {
          state.company.effects.capacity *= 0.75;
          state.company.effects.capacityDays = 1;
        }
      }
    ]
  },

  {
    title: "Повышение аренды",
    description: "Владелец помещения хочет увеличить аренду.",
    choices: [
      {
        title: "Остаться",
        description: "Аренда увеличится на 15%.",
        action() {
          state.company.effects.rent *= 1.15;
          state.company.effects.rentDays = 5;
        }
      },
      {
        title: "Переехать",
        description: "Потратить 1500 ₴.",
        action() {
          if (state.company.cash >= 1500) {
            state.company.cash -= 1500;
          }
        }
      }
    ]
  },

  {
    title: "Сотрудник хочет уйти",
    description: "Один из сотрудников получил предложение от конкурента.",
    choices: [
      {
        title: "Повысить зарплату",
        description: "Потратить 600 ₴.",
        action() {
          if (state.company.cash >= 600) {
            state.company.cash -= 600;
          }
        }
      },
      {
        title: "Отпустить",
        description: "Сотрудник покинет компанию.",
        action() {
          if (state.company.employees.length > 0) {
            state.company.employees.pop();
          }
        }
      }
    ]
  },

  {
    title: "Дефицит товаров",
    description: "Некоторые поставки временно задерживаются.",
    choices: [
      {
        title: "Купить запас",
        description: "1200 ₴.",
        action() {
          if (state.company.cash >= 1200) {
            state.company.cash -= 1200;
          }
        }
      },
      {
        title: "Подождать",
        description: "Себестоимость временно увеличится.",
        action() {
          state.company.effects.cost *= 1.12;
          state.company.effects.costDays = 2;
        }
      }
    ]
  },

  {
    title: "Новый район",
    description: "Город начал развивать новую деловую зону.",
    choices: [
      {
        title: "Инвестировать",
        description: "1000 ₴. Стоимость компании +5000 ₴.",
        action() {
          if (state.company.cash >= 1000) {
            state.company.cash -= 1000;
            state.company.companyValue += 5000;
          }
        }
      },
      {
        title: "Наблюдать",
        description: "Пока ничего не делать.",
        action() {}
      }
    ]
  }
];

/* =========================================================
   СОСТОЯНИЕ
   ========================================================= */

function createDefaultState() {
  const market = {};

  Object.entries(INDUSTRIES).forEach(([key, industry]) => {
    market[key] = {
      demand: 1,
      trend: 0,
      competition: randomInt(35, 70),
      history: [1, 1, 1, 1, 1, 1, 1]
    };
  });

  return {
    version: VERSION,

    initialized: false,

    day: 1,

    market,

    analytics: [],

    eventHistory: [],

    unlockedAchievements: [],

    ui: {
      screen: "home",
      analyticsPeriod: 7
    },

    pendingEvent: null,

    company: {
      name: "",
      industry: "COFFEE",
      strategy: "BALANCED",
      district: "CENTRAL",

      cash: 10000,

      reputation: 20,

      level: 1,

      experience: 0,

      totalRevenue: 0,

      totalExpenses: 0,

      totalProfit: 0,

      totalCustomers: 0,

      companyValue: 10000,

      priceMultiplier: 1,

      employees: [],

      buildings: [],

      loans: [],

      campaigns: [],

      effects: {
        demand: 1,
        demandDays: 0,

        marketing: 1,
        marketingDays: 0,

        cost: 1,
        costDays: 0,

        rent: 1,
        rentDays: 0,

        capacity: 1,
        capacityDays: 0
      }
    }
  };
}

let state = createDefaultState();

/* =========================================================
   СОХРАНЕНИЕ
   ========================================================= */

function saveGame() {
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error("Не удалось сохранить игру:", error);
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) {
      state = createDefaultState();
      return;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      parsed.version !== VERSION ||
      !parsed.company
    ) {
      state = createDefaultState();
      return;
    }

    state = parsed;

  } catch (error) {
    console.error("Ошибка загрузки:", error);
    state = createDefaultState();
  }
}

function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
  state = createDefaultState();
  render();
}

/* =========================================================
   UI
   ========================================================= */

function showToast(message) {
  const element = $("#toast");

  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    element.classList.remove("show");
  }, 2200);
}

function openModal(content) {
  const modal = $("#modal");
  const modalContent = $("#modal-content");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = content;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = $("#modal");

  if (!modal) return;

  modal.classList.add("hidden");

  const content = $("#modal-content");

  if (content) {
    content.innerHTML = "";
  }
}

/* =========================================================
   START
   ========================================================= */

function renderStartScreen() {
  const hasSave = Boolean(localStorage.getItem(SAVE_KEY));

  document.body.innerHTML = `
    <div id="app">

      <main>
        <section class="hero">

          <div class="hero-kicker">
            СИМУЛЯТОР БИЗНЕСА
          </div>

          <h1>
            BUILD<br>
            SOMETHING.
          </h1>

          <p>
            Начни с 10 000 ₴.
            Построй компанию с нуля,
            управляй людьми, деньгами,
            маркетингом и рисками.
          </p>

          <div class="start-actions">

            ${
              hasSave
                ? `
                  <button class="btn btn-primary"
                    data-action="continue">
                    ПРОДОЛЖИТЬ
                  </button>

                  <button class="btn"
                    data-action="new-game">
                    НОВАЯ ИГРА
                  </button>

                  <button class="btn btn-danger"
                    data-action="delete-save">
                    УДАЛИТЬ СОХРАНЕНИЕ
                  </button>
                `
                : `
                  <button class="btn btn-primary"
                    data-action="new-game">
                    СОЗДАТЬ КОМПАНИЮ
                  </button>
                `
            }

          </div>

        </section>
      </main>

      <div id="toast" class="toast"></div>

      <div id="modal" class="modal hidden">
        <div class="modal-backdrop"
             data-action="close-modal"></div>

        <div class="modal-box">

          <button
            class="modal-close"
            data-action="close-modal">
            ×
          </button>

          <div id="modal-content"></div>

        </div>
      </div>

    </div>
  `;
}

/* =========================================================
   СОЗДАНИЕ КОМПАНИИ
   ========================================================= */

function openCompanyCreation() {

  openModal(`

    <div class="hero-kicker">
      НОВАЯ КОМПАНИЯ
    </div>

    <h2 class="modal-title">
      С чего начнём?
    </h2>

    <p class="modal-text">
      У тебя есть 10 000 ₴ стартового капитала.
      Выбирай отрасль и стратегию внимательно.
    </p>

    <form id="company-form" class="form">

      <div class="field">

        <label>
          Название компании
        </label>

        <input
          id="new-company-name"
          maxlength="30"
          placeholder="Например: North Studio"
          required
        >

      </div>

      <div class="field">

        <label>
          Отрасль
        </label>

        <div class="choice-grid">

          ${
            Object.entries(INDUSTRIES)
              .map(([key, industry]) => `
                <button
                  type="button"
                  class="choice ${
                    key === "COFFEE"
                      ? "active"
                      : ""
                  }"
                  data-industry="${key}"
                >

                  <strong>
                    ${industry.name}
                  </strong>

                  <small>
                    Средняя цена:
                    ${formatMoney(industry.averagePrice)}
                  </small>

                </button>
              `)
              .join("")
          }

        </div>

      </div>

      <div class="field">

        <label>
          Стратегия
        </label>

        <div class="choice-grid">

          ${
            Object.entries(STRATEGIES)
              .map(([key, strategy]) => `
                <button
                  type="button"
                  class="choice ${
                    key === "BALANCED"
                      ? "active"
                      : ""
                  }"
                  data-strategy="${key}"
                >

                  <strong>
                    ${strategy.name}
                  </strong>

                  <small>
                    ${
                      key === "PREMIUM"
                        ? "Высокая цена и маржа."
                        : key === "LOW_COST"
                        ? "Много клиентов."
                        : key === "INNOVATIVE"
                        ? "Репутация и развитие."
                        : "Универсальный подход."
                    }
                  </small>

                </button>
              `)
              .join("")
          }

        </div>

      </div>

      <div class="field">

        <label>
          Район
        </label>

        <select id="new-company-district">

          ${
            Object.entries(DISTRICTS)
              .map(([key, district]) => `
                <option value="${key}">
                  ${district.name}
                </option>
              `)
              .join("")
          }

        </select>

      </div>

      <button
        type="submit"
        class="btn btn-primary">

        НАЧАТЬ БИЗНЕС

      </button>

    </form>
  `);

  let selectedIndustry = "COFFEE";
  let selectedStrategy = "BALANCED";

  $$("[data-industry]").forEach(button => {

    button.addEventListener("click", () => {

      selectedIndustry =
        button.dataset.industry;

      $$("[data-industry]")
        .forEach(item =>
          item.classList.remove("active")
        );

      button.classList.add("active");
    });

  });

  $$("[data-strategy]").forEach(button => {

    button.addEventListener("click", () => {

      selectedStrategy =
        button.dataset.strategy;

      $$("[data-strategy]")
        .forEach(item =>
          item.classList.remove("active")
        );

      button.classList.add("active");
    });

  });

  $("#company-form")
    .addEventListener("submit", event => {

      event.preventDefault();

      const name =
        $("#new-company-name")
          .value
          .trim();

      const district =
        $("#new-company-district")
          .value;

      if (!name) return;

      state =
        createDefaultState();

      state.initialized = true;

      state.company.name = name;

      state.company.industry =
        selectedIndustry;

      state.company.strategy =
        selectedStrategy;

      state.company.district =
        district;

      state.company.priceMultiplier =
        STRATEGIES[selectedStrategy].price;

      state.company.foundedDay = 1;

      saveGame();

      closeModal();

      renderGame();

      showToast("Компания создана");
    });
}

/* =========================================================
   ОСНОВНОЙ РЕНДЕР
   ========================================================= */

function renderGame() {

  const screen =
    state.ui.screen || "home";

  const content =
    getScreenHTML(screen);

  document.body.innerHTML = `

    <div id="app">

      <header class="topbar">

        <div class="topbar-row">

          <div>

            <div class="brand">
              DISTRICT
            </div>

            <div class="day-label">
              День ${state.day}
            </div>

          </div>

          <div class="badge accent">
            УРОВЕНЬ ${state.company.level}
          </div>

        </div>

      </header>

      <main>
        ${content}
      </main>

      ${renderBottomNavigation()}

      <div id="toast"
        class="toast">
      </div>

      <div id="modal"
        class="modal hidden">

        <div
          class="modal-backdrop"
          data-action="close-modal">
        </div>

        <div class="modal-box">

          <button
            class="modal-close"
            data-action="close-modal">
            ×
          </button>

          <div id="modal-content"></div>

        </div>

      </div>

    </div>
  `;
}

function getScreenHTML(screen) {

  switch (screen) {

    case "city":
      return renderCity();

    case "market":
      return renderMarket();

    case "company":
      return renderCompany();

    case "staff":
      return renderStaff();

    case "marketing":
      return renderMarketing();

    case "bank":
      return renderBank();

    case "buildings":
      return renderBuildings();

    case "events":
      return renderEvents();

    case "analytics":
      return renderAnalytics();

    case "achievements":
      return renderAchievements();

    case "home":
    default:
      return renderHome();
  }
}

/* =========================================================
   ГЛАВНАЯ
   ========================================================= */

function renderHome() {

  const c = state.company;

  const lastDay =
    state.analytics.at(-1);

  return `

    <section class="company-header">

      <div class="hero-kicker">
        ${INDUSTRIES[c.industry].name}
      </div>

      <div class="company-name">
        ${escapeHTML(c.name)}
      </div>

      <div class="company-industry">
        ${STRATEGIES[c.strategy].name}
        ·
        ${DISTRICTS[c.district].name}
      </div>

    </section>

    <section class="stats-grid">

      ${stat(
        "КАПИТАЛ",
        formatMoney(c.cash),
        c.cash >= 0
          ? "accent"
          : "red"
      )}

      ${stat(
        "ВЫРУЧКА",
        formatMoney(c.totalRevenue)
      )}

      ${stat(
        "ПРИБЫЛЬ",
        formatMoney(c.totalProfit),
        c.totalProfit >= 0
          ? "green"
          : "red"
      )}

      ${stat(
        "КЛИЕНТЫ",
        formatNumber(c.totalCustomers)
      )}

      ${stat(
        "РЕПУТАЦИЯ",
        `${Math.round(c.reputation)}/100`,
        "accent"
      )}

      ${stat(
        "СТОИМОСТЬ",
        formatMoney(c.companyValue)
      )}

      ${stat(
        "СОТРУДНИКИ",
        c.employees.length
      )}

      ${stat(
        "ОБЪЕКТЫ",
        c.buildings.length
      )}

    </section>

    <section class="section">

      <div class="section-head">

        <h2 class="section-title">
          Последний день
        </h2>

        <span class="section-note">
          Финансовый результат
        </span>

      </div>

      <div class="card">

        ${
          lastDay
            ? `
              <div class="card-row">

                <strong>
                  Прибыль
                </strong>

                <strong class="${
                  lastDay.profit >= 0
                    ? "positive"
                    : "negative"
                }">

                  ${
                    lastDay.profit >= 0
                      ? "+"
                      : ""
                  }

                  ${formatMoney(lastDay.profit)}

                </strong>

              </div>

              <div class="card-meta">

                Выручка:
                ${formatMoney(lastDay.revenue)}

                ·

                Клиенты:
                ${formatNumber(lastDay.customers)}

              </div>
            `
            : `
              <div class="empty">
                Первый рабочий день ещё не завершён.
              </div>
            `
        }

      </div>

    </section>

    <section class="section">

      ${renderLevelCard()}

    </section>

    <button
      class="end-day"
      data-action="end-day">

      ЗАВЕРШИТЬ ДЕНЬ →

    </button>
  `;
}

function stat(label, value, className = "") {

  return `

    <div class="stat">

      <div class="stat-label">
        ${label}
      </div>

      <div class="stat-value ${className}">
        ${value}
      </div>

    </div>
  `;
}

function renderLevelCard() {

  const level =
    state.company.level;

  const current =
    state.company.experience;

  const required =
    level * 100;

  const percent =
    clamp(
      current / required * 100,
      0,
      100
    );

  return `

    <div class="card">

      <div class="card-row">

        <strong>
          Развитие компании
        </strong>

        <span class="muted">
          ${current}/${required} XP
        </span>

      </div>

      <div class="progress">

        <span
          style="width:${percent}%">
        </span>

      </div>

      <div class="card-meta">
        Получай XP за выручку и развитие бизнеса.
      </div>

    </div>
  `;
}

/* =========================================================
   ГОРОД
   ========================================================= */

function renderCity() {

  const current =
    DISTRICTS[state.company.district];

  return `

    <h1 class="screen-title">
      Город
    </h1>

    <p class="screen-subtitle">
      Выбери район для своего бизнеса.
    </p>

    <section class="section">

      <div class="map">

        ${
          Object.entries(DISTRICTS)
            .map(([key, district]) => `

              <button
                class="
                  district
                  ${
                    key === "CENTRAL"
                      ? "central"
                      : ""
                  }
                  ${
                    key === state.company.district
                      ? "selected"
                      : ""
                  }
                "
                data-action="select-district"
                data-district="${key}"
              >

                <div class="district-name">
                  ${district.name}
                </div>

                <div class="district-code">
                  ${district.code}
                </div>

                <div class="district-stats">

                  <div class="mini-stat">
                    <b>
                      ${Math.round(
                        district.demand * 100
                      )}%
                    </b>
                    <span>спрос</span>
                  </div>

                  <div class="mini-stat">
                    <b>
                      ${Math.round(
                        district.traffic * 100
                      )}%
                    </b>
                    <span>трафик</span>
                  </div>

                  <div class="mini-stat">
                    <b>
                      ${Math.round(
                        district.competition * 100
                      )}%
                    </b>
                    <span>конкуренция</span>
                  </div>

                  <div class="mini-stat">
                    <b>
                      ${Math.round(
                        district.rent * 100
                      )}%
                    </b>
                    <span>аренда</span>
                  </div>

                </div>

              </button>

            `)
            .join("")
        }

      </div>

    </section>

    <section class="section">

      <div class="card">

        <div class="hero-kicker">
          ТЕКУЩИЙ РАЙОН
        </div>

        <h2>
          ${current.name}
        </h2>

        <div class="card-meta">

          Спрос:
          ${Math.round(current.demand * 100)}%

          ·

          Трафик:
          ${Math.round(current.traffic * 100)}%

          ·

          Конкуренция:
          ${Math.round(current.competition * 100)}%

        </div>

      </div>

    </section>
  `;
}

/* =========================================================
   РЫНОК
   ========================================================= */

function renderMarket() {

  const industry =
    INDUSTRIES[state.company.industry];

  const market =
    state.market[state.company.industry];

  const currentPrice =
    industry.averagePrice *
    state.company.priceMultiplier;

  const trendClass =
    market.trend > 0
      ? "up"
      : market.trend < 0
      ? "down"
      : "flat";

  return `

    <h1 class="screen-title">
      Рынок
    </h1>

    <p class="screen-subtitle">
      Следи за спросом и управляй ценой.
    </p>

    <section class="section">

      <div class="card">

        <div class="market-row">

          <div>

            <div class="card-title">
              ${industry.name}
            </div>

            <div class="card-meta">
              Конкуренция:
              ${market.competition}%
            </div>

          </div>

          <div class="trend ${trendClass}">

            ${
              market.trend > 0
                ? "▲"
                : market.trend < 0
                ? "▼"
                : "—"
            }

            ${Math.abs(
              market.trend
            ).toFixed(1)}%

          </div>

        </div>

        ${renderSparkline(
          market.history
        )}

        <div class="stats-grid">

          ${stat(
            "СПРОС",
            `${Math.round(
              market.demand * 100
            )}%`
          )}

          ${stat(
            "СРЕДНЯЯ ЦЕНА",
            formatMoney(
              industry.averagePrice
            )
          )}

        </div>

        <div class="price-control">

          <input
            id="price-input"
            type="number"
            min="1"
            value="${Math.round(
              currentPrice
            )}"
          >

          <button
            class="btn btn-small btn-primary"
            data-action="change-price">

            УСТАНОВИТЬ

          </button>

        </div>

      </div>

    </section>
  `;
}

function renderSparkline(values) {

  if (!values || values.length < 2) {
    return "";
  }

  const min =
    Math.min(...values);

  const max =
    Math.max(...values);

  const range =
    max - min || 1;

  const points =
    values
      .map((value, index) => {

        const x =
          index /
          (values.length - 1) *
          100;

        const y =
          90 -
          ((value - min) / range) *
          75;

        return `${x},${y}`;

      })
      .join(" ");

  return `

    <svg
      class="chart"
      viewBox="0 0 100 100"
      preserveAspectRatio="none">

      <polyline
        points="${points}"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      />

    </svg>
  `;
}

function changePrice() {

  const input =
    $("#price-input");

  if (!input) return;

  const price =
    Number(input.value);

  const industry =
    INDUSTRIES[state.company.industry];

  if (!price || price <= 0) {
    showToast("Введите корректную цену");
    return;
  }

  state.company.priceMultiplier =
    clamp(
      price / industry.averagePrice,
      0.5,
      2
    );

  saveGame();

  renderGame();

  showToast("Цена обновлена");
}

/* =========================================================
   КОМПАНИЯ
   ========================================================= */

function renderCompany() {

  const c =
    state.company;

  return `

    <h1 class="screen-title">
      Компания
    </h1>

    <p class="screen-subtitle">
      Профиль и показатели бизнеса.
    </p>

    <section class="section">

      <div class="card">

        <div class="hero-kicker">
          КОМПАНИЯ
        </div>

        <div class="company-name">
          ${escapeHTML(c.name)}
        </div>

        <div class="company-industry">
          ${INDUSTRIES[c.industry].name}
        </div>

      </div>

    </section>

    <section class="section">

      <div class="stats-grid">

        ${stat(
          "ОТРАСЛЬ",
          INDUSTRIES[c.industry].short
        )}

        ${stat(
          "СТРАТЕГИЯ",
          STRATEGIES[c.strategy].name
        )}

        ${stat(
          "РАЙОН",
          DISTRICTS[c.district].name
        )}

        ${stat(
          "УРОВЕНЬ",
          c.level
        )}

        ${stat(
          "РЕПУТАЦИЯ",
          `${Math.round(c.reputation)}/100`
        )}

        ${stat(
          "ВЫРУЧКА",
          formatMoney(c.totalRevenue)
        )}

        ${stat(
          "ПРИБЫЛЬ",
          formatMoney(c.totalProfit)
        )}

        ${stat(
          "СТОИМОСТЬ",
          formatMoney(c.companyValue)
        )}

      </div>

    </section>

    <section class="section">

      ${renderLevelCard()}

    </section>
  `;
}

/* =========================================================
   СОТРУДНИКИ
   ========================================================= */

function renderStaff() {

  return `

    <h1 class="screen-title">
      Сотрудники
    </h1>

    <p class="screen-subtitle">
      Команда влияет на эффективность компании.
    </p>

    <section class="section">

      <div class="section-head">

        <h2 class="section-title">
          Твоя команда
        </h2>

        <span class="section-note">
          ${state.company.employees.length}
          человек
        </span>

      </div>

      <div class="list">

        ${
          state.company.employees.length
            ? state.company.employees
                .map(renderEmployee)
                .join("")
            : `
              <div class="empty">
                Пока никто не работает в компании.
              </div>
            `
        }

      </div>

    </section>

    <section class="section">

      <div class="section-head">

        <h2 class="section-title">
          Найм
        </h2>

      </div>

      <div class="list">

        ${
          Object.entries(STAFF)
            .map(([key, role]) => `

              <div class="card">

                <div class="card-row">

                  <div>

                    <div class="card-title">
                      ${role.name}
                    </div>

                    <div class="card-meta">

                      Зарплата:
                      ${formatMoney(role.salary)}
                      / день

                    </div>

                  </div>

                  <button
                    class="btn btn-small"
                    data-action="hire"
                    data-role="${key}">

                    НАНЯТЬ

                  </button>

                </div>

              </div>

            `)
            .join("")
        }

      </div>

    </section>
  `;
}

function renderEmployee(employee) {

  const role =
    STAFF[employee.role];

  return `

    <div class="card">

      <div class="card-row">

        <div>

          <div class="card-title">
            ${role.name}
          </div>

          <div class="card-meta">

            Опыт:
            ${employee.experience}

            ·

            Эффективность:
            ${employee.efficiency.toFixed(2)}×

            ·

            Мораль:
            ${employee.morale}%

          </div>

        </div>

        <span class="badge">
          ${employee.efficiency.toFixed(2)}×
        </span>

      </div>

      <div class="card-actions">

        <button
          class="btn btn-small"
          data-action="train"
          data-id="${employee.id}">

          ОБУЧИТЬ · 400 ₴

        </button>

        <button
          class="btn btn-small"
          data-action="promote"
          data-id="${employee.id}">

          ПОВЫСИТЬ

        </button>

        <button
          class="btn btn-small btn-danger"
          data-action="fire"
          data-id="${employee.id}">

          УВОЛИТЬ

        </button>

      </div>

    </div>
  `;
}

function hireEmployee(roleKey) {

  const role =
    STAFF[roleKey];

  if (!role) return;

  const hiringCost =
    role.salary * 2;

  if (state.company.cash < hiringCost) {

    showToast(
      `Нужно ${formatMoney(hiringCost)}`
    );

    return;
  }

  state.company.cash -=
    hiringCost;

  state.company.employees.push({

    id:
      Date.now() +
      Math.random(),

    role:
      roleKey,

    experience:
      1,

    efficiency:
      role.efficiency,

    morale:
      100

  });

  saveGame();

  renderGame();

  showToast(
    `${role.name} принят`
  );
}

function trainEmployee(id) {

  const employee =
    state.company.employees
      .find(e => String(e.id) === String(id));

  if (!employee) return;

  if (state.company.cash < 400) {

    showToast(
      "Недостаточно денег"
    );

    return;
  }

  state.company.cash -= 400;

  employee.experience += 1;

  employee.efficiency += 0.04;

  employee.morale =
    clamp(
      employee.morale + 5,
      0,
      100
    );

  saveGame();

  renderGame();

  showToast(
    "Сотрудник обучен"
  );
}

function promoteEmployee(id) {

  const employee =
    state.company.employees
      .find(e => String(e.id) === String(id));

  if (!employee) return;

  if (state.company.cash < 900) {

    showToast(
      "Нужно 900 ₴"
    );

    return;
  }

  state.company.cash -= 900;

  employee.efficiency += 0.08;

  employee.morale =
    clamp(
      employee.morale + 10,
      0,
      100
    );

  saveGame();

  renderGame();

  showToast(
    "Сотрудник повышен"
  );
}

function fireEmployee(id) {

  state.company.employees =
    state.company.employees.filter(
      employee =>
        String(employee.id) !== String(id)
    );

  saveGame();

  renderGame();

  showToast(
    "Сотрудник уволен"
  );
}

/* =========================================================
   МАРКЕТИНГ
   ========================================================= */

function renderMarketing() {

  const effects =
    state.company.effects;

  return `

    <h1 class="screen-title">
      Маркетинг
    </h1>

    <p class="screen-subtitle">
      Покупай внимание и превращай его в клиентов.
    </p>

    <section class="section">

      <div class="list">

        ${
          Object.entries(MARKETING)
            .map(([key, campaign]) => `

              <div class="card">

                <div class="card-row">

                  <div>

                    <div class="card-title">
                      ${campaign.name}
                    </div>

                    <div class="card-meta">

                      ${formatMoney(
                        campaign.cost
                      )}

                      ·

                      ×${campaign.multiplier}

                      ·

                      ${campaign.days} дней

                    </div>

                  </div>

                  <button
                    class="btn btn-small btn-primary"
                    data-action="marketing"
                    data-channel="${key}">

                    ЗАПУСТИТЬ

                  </button>

                </div>

              </div>

            `)
            .join("")
        }

      </div>

    </section>

    <section class="section">

      <div class="card">

        <div class="card-row">

          <strong>
            Активный эффект
          </strong>

          <span class="badge accent">
            ×${effects.marketing.toFixed(2)}
          </span>

        </div>

        <div class="card-meta">

          Осталось:
          ${effects.marketingDays}
          дней

        </div>

      </div>

    </section>
  `;
}

function launchMarketing(key) {

  const campaign =
    MARKETING[key];

  if (!campaign) return;

  if (
    state.company.cash <
    campaign.cost
  ) {

    showToast(
      "Недостаточно денег"
    );

    return;
  }

  state.company.cash -=
    campaign.cost;

  state.company.effects.marketing =
    Math.max(
      state.company.effects.marketing,
      campaign.multiplier
    );

  state.company.effects.marketingDays =
    Math.max(
      state.company.effects.marketingDays,
      campaign.days
    );

  state.company.reputation +=
    campaign.reputation;

  state.company.campaigns.push({
    day: state.day,
    name: campaign.name
  });

  saveGame();

  renderGame();

  showToast(
    `${campaign.name} запущена`
  );
}

/* =========================================================
   БАНК
   ========================================================= */

function renderBank() {

  const loans =
    state.company.loans;

  const loanOptions = [
    {
      amount: 5000,
      rate: 0.06,
      days: 15
    },
    {
      amount: 10000,
      rate: 0.07,
      days: 20
    },
    {
      amount: 25000,
      rate: 0.09,
      days: 30
    },
    {
      amount: 50000,
      rate: 0.12,
      days: 45
    }
  ];

  return `

    <h1 class="screen-title">
      Банк
    </h1>

    <p class="screen-subtitle">
      Кредит ускоряет рост, но создаёт обязательства.
    </p>

    <section class="section">

      <div class="list">

        ${
          loanOptions
            .map(loan => {

              const total =
                Math.round(
                  loan.amount *
                  (1 + loan.rate)
                );

              const payment =
                Math.ceil(
                  total /
                  loan.days
                );

              return `

                <div class="card">

                  <div class="card-row">

                    <div>

                      <div class="card-title">
                        ${formatMoney(
                          loan.amount
                        )}
                      </div>

                      <div class="card-meta">

                        Ставка:
                        ${loan.rate * 100}%

                        ·

                        ${loan.days} дней

                        ·

                        ${formatMoney(
                          payment
                        )}/день

                      </div>

                    </div>

                    <button
                      class="btn btn-small"
                      data-action="loan"
                      data-amount="${loan.amount}"
                      data-rate="${loan.rate}"
                      data-days="${loan.days}">

                      ВЗЯТЬ

                    </button>

                  </div>

                </div>
              `;
            })
            .join("")
        }

      </div>

    </section>

    <section class="section">

      <div class="section-head">

        <h2 class="section-title">
          Активные кредиты
        </h2>

      </div>

      <div class="list">

        ${
          loans.length
            ? loans.map(loan => `

              <div class="card">

                <div class="card-row">

                  <strong>
                    ${formatMoney(
                      loan.remaining
                    )}
                  </strong>

                  <span class="badge red">
                    ДОЛГ
                  </span>

                </div>

                <div class="card-meta">

                  Платёж:
                  ${formatMoney(
                    loan.payment
                  )}

                  ·

                  Осталось:
                  ${loan.daysLeft}
                  дней

                </div>

              </div>

            `).join("")
            : `
              <div class="empty">
                Активных кредитов нет.
              </div>
            `
        }

      </div>

    </section>
  `;
}

function takeLoan(amount, rate, days) {

  const total =
    Math.ceil(
      amount *
      (1 + rate)
    );

  const payment =
    Math.ceil(
      total /
      days
    );

  state.company.cash +=
    amount;

  state.company.loans.push({

    id:
      Date.now() +
      Math.random(),

    original:
      amount,

    remaining:
      total,

    payment:
      payment,

    daysLeft:
      days
  });

  state.eventHistory.push({
    day: state.day,
    type: "Кредит",
    text:
      `Получен кредит ${formatMoney(amount)}`
  });

  saveGame();

  renderGame();

  showToast(
    `Получено ${formatMoney(amount)}`
  );
}

/* =========================================================
   ЗДАНИЯ
   ========================================================= */

function renderBuildings() {

  return `

    <h1 class="screen-title">
      Здания
    </h1>

    <p class="screen-subtitle">
      Недвижимость увеличивает возможности компании.
    </p>

    <section class="section">

      <div class="list">

        ${
          Object.entries(BUILDINGS)
            .map(([key, building]) => `

              <div class="card">

                <div class="card-row">

                  <div>

                    <div class="card-title">
                      ${building.name}
                    </div>

                    <div class="card-meta">

                      Цена:
                      ${formatMoney(
                        building.price
                      )}

                      ·

                      Аренда:
                      ${formatMoney(
                        building.rent
                      )}/день

                    </div>

                  </div>

                  <span class="badge">
                    ×${building.multiplier.toFixed(2)}
                  </span>

                </div>

                <div class="card-meta">

                  Вместимость:
                  ${building.capacity}

                </div>

                <div class="card-actions">

                  <button
                    class="btn btn-small btn-primary"
                    data-action="building"
                    data-building="${key}">

                    КУПИТЬ

                  </button>

                </div>

              </div>

            `)
            .join("")
        }

      </div>

    </section>

    <section class="section">

      <div class="section-head">

        <h2 class="section-title">
          Мои объекты
        </h2>

        <span class="section-note">
          ${state.company.buildings.length}
        </span>

      </div>

      <div class="list">

        ${
          state.company.buildings.length
            ? state.company.buildings
                .map(building => `

                  <div class="card">

                    <div class="card-title">
                      ${building.name}
                    </div>

                    <div class="card-meta">

                      ${building.district}

                      ·

                      Вместимость:
                      ${building.capacity}

                    </div>

                  </div>

                `)
                .join("")
            : `
              <div class="empty">
                Недвижимости пока нет.
              </div>
            `
        }

      </div>

    </section>
  `;
}

function buyBuilding(key) {

  const building =
    BUILDINGS[key];

  if (!building) return;

  if (
    state.company.cash <
    building.price
  ) {

    showToast(
      "Недостаточно денег"
    );

    return;
  }

  state.company.cash -=
    building.price;

  state.company.buildings.push({

    id:
      Date.now() +
      Math.random(),

    type:
      key,

    name:
      building.name,

    price:
      building.price,

    rent:
      building.rent,

    capacity:
      building.capacity,

    multiplier:
      building.multiplier,

    district:
      DISTRICTS[
        state.company.district
      ].name
  });

  state.company.companyValue +=
    Math.round(
      building.price * 0.8
    );

  saveGame();

  renderGame();

  showToast(
    `${building.name} куплен`
  );
}

/* =========================================================
   СОБЫТИЯ
   ========================================================= */

function renderEvents() {

  return `

    <h1 class="screen-title">
      События
    </h1>

    <p class="screen-subtitle">
      История важных событий компании.
    </p>

    <section class="section">

      ${
        state.eventHistory.length
          ? `

            <div class="list">

              ${
                state.eventHistory
                  .slice()
                  .reverse()
                  .slice(0, 30)
                  .map(event => `

                    <div class="card">

                      <div class="card-row">

                        <strong>
                          День ${event.day}
                        </strong>

                        <span class="badge">
                          ${event.type}
                        </span>

                      </div>

                      <div class="card-meta">
                        ${event.text}
                      </div>

                    </div>

                  `)
                  .join("")
              }

            </div>

          `
          : `

            <div class="empty">
              Событий пока не было.
            </div>

          `
      }

    </section>
  `;
}

/* =========================================================
   АНАЛИТИКА
   ========================================================= */

function renderAnalytics() {

  const period =
    state.ui.analyticsPeriod;

  const data =
    state.analytics.slice(-period);

  const revenue =
    data.reduce(
      (sum, day) =>
        sum + day.revenue,
      0
    );

  const expenses =
    data.reduce(
      (sum, day) =>
        sum + day.expenses,
      0
    );

  const profit =
    data.reduce(
      (sum, day) =>
        sum + day.profit,
      0
    );

  const customers =
    data.reduce(
      (sum, day) =>
        sum + day.customers,
      0
    );

  return `

    <h1 class="screen-title">
      Аналитика
    </h1>

    <p class="screen-subtitle">
      История реальных игровых показателей.
    </p>

    <section class="section">

      <div class="choice-grid">

        ${
          [7, 30, 90, 3650]
            .map(value => `

              <button
                class="choice ${
                  period === value
                    ? "active"
                    : ""
                }"
                data-action="analytics-period"
                data-period="${value}">

                <strong>
                  ${
                    value === 3650
                      ? "ВСЁ"
                      : `${value}Д`
                  }
                </strong>

                <small>
                  ${
                    value === 7
                      ? "7 дней"
                      : value === 30
                      ? "30 дней"
                      : value === 90
                      ? "90 дней"
                      : "Вся история"
                  }
                </small>

              </button>

            `)
            .join("")
        }

      </div>

    </section>

    <section class="section">

      <div class="stats-grid">

        ${stat(
          "ВЫРУЧКА",
          formatMoney(revenue)
        )}

        ${stat(
          "РАСХОДЫ",
          formatMoney(expenses)
        )}

        ${stat(
          "ПРИБЫЛЬ",
          formatMoney(profit),
          profit >= 0
            ? "green"
            : "red"
        )}

        ${stat(
          "КЛИЕНТЫ",
          formatNumber(customers)
        )}

      </div>

    </section>

    <section class="section">

      <div class="card">

        <div class="section-head">

          <h2 class="section-title">
            Прибыль
          </h2>

          <span class="section-note">
            ${data.length} дней
          </span>

        </div>

        ${
          data.length >= 2
            ? renderSparkline(
                data.map(
                  day => day.profit
                )
              )
            : `
              <div class="empty">
                Нужно больше данных.
              </div>
            `
        }

      </div>

    </section>

    <section class="section">

      <div class="list">

        ${
          data
            .slice()
            .reverse()
            .map(day => `

              <div class="card">

                <div class="card-row">

                  <strong>
                    День ${day.day}
                  </strong>

                  <strong class="${
                    day.profit >= 0
                      ? "positive"
                      : "negative"
                  }">

                    ${
                      day.profit >= 0
                        ? "+"
                        : ""
                    }

                    ${formatMoney(
                      day.profit
                    )}

                  </strong>

                </div>

                <div class="card-meta">

                  Выручка:
                  ${formatMoney(day.revenue)}

                  ·

                  Расходы:
                  ${formatMoney(day.expenses)}

                  ·

                  Клиенты:
                  ${formatNumber(day.customers)}

                </div>

              </div>

            `)
            .join("")
        }

      </div>

    </section>
  `;
}

/* =========================================================
   ДОСТИЖЕНИЯ
   ========================================================= */

function renderAchievements() {

  return `

    <h1 class="screen-title">
      Достижения
    </h1>

    <p class="screen-subtitle">
      Цели для долгосрочного развития.
    </p>

    <section class="section">

      <div class="list">

        ${
          Object.entries(ACHIEVEMENTS)
            .map(([id, achievement]) => {

              const unlocked =
                state.unlockedAchievements
                  .includes(id);

              return `

                <div class="card">

                  <div class="card-row">

                    <div>

                      <div class="card-title">
                        ${achievement.title}
                      </div>

                      <div class="card-meta">
                        ${achievement.description}
                      </div>

                    </div>

                    <span class="badge ${
                      unlocked
                        ? "accent"
                        : ""
                    }">

                      ${
                        unlocked
                          ? "ОТКРЫТО"
                          : "ЗАКРЫТО"
                      }

                    </span>

                  </div>

                </div>

              `;
            })
            .join("")
        }

      </div>

    </section>
  `;
}

/* =========================================================
   НАВИГАЦИЯ
   ========================================================= */

function renderBottomNavigation() {

  const primary = [
    ["home", "⌂", "Главная"],
    ["city", "▦", "Город"],
    ["market", "↗", "Рынок"],
    ["company", "●", "Компания"]
  ];

  const extraScreens = [
    "staff",
    "marketing",
    "bank",
    "buildings",
    "events",
    "analytics",
    "achievements"
  ];

  const isExtra =
    extraScreens.includes(
      state.ui.screen
    );

  return `

    <nav class="bottom-nav">

      <div class="nav-inner">

        ${
          primary
            .map(
              ([screen, icon, label]) => `

                <button
                  class="nav-btn ${
                    state.ui.screen === screen
                      ? "active"
                      : ""
                  }"
                  data-action="navigate"
                  data-screen="${screen}">

                  <span class="nav-icon">
                    ${icon}
                  </span>

                  <span class="nav-label">
                    ${label}
                  </span>

                </button>

              `
            )
            .join("")
        }

        <button
          class="nav-btn ${
            isExtra
              ? "active"
              : ""
          }"
          data-action="more">

          <span class="nav-icon">
            ≡
          </span>

          <span class="nav-label">
            Ещё
          </span>

        </button>

      </div>

    </nav>
  `;
}

function openMoreMenu() {

  openModal(`

    <h2 class="modal-title">
      Разделы
    </h2>

    <div class="more-menu">

      ${[
        [
          "staff",
          "Сотрудники",
          "Команда"
        ],
        [
          "marketing",
          "Маркетинг",
          "Реклама"
        ],
        [
          "bank",
          "Банк",
          "Кредиты"
        ],
        [
          "buildings",
          "Здания",
          "Недвижимость"
        ],
        [
          "events",
          "События",
          "История"
        ],
        [
          "analytics",
          "Аналитика",
          "Статистика"
        ],
        [
          "achievements",
          "Достижения",
          "Цели"
        ]
      ]
        .map(
          ([screen, title, subtitle]) => `

            <button
              class="more-item"
              data-action="navigate"
              data-screen="${screen}">

              ${title}

              <small>
                ${subtitle}
              </small>

            </button>

          `
        )
        .join("")}

    </div>
  `);
}

/* =========================================================
   ЭКОНОМИКА
   ========================================================= */

function calculateEconomy() {

  const c =
    state.company;

  const industry =
    INDUSTRIES[c.industry];

  const strategy =
    STRATEGIES[c.strategy];

  const district =
    DISTRICTS[c.district];

  const market =
    state.market[c.industry];

  /* Сотрудники */

  let staffMultiplier = 1;

  c.employees.forEach(employee => {

    const role =
      STAFF[employee.role];

    let contribution =
      employee.efficiency;

    if (employee.role === "ACCOUNTANT") {
      contribution =
        1 +
        (employee.efficiency - 1) *
        0.5;
    }

    staffMultiplier *=
      1 +
      (contribution - 1) *
      0.35;
  });

  /* Здания */

  let buildingMultiplier = 1;

  let capacity = 60;

  c.buildings.forEach(building => {

    buildingMultiplier *=
      building.multiplier;

    capacity +=
      building.capacity;
  });

  capacity *=
    c.effects.capacity;

  /* Репутация */

  const reputationMultiplier =
    0.72 +
    (
      clamp(
        c.reputation,
        0,
        100
      ) / 100
    ) * 0.58;

  /* Цена */

  const priceMultiplier =
    clamp(
      c.priceMultiplier,
      0.5,
      2
    );

  const priceDemand =
    Math.pow(
      1 / priceMultiplier,
      1.15
    );

  /* Конкуренция */

  const competition =
    1 /
    Math.max(
      0.7,
      district.competition
    );

  /* Общий спрос */

  let customerPotential =

    industry.baseDemand *

    district.demand *

    district.traffic *

    market.demand *

    strategy.demand *

    strategy.reputation *

    reputationMultiplier *

    priceDemand *

    staffMultiplier *

    buildingMultiplier *

    c.effects.demand *

    c.effects.marketing *

    competition;

  /* Случайность */

  customerPotential *=
    random(
      0.90,
      1.10
    );

  const customers =
    Math.max(
      0,
      Math.min(
        Math.round(
          capacity * 2.8
        ),
        Math.round(
          customerPotential
        )
      )
    );

  /* Цена */

  const price =
    industry.averagePrice *
    priceMultiplier;

  /* Выручка */

  const revenue =
    customers *
    price;

  /* Себестоимость */

  const productCost =
    revenue *
    industry.productCost *
    c.effects.cost;

  /* Зарплаты */

  const salaries =
    c.employees.reduce(
      (total, employee) =>
        total +
        STAFF[employee.role].salary,
      0
    );

  /* Аренда */

  const rent =
    c.buildings.reduce(
      (total, building) =>
        total +
        building.rent,
      0
    ) *
    district.rent *
    c.effects.rent;

  /* Кредиты */

  const loanPayments =
    c.loans.reduce(
      (total, loan) =>
        total +
        Math.min(
          loan.payment,
          loan.remaining
        ),
      0
    );

  /* Прочие */

  const otherExpenses =
    80 +
    customers * 2;

  const expenses =
    productCost +
    salaries +
    rent +
    loanPayments +
    otherExpenses;

  const profit =
    revenue -
    expenses;

  return {

    customers,

    revenue,

    expenses,

    profit,

    productCost,

    salaries,

    rent,

    loanPayments,

    otherExpenses

  };
}

/* =========================================================
   РЫНОК
   ========================================================= */

function updateMarket() {

  Object.entries(state.market)
    .forEach(([key, market]) => {

      const movement =
        Number(
          random(
            -0.06,
            0.06
          ).toFixed(3)
        );

      market.trend =
        movement * 100;

      market.demand =
        clamp(
          market.demand +
          movement,
          0.65,
          1.45
        );

      market.competition =
        clamp(
          market.competition +
          randomInt(-3, 3),
          20,
          90
        );

      market.history.push(
        market.demand
      );

      if (
        market.history.length >
        30
      ) {
        market.history.shift();
      }
    });
}

/* =========================================================
   КРЕДИТЫ
   ========================================================= */

function processLoans() {

  state.company.loans
    .forEach(loan => {

      const payment =
        Math.min(
          loan.payment,
          loan.remaining
        );

      loan.remaining -=
        payment;

      loan.daysLeft -= 1;

    });

  state.company.loans =
    state.company.loans.filter(
      loan =>
        loan.remaining > 0 &&
        loan.daysLeft > 0
    );
}

/* =========================================================
   ЭФФЕКТЫ
   ========================================================= */

function processEffects() {

  const effects =
    state.company.effects;

  if (effects.demandDays > 0) {

    effects.demandDays--;

    if (
      effects.demandDays <= 0
    ) {
      effects.demand = 1;
    }
  }

  if (
    effects.marketingDays > 0
  ) {

    effects.marketingDays--;

    if (
      effects.marketingDays <= 0
    ) {
      effects.marketing = 1;
    }
  }

  if (
    effects.costDays > 0
  ) {

    effects.costDays--;

    if (
      effects.costDays <= 0
    ) {
      effects.cost = 1;
    }
  }

  if (
    effects.rentDays > 0
  ) {

    effects.rentDays--;

    if (
      effects.rentDays <= 0
    ) {
      effects.rent = 1;
    }
  }

  if (
    effects.capacityDays > 0
  ) {

    effects.capacityDays--;

    if (
      effects.capacityDays <= 0
    ) {
      effects.capacity = 1;
    }
  }
}

/* =========================================================
   СТОИМОСТЬ КОМПАНИИ
   ========================================================= */

function updateCompanyValue() {

  const c =
    state.company;

  const buildingValue =
    c.buildings.reduce(
      (sum, building) =>
        sum +
        building.price *
        0.82,
      0
    );

  const revenueValue =
    c.totalRevenue *
    0.08;

  const profitValue =
    Math.max(
      0,
      c.totalProfit
    ) * 0.5;

  const reputationValue =
    c.reputation *
    400;

  const teamValue =
    c.employees.length *
    1000;

  c.companyValue =
    Math.max(
      1000,
      Math.round(
        10000 +
        Math.max(0, c.cash) +
        buildingValue +
        revenueValue +
        profitValue +
        reputationValue +
        teamValue
      )
    );
}

/* =========================================================
   УРОВЕНЬ
   ========================================================= */

function updateLevel() {

  const c =
    state.company;

  let required =
    c.level * 100;

  while (
    c.experience >= required
  ) {

    c.experience -=
      required;

    c.level += 1;

    required =
      c.level * 100;

    showToast(
      `Новый уровень: ${c.level}`
    );
  }
}

/* =========================================================
   ДОСТИЖЕНИЯ
   ========================================================= */

function checkAchievements() {

  const c =
    state.company;

  const conditions = {

    FIRST_PROFIT:
      c.totalProfit > 0,

    FIRST_EMPLOYEE:
      c.employees.length >= 1,

    CUSTOMERS_100:
      c.totalCustomers >= 100,

    CASH_100K:
      c.cash >= 100000,

    FIRST_BUILDING:
      c.buildings.length >= 1,

    EMPLOYEES_10:
      c.employees.length >= 10,

    VALUE_1M:
      c.companyValue >= 1000000,

    REPUTATION_80:
      c.reputation >= 80,

    FIRST_LOAN:
      state.eventHistory
        .some(event =>
          event.type === "Кредит"
        ),

    DEBT_FREE:
      state.day > 1 &&
      c.loans.length === 0,

    DAY_100:
      state.day >= 100,

    BUILDINGS_10:
      c.buildings.length >= 10,

    REVENUE_1M:
      c.totalRevenue >= 1000000,

    MARKETING:
      c.campaigns.length >= 1,

    LEVEL_10:
      c.level >= 10
  };

  Object.entries(
    conditions
  ).forEach(([id, condition]) => {

    if (
      condition &&
      !state.unlockedAchievements.includes(id)
    ) {

      state.unlockedAchievements.push(id);

      const achievement =
        ACHIEVEMENTS[id];

      showToast(
        `Достижение: ${achievement.title}`
      );
    }

  });
}

/* =========================================================
   СЛУЧАЙНОЕ СОБЫТИЕ
   ========================================================= */

function maybeTriggerEvent() {

  /*
   Не слишком часто:
   примерно 30% рабочих дней.
  */

  if (
    Math.random() > 0.30
  ) {
    return;
  }

  const event =
    EVENTS[
      randomInt(
        0,
        EVENTS.length - 1
      )
    ];

  state.pendingEvent = event;

  state.eventHistory.push({

    day:
      state.day,

    type:
      "Событие",

    text:
      event.title

  });

  saveGame();

  showEvent(event);
}

function showEvent(event) {

  openModal(`

    <div class="hero-kicker">
      СОБЫТИЕ · ДЕНЬ ${state.day}
    </div>

    <h2 class="modal-title">
      ${event.title}
    </h2>

    <p class="modal-text">
      ${event.description}
    </p>

    ${
      event.choices
        .map(
          (choice, index) => `

            <button
              class="event-choice"
              data-action="event-choice"
              data-index="${index}">

              <strong>
                ${choice.title}
              </strong>

              <span>
                ${choice.description}
              </span>

            </button>

          `
        )
        .join("")
    }

  `);
}

function chooseEvent(index) {

  const event =
    state.pendingEvent;

  if (!event) return;

  const choice =
    event.choices[index];

  if (!choice) return;

  choice.action();

  state.company.reputation =
    clamp(
      state.company.reputation,
      0,
      100
    );

  state.eventHistory[
    state.eventHistory.length - 1
  ].text +=
    ` · Решение: ${choice.title}`;

  state.pendingEvent = null;

  saveGame();

  closeModal();

  renderGame();

  showToast(
    "Решение принято"
  );
}

/* =========================================================
   ЗАВЕРШЕНИЕ ДНЯ
   ========================================================= */

function endDay() {

  if (state.pendingEvent) {
    return;
  }

  const result =
    calculateEconomy();

  /* Деньги */

  state.company.cash +=
    result.profit;

  /* Статистика */

  state.company.totalRevenue +=
    result.revenue;

  state.company.totalExpenses +=
    result.expenses;

  state.company.totalProfit +=
    result.profit;

  state.company.totalCustomers +=
    result.customers;

  /* Опыт */

  state.company.experience +=
    Math.max(
      5,
      Math.round(
        result.revenue /
        250
      )
    );

  /* Репутация */

  if (
    result.profit > 0
  ) {

    state.company.reputation +=
      0.7;

  } else {

    state.company.reputation -=
      0.5;
  }

  state.company.reputation =
    clamp(
      state.company.reputation,
      0,
      100
    );

  /* Аналитика */

  state.analytics.push({

    day:
      state.day,

    revenue:
      Math.round(
        result.revenue
      ),

    expenses:
      Math.round(
        result.expenses
      ),

    profit:
      Math.round(
        result.profit
      ),

    customers:
      result.customers,

    cash:
      Math.round(
        state.company.cash
      ),

    companyValue:
      Math.round(
        state.company.companyValue
      )
  });

  /* Кредиты */

  processLoans();

  /* Рынок */

  updateMarket();

  /* Эффекты */

  processEffects();

  /* Следующий день */

  state.day += 1;

  /* Стоимость */

  updateCompanyValue();

  /* Уровень */

  updateLevel();

  /* Достижения */

  checkAchievements();

  saveGame();

  renderGame();

  if (
    result.profit >= 0
  ) {

    showToast(
      `День завершён: +${formatMoney(
        result.profit
      )}`
    );

  } else {

    showToast(
      `День завершён: ${formatMoney(
        result.profit
      )}`
    );
  }

  setTimeout(
    maybeTriggerEvent,
    600
  );
}

/* =========================================================
   ДЕЛЕГИРОВАНИЕ СОБЫТИЙ
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-action]"
      );

    if (!button) return;

    const action =
      button.dataset.action;

    switch (action) {

      case "new-game":
        openCompanyCreation();
        break;

      case "continue":
        state.ui.screen =
          "home";

        saveGame();

        renderGame();
        break;

      case "delete-save":

        if (
          confirm(
            "Удалить всё сохранение?"
          )
        ) {
          deleteSave();
        }

        break;

      case "close-modal":
        closeModal();
        break;

      case "navigate":

        state.ui.screen =
          button.dataset.screen;

        saveGame();

        closeModal();

        renderGame();

        break;

      case "more":
        openMoreMenu();
        break;

      case "end-day":
        endDay();
        break;

      case "change-price":
        changePrice();
        break;

      case "select-district":

        state.company.district =
          button.dataset.district;

        saveGame();

        renderGame();

        showToast(
          "Район изменён"
        );

        break;

      case "hire":
        hireEmployee(
          button.dataset.role
        );
        break;

      case "train":
        trainEmployee(
          button.dataset.id
        );
        break;

      case "promote":
        promoteEmployee(
          button.dataset.id
        );
        break;

      case "fire":

        if (
          confirm(
            "Уволить этого сотрудника?"
          )
        ) {

          fireEmployee(
            button.dataset.id
          );
        }

        break;

      case "marketing":
        launchMarketing(
          button.dataset.channel
        );
        break;

      case "loan":

        takeLoan(
          Number(button.dataset.amount),
          Number(button.dataset.rate),
          Number(button.dataset.days)
        );

        break;

      case "building":
        buyBuilding(
          button.dataset.building
        );
        break;

      case "event-choice":

        chooseEvent(
          Number(button.dataset.index)
        );

        break;

      case "analytics-period":

        state.ui.analyticsPeriod =
          Number(
            button.dataset.period
          );

        saveGame();

        renderGame();

        break;
    }

  }
);

/* =========================================================
   ЗАПУСК
   ========================================================= */

function startApp() {

  loadGame();

  if (
    !state.initialized
  ) {

    renderStartScreen();

  } else {

    renderGame();
  }

  if (
    "serviceWorker" in navigator
  ) {

    window.addEventListener(
      "load",
      () => {

        navigator.serviceWorker
          .register("./sw.js")
          .catch(
            error =>
              console.warn(
                "Service Worker:",
                error
              )
          );

      }
    );
  }
}

startApp();
