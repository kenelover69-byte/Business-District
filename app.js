"use strict";

/* =========================================================
   BUSINESS DISTRICT
   Core Game Engine
========================================================= */

const SAVE_KEY = "business-district-save-v2";
const SAVE_VERSION = 2;

/* =========================================================
   DATA
========================================================= */

const INDUSTRIES = {
  COFFEE: {
    price: 180,
    cost: 0.34,
    demand: 90
  },

  FASHION: {
    price: 420,
    cost: 0.45,
    demand: 70
  },

  FOOD: {
    price: 240,
    cost: 0.40,
    demand: 100
  },

  IT: {
    price: 650,
    cost: 0.25,
    demand: 55
  },

  SERVICES: {
    price: 330,
    cost: 0.22,
    demand: 65
  },

  RETAIL: {
    price: 300,
    cost: 0.48,
    demand: 80
  }
};

const DISTRICTS = {
  CENTRAL: {
    rent: 850,
    traffic: 1.25,
    demand: 1.20,
    competition: 1.35
  },

  NORTH: {
    rent: 520,
    traffic: 1.00,
    demand: 1.00,
    competition: 1.00
  },

  SOUTH: {
    rent: 430,
    traffic: 0.92,
    demand: 0.95,
    competition: 0.85
  },

  INDUSTRIAL: {
    rent: 300,
    traffic: 0.72,
    demand: 0.80,
    competition: 0.65
  },

  RIVERSIDE: {
    rent: 700,
    traffic: 1.10,
    demand: 1.18,
    competition: 1.05
  }
};

const STAFF_TYPES = {
  SALES: {
    name: "Sales Manager",
    salary: 420,
    efficiency: 0.16
  },

  ACCOUNTANT: {
    name: "Accountant",
    salary: 480,
    efficiency: 0.05
  },

  DEVELOPER: {
    name: "Developer",
    salary: 650,
    efficiency: 0.18
  },

  DESIGNER: {
    name: "Designer",
    salary: 450,
    efficiency: 0.10
  },

  MARKETING: {
    name: "Marketing Manager",
    salary: 500,
    efficiency: 0.16
  },

  OPERATIONS: {
    name: "Operations Manager",
    salary: 560,
    efficiency: 0.12
  }
};

const BUILDINGS = {
  SHOP: {
    name: "Small Shop",
    price: 3500,
    rent: 180,
    capacity: 1.20
  },

  OFFICE: {
    name: "Office",
    price: 5000,
    rent: 260,
    capacity: 1.15
  },

  CAFE: {
    name: "Cafe",
    price: 4500,
    rent: 240,
    capacity: 1.30
  },

  RESTAURANT: {
    name: "Restaurant",
    price: 8500,
    rent: 450,
    capacity: 1.55
  },

  WAREHOUSE: {
    name: "Warehouse",
    price: 6000,
    rent: 300,
    capacity: 1.08
  }
};

const MARKETING = {
  SOCIAL: {
    name: "Social",
    cost: 450,
    effect: 1.14,
    days: 3
  },

  SEARCH: {
    name: "Search",
    cost: 700,
    effect: 1.20,
    days: 4
  },

  INFLUENCER: {
    name: "Influencer",
    cost: 1300,
    effect: 1.38,
    days: 3
  },

  BILLBOARD: {
    name: "Billboard",
    cost: 1000,
    effect: 1.24,
    days: 5
  },

  LOCAL: {
    name: "Local Event",
    cost: 800,
    effect: 1.30,
    days: 2
  }
};

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const ACHIEVEMENTS = [
  ["FIRST_PROFIT", "First Profit"],
  ["FIRST_EMPLOYEE", "First Employee"],
  ["100_CUSTOMERS", "100 Customers"],
  ["100K_CASH", "100K Cash"],
  ["FIRST_LOCATION", "First Location"],
  ["10_EMPLOYEES", "10 Employees"],
  ["1M_VALUE", "1M Company Value"],
  ["MARKET_LEADER", "Market Leader"],
  ["FIRST_LOAN", "First Loan"],
  ["DEBT_FREE", "Debt Free"],
  ["100_DAYS", "100 Days"],
  ["10_LOCATIONS", "10 Locations"],
  ["1M_REVENUE", "1M Revenue"],
  ["VIRAL", "Viral Campaign"],
  ["EMPIRE", "Business Empire"]
];

/* =========================================================
   EVENTS
========================================================= */

const EVENTS = [
  {
    title: "Supplier price hike",
    text: "A key supplier suddenly raises prices.",
    choices: [
      {
        title: "Accept the increase",
        effect: { costRate: 0.08 }
      },
      {
        title: "Find another supplier",
        effect: { cash: -350, reputation: 1 }
      }
    ]
  },

  {
    title: "Viral post",
    text: "A post about your company starts spreading.",
    choices: [
      {
        title: "Ride the wave",
        effect: {
          marketing: 0.20,
          reputation: 3,
          viral: true
        }
      },
      {
        title: "Ignore it",
        effect: {}
      }
    ]
  },

  {
    title: "New competitor",
    text: "A strong competitor opens nearby.",
    choices: [
      {
        title: "Defend your market",
        effect: {
          cash: -500,
          reputation: 2
        }
      },
      {
        title: "Ignore them",
        effect: {
          reputation: -2
        }
      }
    ]
  },

  {
    title: "Staff resignation",
    text: "One employee wants to leave.",
    choices: [
      {
        title: "Accept the resignation",
        effect: {
          staffLoss: 1
        }
      },
      {
        title: "Offer a bonus",
        effect: {
          cash: -600,
          morale: 8
        }
      }
    ]
  },

  {
    title: "Local festival",
    text: "The city is unusually busy today.",
    choices: [
      {
        title: "Open late",
        effect: {
          traffic: 0.25
        }
      },
      {
        title: "Keep normal hours",
        effect: {}
      }
    ]
  },

  {
    title: "Supply shortage",
    text: "Some products are harder to source.",
    choices: [
      {
        title: "Find alternatives",
        effect: {
          cash: -300
        }
      },
      {
        title: "Accept lower stock",
        effect: {
          demand: -0.15
        }
      }
    ]
  },

  {
    title: "Rent increase",
    text: "Landlords raise commercial rents.",
    choices: [
      {
        title: "Absorb the increase",
        effect: {
          rent: 0.15
        }
      },
      {
        title: "Move later",
        effect: {
          reputation: -1
        }
      }
    ]
  },

  {
    title: "Big client",
    text: "A large client offers a one-day contract.",
    choices: [
      {
        title: "Take the contract",
        effect: {
          revenue: 0.25
        }
      },
      {
        title: "Decline",
        effect: {}
      }
    ]
  },

  {
    title: "Bad review",
    text: "A negative review becomes visible.",
    choices: [
      {
        title: "Respond publicly",
        effect: {
          reputation: 2
        }
      },
      {
        title: "Ignore it",
        effect: {
          reputation: -2
        }
      }
    ]
  },

  {
    title: "Good review",
    text: "A customer publishes a glowing review.",
    choices: [
      {
        title: "Share it",
        effect: {
          reputation: 3,
          marketing: 0.08
        }
      },
      {
        title: "Do nothing",
        effect: {
          reputation: 1
        }
      }
    ]
  },

  {
    title: "Market boom",
    text: "Consumers are spending more than usual.",
    choices: [
      {
        title: "Scale today",
        effect: {
          demand: 0.25
        }
      },
      {
        title: "Protect cash",
        effect: {}
      }
    ]
  },

  {
    title: "Market crash",
    text: "Consumer confidence suddenly falls.",
    choices: [
      {
        title: "Protect cash",
        effect: {
          demand: -0.15
        }
      },
      {
        title: "Keep investing",
        effect: {
          demand: 0.05,
          cash: -500
        }
      }
    ]
  },

  {
    title: "Influencer offer",
    text: "A creator offers to promote your business.",
    choices: [
      {
        title: "Accept",
        effect: {
          cash: -800,
          marketing: 0.25,
          reputation: 2,
          viral: true
        }
      },
      {
        title: "Decline",
        effect: {}
      }
    ]
  },

  {
    title: "Equipment failure",
    text: "Important equipment stops working.",
    choices: [
      {
        title: "Repair immediately",
        effect: {
          cash: -600
        }
      },
      {
        title: "Work around it",
        effect: {
          demand: -0.20
        }
      }
    ]
  },

  {
    title: "New district",
    text: "The city announces a new commercial zone.",
    choices: [
      {
        title: "Explore the opportunity",
        effect: {
          reputation: 1
        }
      },
      {
        title: "Stay focused",
        effect: {}
      }
    ]
  }
];

/* =========================================================
   STATE
========================================================= */

function createEmptyState() {
  return {
    version: SAVE_VERSION,

    name: "",
    industry: "COFFEE",
    strategy: "balanced",
    district: "CENTRAL",

    day: 1,

    cash: 10000,
    reputation: 8,
    companyValue: 10000,

    totalCustomers: 0,
    lifetimeRevenue: 0,
    lifetimeProfit: 0,

    staff: [],
    buildings: [],
    loans: [],
    marketing: [],

    history: [],
    achievements: [],

    market: {},

    event: null,

    flags: {
      hadLoan: false,
      viral: false
    },

    modifiers: {
      costRate: 0,
      marketing: 1,
      demand: 1,
      revenue: 1,
      rent: 1,
      traffic: 1
    }
  };
}

let state = loadState() || createEmptyState();

let currentScreen = state.name ? "home" : "start";

/* =========================================================
   STORAGE
========================================================= */

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (!parsed || parsed.version !== SAVE_VERSION) {
      localStorage.removeItem(SAVE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error(error);
    localStorage.removeItem(SAVE_KEY);
    return null;
  }
}

function saveState() {
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(state)
  );
}

/* =========================================================
   HELPERS
========================================================= */

function money(value) {
  return "₴" + Math.round(value).toLocaleString("uk-UA");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return map[char];
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toast(message) {
  const element = document.getElementById("toast");

  element.textContent = message;
  element.classList.add("show");

  setTimeout(() => {
    element.classList.remove("show");
  }, 1800);
}

/* =========================================================
   NAVIGATION
========================================================= */

function navigate(screen) {
  currentScreen = screen;
  render();

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}

/* =========================================================
   NAV BAR
========================================================= */

function navigation() {
  if (!state.name) {
    return "";
  }

  const items = [
    ["home", "HOME"],
    ["city", "CITY"],
    ["market", "MARKET"],
    ["company", "COMPANY"],
    ["analytics", "DATA"],
    ["more", "MORE"]
  ];

  return `
    <nav class="nav">

      ${items.map(item => `
        <button
          class="${currentScreen === item[0] ? "active" : ""}"
          onclick="navigate('${item[0]}')"
        >
          <div class="nav-dot"></div>
          ${item[1]}
        </button>
      `).join("")}

    </nav>
  `;
}

/* =========================================================
   TOP BAR
========================================================= */

function topBar() {
  return `
    <div class="top">

      <div class="brand">
        BUSINESS DISTRICT
      </div>

      <div class="day">
        OPERATING DAY
        <strong>${state.day}</strong>
      </div>

    </div>
  `;
}

/* =========================================================
   MAIN RENDER
========================================================= */

function render() {
  const app = document.getElementById("app");

  let content = "";

  if (!state.name) {
    content = currentScreen === "onboarding"
      ? onboardingView()
      : startView();
  } else {

    switch (currentScreen) {

      case "home":
        content = homeView();
        break;

      case "city":
        content = cityView();
        break;

      case "market":
        content = marketView();
        break;

      case "company":
        content = companyView();
        break;

      case "analytics":
        content = analyticsView();
        break;

      case "buildings":
        content = buildingsView();
        break;

      case "marketing":
        content = marketingView();
        break;

      case "bank":
        content = bankView();
        break;

      case "events":
        content = eventsView();
        break;

      case "achievements":
        content = achievementsView();
        break;

      case "settings":
        content = settingsView();
        break;

      case "more":
      default:
        content = moreView();
        break;
    }
  }

  app.innerHTML = content + navigation();
}

/* =========================================================
   START
========================================================= */

function startView() {
  return `
    <main class="shell">

      <div class="hero">

        <div class="brand">
          BUSINESS DISTRICT / 02
        </div>

        <h1>
          BUILD<br>
          SOMETHING.
        </h1>

        <p>
          Start small. Think bigger.
          Build a company, survive the market
          and turn one location into an empire.
        </p>

      </div>

      <button
        class="primary"
        onclick="openOnboarding()"
      >
        CREATE COMPANY
      </button>

      <div class="section">

        <div class="panel">

          <div class="row">
            <span class="tiny">
              NO ACCOUNT
            </span>

            <span class="tiny">
              LOCAL SAVE
            </span>
          </div>

          <p class="muted">
            Your company is saved directly
            on this device.
          </p>

        </div>

      </div>

    </main>
  `;
}

/* =========================================================
   ONBOARDING
========================================================= */

function openOnboarding() {
  currentScreen = "onboarding";
  render();
}

function onboardingView() {
  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          01 / FOUNDATION
        </div>

        <h1>
          YOUR<br>
          COMPANY.
        </h1>

      </div>

      <div class="form">

        <div class="field">
          <label>Company name</label>
          <input
            id="company-name"
            maxlength="22"
            placeholder="NORTH"
          >
        </div>

        <div class="field">
          <label>Industry</label>

          <select id="industry">

            ${Object.keys(INDUSTRIES).map(industry => `
              <option value="${industry}">
                ${industry}
              </option>
            `).join("")}

          </select>
        </div>

        <div class="field">
          <label>Strategy</label>

          <select id="strategy">

            <option value="premium">
              PREMIUM
            </option>

            <option value="balanced" selected>
              BALANCED
            </option>

            <option value="low-cost">
              LOW COST
            </option>

            <option value="innovative">
              INNOVATIVE
            </option>

          </select>

        </div>

        <div class="field">

          <label>First district</label>

          <select id="district">

            ${Object.keys(DISTRICTS).map(district => `
              <option value="${district}">
                ${district}
              </option>
            `).join("")}

          </select>

        </div>

        <button
          class="primary"
          onclick="createCompany()"
        >
          START WITH ${money(10000)}
        </button>

      </div>

    </main>
  `;
}

function createCompany() {

  const name =
    document.getElementById("company-name")
      .value
      .trim();

  if (!name) {
    toast("Enter a company name.");
    return;
  }

  state = createEmptyState();

  state.name = name;

  state.industry =
    document.getElementById("industry").value;

  state.strategy =
    document.getElementById("strategy").value;

  state.district =
    document.getElementById("district").value;

  initializeMarket();

  saveState();

  currentScreen = "home";

  render();

  toast("Company created.");
}

/* =========================================================
   MARKET INITIALIZATION
========================================================= */

function initializeMarket() {

  state.market = {};

  Object.keys(INDUSTRIES).forEach(industry => {

    state.market[industry] =
      Number(
        (Math.random() * 20 - 10).toFixed(1)
      );

  });
}

/* =========================================================
   HOME
========================================================= */

function homeView() {

  const last =
    state.history[state.history.length - 1];

  const revenue =
    last ? last.revenue : 0;

  const profit =
    last ? last.profit : 0;

  return `
    <main class="shell">

      ${topBar()}

      <div class="grid">

        <div class="stat wide">
          <div class="stat-label">
            Cash
          </div>

          <div class="stat-value">
            ${money(state.cash)}
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            Revenue / day
          </div>

          <div class="stat-value">
            ${money(revenue)}
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            Profit / day
          </div>

          <div class="stat-value">
            ${money(profit)}
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            Customers
          </div>

          <div class="stat-value">
            ${Math.round(state.totalCustomers)}
          </div>
        </div>

        <div class="stat">
          <div class="stat-label">
            Reputation
          </div>

          <div class="stat-value">
            ${state.reputation.toFixed(1)}
          </div>
        </div>

        <div class="stat wide">

          <div class="stat-label">
            Company value
          </div>

          <div class="stat-value">
            ${money(state.companyValue)}
          </div>

          <div class="progress">
            <span
              style="
                width:${clamp(
                  state.companyValue / 5000000 * 100,
                  0,
                  100
                )}%
              "
            ></span>
          </div>

        </div>

      </div>

      <div class="section">

        <div class="section-head">

          <div>
            <div class="tiny">
              LIVE PERFORMANCE
            </div>

            <h2>
              ${escapeHTML(state.name)}
            </h2>
          </div>

          <span class="muted">
            ${state.industry}
          </span>

        </div>

        <div class="panel">
          ${profitChart()}
        </div>

      </div>

      <div class="section">

        <div class="grid">

          <button
            class="secondary"
            onclick="navigate('market')"
          >
            MANAGE MARKET
          </button>

          <button
            class="secondary"
            onclick="navigate('company')"
          >
            MANAGE TEAM
          </button>

        </div>

        <button
          class="primary"
          onclick="endDay()"
        >
          END DAY →
        </button>

      </div>

      ${
        state.event
          ? eventPanel()
          : ""
      }

    </main>
  `;
}

/* =========================================================
   PROFIT CHART
========================================================= */

function profitChart() {

  const values =
    state.history
      .slice(-14)
      .map(item => Math.max(0, item.profit));

  if (!values.length) {
    return `
      <div class="empty">
        Your first operating day
        will create the first data point.
      </div>
    `;
  }

  const max =
    Math.max(...values, 1);

  return `
    <div class="spark">

      ${values.map((value, index) => {

        const height =
          Math.max(
            5,
            value / max * 100
          );

        return `
          <i
            class="spark-bar ${
              index === values.length - 1
                ? "active"
                : ""
            }"
            style="height:${height}%"
          ></i>
        `;

      }).join("")}

    </div>
  `;
}

/* =========================================================
   CITY
========================================================= */

function cityView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          THE CITY / ${state.district}
        </div>

        <h1>
          WHERE<br>
          YOU GROW.
        </h1>

        <p>
          Districts affect rent, traffic,
          demand and competition.
        </p>

      </div>

      <div class="city-map">

        ${Object.entries(DISTRICTS)
          .map(([name, district]) => `

            <div
              class="district ${
                state.district === name
                  ? "owned"
                  : ""
              }"
            >

              <div>

                <h3>
                  ${name}
                </h3>

                <div class="metric">
                  RENT ${money(district.rent)} / DAY
                </div>

              </div>

              <div>

                <div class="metric">
                  TRAFFIC
                  ${(district.traffic * 100).toFixed(0)}
                  · DEMAND
                  ${(district.demand * 100).toFixed(0)}
                  · COMP
                  ${(district.competition * 100).toFixed(0)}
                </div>

                <button
                  onclick="moveDistrict('${name}')"
                >
                  ${
                    state.district === name
                      ? "CURRENT"
                      : "MOVE"
                  }
                </button>

              </div>

            </div>

          `)
          .join("")}

      </div>

    </main>
  `;
}

/* =========================================================
   MARKET
========================================================= */

function marketView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          MARKET / ${state.industry}
        </div>

        <h1>
          READ<br>
          THE ROOM.
        </h1>

      </div>

      <div class="list">

        ${Object.keys(INDUSTRIES)
          .map(industry => {

            const trend =
              state.market[industry] || 0;

            const width =
              clamp(
                50 + trend,
                5,
                95
              );

            return `
              <div class="item">

                <div class="row">

                  <div class="item-title">
                    ${industry}
                  </div>

                  <div class="mono">
                    ${
                      trend >= 0
                        ? "+"
                        : ""
                    }${trend.toFixed(1)}%
                  </div>

                </div>

                <div class="item-meta">
                  Average price
                  ${money(INDUSTRIES[industry].price)}
                  · Demand
                  ${INDUSTRIES[industry].demand}
                </div>

                <div class="progress">
                  <span
                    style="width:${width}%"
                  ></span>
                </div>

              </div>
            `;

          })
          .join("")}

      </div>

      <div class="section">

        <div class="panel">

          <div class="tiny">
            YOUR BUSINESS
          </div>

          <div
            class="row"
            style="margin-top:8px"
          >

            <strong>
              ${state.industry}
            </strong>

            <span class="muted">
              ${state.strategy}
            </span>

          </div>

        </div>

      </div>

    </main>
  `;
}

/* =========================================================
   COMPANY
========================================================= */

function companyView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          COMPANY / ${escapeHTML(state.name)}
        </div>

        <h1>
          PEOPLE<br>
          + ASSETS.
        </h1>

      </div>

      <div class="tabs">

        <button class="active">
          TEAM
        </button>

        <button
          onclick="navigate('buildings')"
        >
          BUILDINGS
        </button>

        <button
          onclick="navigate('marketing')"
        >
          MARKETING
        </button>

        <button
          onclick="navigate('bank')"
        >
          BANK
        </button>

      </div>

      <div class="section-head">

        <h2>
          STAFF / ${state.staff.length}
        </h2>

        <button
          class="secondary"
          onclick="hireEmployee()"
        >
          HIRE
        </button>

      </div>

      <div class="list">

        ${
          state.staff.length

            ? state.staff.map((employee, index) => `

                <div class="item">

                  <div class="row">

                    <div>

                      <div class="item-title">
                        ${employee.name}
                      </div>

                      <div class="item-meta">
                        ${employee.role}
                        · ${money(employee.salary)}/day
                        · EXP ${employee.experience.toFixed(1)}
                      </div>

                    </div>

                    <button
                      class="danger"
                      onclick="fireEmployee(${index})"
                    >
                      FIRE
                    </button>

                  </div>

                  <div class="progress">

                    <span
                      style="width:${employee.morale}%"
                    ></span>

                  </div>

                </div>

              `).join("")

            : `
              <div class="empty">
                No employees yet.
                Your first good hire can change
                the entire operation.
              </div>
            `
        }

      </div>

    </main>
  `;
}

/* =========================================================
   ANALYTICS
========================================================= */

function analyticsView() {

  const history =
    state.history.slice(-30);

  const revenue =
    history.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

  const expenses =
    history.reduce(
      (sum, item) => sum + item.expenses,
      0
    );

  const profit =
    history.reduce(
      (sum, item) => sum + item.profit,
      0
    );

  const customers =
    history.reduce(
      (sum, item) => sum + item.customers,
      0
    );

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          ANALYTICS / LAST 30 DAYS
        </div>

        <h1>
          NUMBERS<br>
          DON'T LIE.
        </h1>

      </div>

      <div class="list">

        ${[
          ["Revenue", revenue],
          ["Expenses", expenses],
          ["Profit", profit],
          ["Customers", Math.round(customers)],
          ["Cash", state.cash],
          ["Company Value", state.companyValue]
        ].map(item => `

          <div class="item">

            <div class="row">

              <span class="muted">
                ${item[0]}
              </span>

              <span class="mono">
                ${
                  item[0] === "Customers"
                    ? item[1].toLocaleString()
                    : money(item[1])
                }
              </span>

            </div>

          </div>

        `).join("")}

      </div>

      <div class="section">

        <div class="panel">

          <div class="tiny">
            PROFIT HISTORY
          </div>

          ${profitChart()}

        </div>

      </div>

    </main>
  `;
}

/* =========================================================
   MORE
========================================================= */

function moreView() {

  const options = [
    [
      "buildings",
      "BUILDINGS",
      "Buy locations and increase capacity."
    ],
    [
      "marketing",
      "MARKETING",
      "Create campaigns that shift demand."
    ],
    [
      "bank",
      "BANK",
      "Finance growth without destroying cash flow."
    ],
    [
      "events",
      "EVENTS",
      "Review decisions and business events."
    ],
    [
      "achievements",
      "ACHIEVEMENTS",
      `${state.achievements.length} / ${ACHIEVEMENTS.length} unlocked.`
    ],
    [
      "settings",
      "SETTINGS",
      "Save management and reset."
    ]
  ];

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          OPERATIONS
        </div>

        <h1>
          RUN<br>
          THE BUSINESS.
        </h1>

      </div>

      <div class="list">

        ${options.map(option => `

          <button
            class="item"
            style="text-align:left;color:white"
            onclick="navigate('${option[0]}')"
          >

            <div class="item-title">
              ${option[1]}
            </div>

            <div class="item-meta">
              ${option[2]}
            </div>

          </button>

        `).join("")}

      </div>

    </main>
  `;
}

/* =========================================================
   BUILDINGS
========================================================= */

function buildingsView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          OPERATIONS
        </div>

        <h1>
          BUILD<br>
          THE BASE.
        </h1>

      </div>

      <div class="list">

        ${Object.entries(BUILDINGS)
          .map(([key, building]) => `

            <div class="item">

              <div class="row">

                <div>

                  <div class="item-title">
                    ${building.name}
                  </div>

                  <div class="item-meta">
                    ${money(building.price)}
                    · Rent
                    ${money(building.rent)}/day
                    · Capacity ×${building.capacity}
                  </div>

                </div>

                <button
                  class="secondary"
                  onclick="buyBuilding('${key}')"
                >
                  BUY
                </button>

              </div>

            </div>

          `)
          .join("")}

      </div>

      <div class="section">

        <div class="section-head">

          <h2>
            OWNED / ${state.buildings.length}
          </h2>

        </div>

        <div class="list">

          ${
            state.buildings.length

              ? state.buildings.map(building => `

                  <div class="item">

                    <div class="row">

                      <span>
                        ${BUILDINGS[building.type].name}
                      </span>

                      <span class="mono">
                        ${building.district}
                      </span>

                    </div>

                  </div>

                `).join("")

              : `
                <div class="empty">
                  No locations yet.
                </div>
              `
          }

        </div>

      </div>

    </main>
  `;
}

/* =========================================================
   MARKETING
========================================================= */

function marketingView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          DEMAND ENGINE
        </div>

        <h1>
          CREATE<br>
          DEMAND.
        </h1>

      </div>

      <div class="list">

        ${Object.entries(MARKETING)
          .map(([key, campaign]) => `

            <div class="item">

              <div class="row">

                <div>

                  <div class="item-title">
                    ${campaign.name}
                  </div>

                  <div class="item-meta">
                    ${money(campaign.cost)}
                    · Demand ×${campaign.effect}
                    · ${campaign.days} days
                  </div>

                </div>

                <button
                  class="secondary"
                  onclick="launchMarketing('${key}')"
                >
                  LAUNCH
                </button>

              </div>

            </div>

          `)
          .join("")}

      </div>

    </main>
  `;
}

/* =========================================================
   BANK
========================================================= */

function bankView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          FINANCE
        </div>

        <h1>
          USE<br>
          CAPITAL.
        </h1>

      </div>

      <div class="list">

        ${[5000, 10000, 25000, 50000]
          .map(amount => `

            <div class="item">

              <div class="row">

                <div>

                  <div class="item-title">
                    ${money(amount)} loan
                  </div>

                  <div class="item-meta">
                    5% total interest · 20 days
                  </div>

                </div>

                <button
                  class="secondary"
                  onclick="takeLoan(${amount})"
                >
                  TAKE
                </button>

              </div>

            </div>

          `)
          .join("")}

      </div>

      <div class="section">

        <div class="section-head">
          <h2>
            ACTIVE DEBT
          </h2>
        </div>

        <div class="list">

          ${
            state.loans.length

              ? state.loans.map((loan, index) => `

                  <div class="item">

                    <div class="row">

                      <span>
                        ${money(loan.remaining)}
                      </span>

                      <button
                        class="secondary"
                        onclick="payLoan(${index})"
                      >
                        PAY
                      </button>

                    </div>

                    <div class="item-meta">
                      ${loan.days} days remaining
                    </div>

                  </div>

                `).join("")

              : `
                <div class="empty">
                  No active debt.
                </div>
              `
          }

        </div>

      </div>

    </main>
  `;
}

/* =========================================================
   EVENTS
========================================================= */

function eventPanel() {

  if (!state.event) {
    return "";
  }

  return `
    <div class="section">

      <div class="panel event">

        <div class="tiny">
          DECISION REQUIRED
        </div>

        <h3>
          ${state.event.title}
        </h3>

        <p>
          ${state.event.text}
        </p>

        <div class="choices">

          ${state.event.choices.map(
            (choice, index) => `

              <button
                onclick="chooseEvent(${index})"
              >
                ${choice.title}
              </button>

            `
          ).join("")}

        </div>

      </div>

    </div>
  `;
}

function eventsView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          OPERATIONS
        </div>

        <h1>
          EVENT<br>
          LOG.
        </h1>

      </div>

      ${
        state.event
          ? eventPanel()
          : `
            <div class="empty">
              No decision waiting.
              End the day to generate
              the next event.
            </div>
          `
      }

    </main>
  `;
}

/* =========================================================
   ACHIEVEMENTS
========================================================= */

function achievementsView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          PROGRESSION
        </div>

        <h1>
          PROVE<br>
          IT.
        </h1>

      </div>

      <div class="list">

        ${ACHIEVEMENTS.map(
          achievement => {

            const unlocked =
              state.achievements.includes(
                achievement[0]
              );

            return `
              <div
                class="item"
                style="
                  opacity:${unlocked ? 1 : .42}
                "
              >

                <div class="row">

                  <span class="item-title">
                    ${achievement[1]}
                  </span>

                  <span class="tiny">
                    ${
                      unlocked
                        ? "UNLOCKED"
                        : "LOCKED"
                    }
                  </span>

                </div>

              </div>
            `;
          }
        ).join("")}

      </div>

    </main>
  `;
}

/* =========================================================
   SETTINGS
========================================================= */

function settingsView() {

  return `
    <main class="shell">

      ${topBar()}

      <div class="hero">

        <div class="tiny">
          SYSTEM
        </div>

        <h1>
          CONTROL<br>
          ROOM.
        </h1>

      </div>

      <div class="list">

        <button
          class="item"
          onclick="saveState();toast('Saved locally.')"
        >
          <div class="item-title">
            SAVE NOW
          </div>

          <div class="item-meta">
            Save your current company.
          </div>
        </button>

        <button
          class="item"
          onclick="resetCompany()"
        >
          <div
            class="item-title"
            style="color:var(--danger)"
          >
            RESET COMPANY
          </div>

          <div class="item-meta">
            Permanently deletes the local save.
          </div>
        </button>

      </div>

    </main>
  `;
}

/* =========================================================
   CITY ACTION
========================================================= */

function moveDistrict(name) {

  if (name === state.district) {
    return;
  }

  const cost = 250;

  if (state.cash < cost) {
    toast("Not enough cash.");
    return;
  }

  state.cash -= cost;

  state.district = name;

  saveState();

  render();

  toast("District changed.");
}

/* =========================================================
   STAFF
========================================================= */

function hireEmployee() {

  const roles =
    Object.keys(STAFF_TYPES)
      .join(", ");

  const input =
    prompt(
      "Choose role:\n\n" + roles
    );

  if (!input) {
    return;
  }

  const role =
    input.trim().toUpperCase();

  const template =
    STAFF_TYPES[role];

  if (!template) {
    toast("Unknown role.");
    return;
  }

  if (state.cash < template.salary) {
    toast("Not enough cash.");
    return;
  }

  const employee = {

    name:
      template.name +
      " " +
      (state.staff.length + 1),

    role: template.name,

    salary: template.salary,

    efficiency: template.efficiency,

    experience: 1,

    morale: 90
  };

  state.staff.push(employee);

  saveState();

  checkAchievements();

  render();

  toast("Employee hired.");
}

function fireEmployee(index) {

  state.staff.splice(index, 1);

  saveState();

  render();

  toast("Employee released.");
}

/* =========================================================
   BUILDINGS
========================================================= */

function buyBuilding(type) {

  const building =
    BUILDINGS[type];

  if (!building) {
    return;
  }

  if (state.cash < building.price) {
    toast("Not enough cash.");
    return;
  }

  state.cash -= building.price;

  state.buildings.push({
    type,
    district: state.district
  });

  saveState();

  checkAchievements();

  render();

  toast("Location acquired.");
}

/* =========================================================
   MARKETING
========================================================= */

function launchMarketing(type) {

  const campaign =
    MARKETING[type];

  if (!campaign) {
    return;
  }

  if (state.cash < campaign.cost) {
    toast("Not enough cash.");
    return;
  }

  state.cash -= campaign.cost;

  state.marketing.push({
    type,
    days: campaign.days,
    effect: campaign.effect
  });

  if (type === "INFLUENCER") {
    state.flags.viral = true;
  }

  saveState();

  checkAchievements();

  render();

  toast("Campaign launched.");
}

/* =========================================================
   LOANS
========================================================= */

function takeLoan(amount) {

  if (state.loans.length >= 3) {
    toast("Maximum 3 active loans.");
    return;
  }

  const total =
    Math.round(amount * 1.05);

  state.cash += amount;

  state.loans.push({
    original: amount,
    remaining: total,
    days: 20
  });

  state.flags.hadLoan = true;

  saveState();

  checkAchievements();

  render();

  toast("Capital received.");
}

function payLoan(index) {

  const loan =
    state.loans[index];

  if (!loan) {
    return;
  }

  const payment =
    Math.min(
      loan.remaining,
      state.cash
    );

  if (payment <= 0) {
    toast("No cash available.");
    return;
  }

  state.cash -= payment;

  loan.remaining -= payment;

  if (loan.remaining <= 0) {
    state.loans.splice(index, 1);
  }

  saveState();

  checkAchievements();

  render();

  toast("Loan payment made.");
}

/* =========================================================
   EVENTS
========================================================= */

function generateEvent() {

  if (Math.random() > 0.55) {
    return null;
  }

  const source =
    EVENTS[
      Math.floor(
        Math.random() * EVENTS.length
      )
    ];

  return {
    title: source.title,
    text: source.text,
    choices: source.choices
  };
}

function chooseEvent(index) {

  if (!state.event) {
    return;
  }

  const choice =
    state.event.choices[index];

  if (!choice) {
    return;
  }

  applyEventEffect(
    choice.effect || {}
  );

  state.event = null;

  saveState();

  render();

  toast("Decision applied.");
}

function applyEventEffect(effect) {

  if (effect.cash) {
    state.cash += effect.cash;
  }

  if (effect.reputation) {
    state.reputation += effect.reputation;
  }

  if (effect.costRate) {
    state.modifiers.costRate += effect.costRate;
  }

  if (effect.marketing) {
    state.modifiers.marketing += effect.marketing;
  }

  if (effect.demand) {
    state.modifiers.demand += effect.demand;
  }

  if (effect.revenue) {
    state.modifiers.revenue += effect.revenue;
  }

  if (effect.rent) {
    state.modifiers.rent += effect.rent;
  }

  if (effect.traffic) {
    state.modifiers.traffic += effect.traffic;
  }

  if (effect.staffLoss && state.staff.length) {
    state.staff.pop();
  }

  if (effect.morale) {
    state.staff.forEach(
      employee => {
        employee.morale =
          clamp(
            employee.morale +
            effect.morale,
            0,
            100
          );
      }
    );
  }

  state.reputation =
    clamp(
      state.reputation,
      0,
      100
    );
}

/* =========================================================
   MARKET UPDATE
========================================================= */

function updateMarket() {

  Object.keys(INDUSTRIES)
    .forEach(industry => {

      const current =
        state.market[industry] || 0;

      const movement =
        Math.random() * 10 - 5;

      state.market[industry] =
        clamp(
          current * .7 + movement * .3,
          -30,
          30
        );

    });
}

/* =========================================================
   DAILY ECONOMY
========================================================= */

function endDay() {

  if (state.event) {
    toast("Resolve the event first.");
    return;
  }

  updateMarket();

  const industry =
    INDUSTRIES[state.industry];

  const district =
    DISTRICTS[state.district];

  /* STAFF */

  let staffMultiplier = 1;

  state.staff.forEach(employee => {

    staffMultiplier +=
      employee.efficiency *
      (employee.morale / 100);

  });

  /* BUILDINGS */

  let capacityMultiplier = 1;

  state.buildings.forEach(
    building => {

      capacityMultiplier *=
        BUILDINGS[
          building.type
        ].capacity;

    }
  );

  /* MARKETING */

  let marketingMultiplier =
    state.modifiers.marketing;

  state.marketing.forEach(
    campaign => {
      marketingMultiplier *=
        campaign.effect;
    }
  );

  /* MARKET */

  const marketTrend =
    state.market[state.industry] || 0;

  const trendMultiplier =
    1 + marketTrend / 100;

  /* REPUTATION */

  const reputationMultiplier =
    1 + state.reputation / 100;

  /* STRATEGY */

  let strategyMultiplier = 1;
  let priceMultiplier = 1;

  if (state.strategy === "premium") {
    priceMultiplier = 1.12;
    strategyMultiplier = 1.10;
  }

  if (state.strategy === "low-cost") {
    priceMultiplier = .92;
    strategyMultiplier = 1.08;
  }

  if (state.strategy === "innovative") {
    priceMultiplier = 1.05;
    strategyMultiplier = 1.12;
  }

  /* DEMAND */

  let demand =
    industry.demand *
    district.demand *
    district.traffic *
    district.traffic *
    staffMultiplier *
    capacityMultiplier *
    marketingMultiplier *
    trendMultiplier *
    reputationMultiplier *
    state.modifiers.demand *
    state.modifiers.traffic *
    strategyMultiplier;

  demand *=
    1 / (
      1 +
      district.competition * .08
    );

  const customers =
    Math.max(
      2,
      Math.round(demand)
    );

  /* PRICE */

  const price =
    industry.price *
    priceMultiplier;

  /* REVENUE */

  let revenue =
    customers *
    price *
    state.modifiers.revenue;

  /* COSTS */

  const productCost =
    revenue *
    (
      industry.cost +
      state.modifiers.costRate
    );

  const salaries =
    state.staff.reduce(
      (sum, employee) =>
        sum + employee.salary,
      0
    );

  const buildingRent =
    state.buildings.reduce(
      (sum, building) =>
        sum +
        BUILDINGS[
          building.type
        ].rent,
      0
    );

  const districtRent =
    district.rent *
    state.modifiers.rent;

  /* LOANS */

  let loanPayment = 0;

  state.loans.forEach(loan => {

    const dailyPayment =
      Math.min(
        loan.remaining,
        Math.ceil(
          loan.remaining /
          Math.max(
            1,
            loan.days
          )
        )
      );

    loan.remaining -=
      dailyPayment;

    loan.days--;

    loanPayment +=
      dailyPayment;

  });

  state.loans =
    state.loans.filter(
      loan =>
        loan.remaining > 0 &&
        loan.days > 0
    );

  /* TOTAL */

  const expenses =
    productCost +
    salaries +
    buildingRent +
    districtRent +
    loanPayment;

  const profit =
    revenue -
    expenses;

  /* STATE */

  state.cash += profit;

  state.reputation =
    clamp(
      state.reputation +
      (
        profit > 0
          ? .35
          : -.5
      ),
      0,
      100
    );

  state.totalCustomers +=
    customers;

  state.lifetimeRevenue +=
    revenue;

  state.lifetimeProfit +=
    profit;

  /* EMPLOYEE MORALE */

  state.staff.forEach(
    employee => {

      employee.experience += .01;

      employee.morale =
        clamp(
          employee.morale +
          (
            profit > 0
              ? 1
              : -3
          ),
          40,
          100
        );

    }
  );

  /* COMPANY VALUE */

  const assetValue =
    state.buildings.reduce(
      (sum, building) =>
        sum +
        BUILDINGS[
          building.type
        ].price * .7,
      0
    );

  state.companyValue =
    Math.max(
      0,

      state.cash +

      state.lifetimeProfit * .35 +

      state.reputation * 1000 +

      assetValue
    );

  /* HISTORY */

  state.history.push({

    day: state.day,

    revenue,
    expenses,
    profit,

    customers,

    cash: state.cash,

    companyValue:
      state.companyValue

  });

  /* MARKETING TIME */

  state.marketing.forEach(
    campaign => {
      campaign.days--;
    }
  );

  state.marketing =
    state.marketing.filter(
      campaign =>
        campaign.days > 0
    );

  /* RESET TEMP MODIFIERS */

  state.modifiers.costRate = 0;
  state.modifiers.marketing = 1;
  state.modifiers.demand = 1;
  state.modifiers.revenue = 1;
  state.modifiers.rent = 1;
  state.modifiers.traffic = 1;

  /* NEXT DAY */

  state.day++;

  /* EVENT */

  state.event =
    generateEvent();

  checkAchievements();

  saveState();

  render();

  toast(
    `DAY CLOSED · ${money(profit)}`
  );
}

/* =========================================================
   ACHIEVEMENTS
========================================================= */

function checkAchievements() {

  const checks = {

    FIRST_PROFIT:
      state.lifetimeProfit > 0,

    FIRST_EMPLOYEE:
      state.staff.length >= 1,

    "100_CUSTOMERS":
      state.totalCustomers >= 100,

    "100K_CASH":
      state.cash >= 100000,

    FIRST_LOCATION:
      state.buildings.length >= 1,

    "10_EMPLOYEES":
      state.staff.length >= 10,

    "1M_VALUE":
      state.companyValue >= 1000000,

    MARKET_LEADER:
      state.reputation >= 80,

    FIRST_LOAN:
      state.flags.hadLoan,

    DEBT_FREE:
      state.flags.hadLoan &&
      state.loans.length === 0,

    "100_DAYS":
      state.day >= 100,

    "10_LOCATIONS":
      state.buildings.length >= 10,

    "1M_REVENUE":
      state.lifetimeRevenue >= 1000000,

    VIRAL:
      state.flags.viral,

    EMPIRE:
      state.companyValue >= 5000000

  };

  Object.entries(checks)
    .forEach(([id, unlocked]) => {

      if (
        unlocked &&
        !state.achievements.includes(id)
      ) {

        state.achievements.push(id);

        toast(
          "ACHIEVEMENT: " +
          getAchievementName(id)
        );

      }

    });

  saveState();
}

function getAchievementName(id) {

  const item =
    ACHIEVEMENTS.find(
      achievement =>
        achievement[0] === id
    );

  return item
    ? item[1]
    : id;
}

/* =========================================================
   RESET
========================================================= */

function resetCompany() {

  const confirmed =
    confirm(
      "Reset this company? This cannot be undone."
    );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(
    SAVE_KEY
  );

  state =
    createEmptyState();

  currentScreen =
    "start";

  render();

  toast("Company reset.");
}

/* =========================================================
   PWA
========================================================= */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("./sw.js")
    .catch(error => {
      console.log(
        "Service worker error:",
        error
      );
    });

}

/* =========================================================
   GLOBALS
========================================================= */

window.navigate = navigate;
window.openOnboarding = openOnboarding;
window.createCompany = createCompany;
window.endDay = endDay;
window.moveDistrict = moveDistrict;
window.hireEmployee = hireEmployee;
window.fireEmployee = fireEmployee;
window.buyBuilding = buyBuilding;
window.launchMarketing = launchMarketing;
window.takeLoan = takeLoan;
window.payLoan = payLoan;
window.chooseEvent = chooseEvent;
window.resetCompany = resetCompany;

/* =========================================================
   INITIAL RENDER
========================================================= */

render();