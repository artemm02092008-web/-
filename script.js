// ===== ДАННЫЕ КУРСОВ =====
const coursesData = [
  {
    id: 1,
    title: "The Ultimate Google Ads Training Course",
    category: "marketing",
    price: "$100",
    author: "Jerome Bell",
    image: "image.png",
  },
  {
    id: 2,
    title: "Prduct Management Fundamentals",
    category: "management",
    price: "$480",
    author: "Marvin McKinney",
    image: "image1.png",
  },
  {
    id: 3,
    title: "HR Management and Analytics",
    category: "hr",
    price: "$200",
    author: "Leslie Alexander Li",
    image: "image2.png",
  },
  {
    id: 4,
    title: "Brand Management & PR Communications",
    category: "marketing",
    price: "$530",
    author: "Kristin Watson",
    image: "image4.png",
  },
  {
    id: 5,
    title: "Graphic Design Basic",
    category: "design",
    price: "$500",
    author: "Guy Hawkins",
    image: "image5.png",
  },
  {
    id: 6,
    title: "Business Development Management",
    category: "management",
    price: "$400",
    author: "Dianne Russell",
    image: "image6.png",
  },
  {
    id: 7,
    title: "Highload Software Architecture",
    category: "development",
    price: "$600",
    author: "Brooklyn Simmons",
    image: "image7.png",
  },
  {
    id: 8,
    title: "Human Resources – Selection and Recruitment",
    category: "hr",
    price: "$150",
    author: "Kathryn Murphy",
    image: "image8.png",
  },
  {
    id: 9,
    title: "User Experience. Human-centered Design",
    category: "design",
    price: "$240",
    author: "Cody Fisher",
    image: "image9.png",
  },
];

// ===== СОСТОЯНИЕ =====
let currentCategory = "all";
let currentSearch = "";

// ===== DOM ЭЛЕМЕНТЫ =====
const grid = document.getElementById("coursesGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filters__item");

// ===== КАТЕГОРИИ ДЛЯ ЦВЕТОВ =====
const categoryColors = {
  marketing: "marketing",
  management: "management",
  hr: "hr",
  design: "design",
  development: "development",
};

// ===== ОТРИСОВКА КАРТОЧЕК =====
function renderCourses() {
  const filtered = coursesData.filter((course) => {
    const matchCategory =
      currentCategory === "all" || course.category === currentCategory;
    const matchSearch = course.title
      .toLowerCase()
      .includes(currentSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
            <div class="courses__empty" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; font-size: 18px; color: #6b7280;">
                <span style="font-size: 60px; display: block; margin-bottom: 20px;">🔍</span>
                <p>Ничего не найдено</p>
                <p style="font-size: 14px; margin-top: 8px;">Попробуйте изменить запрос или фильтр</p>
            </div>
        `;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (course) => `
        <div class="course-card" data-id="${course.id}">
            <div class="course-card__image">
                <img src="${course.image}" alt="${
        course.title
      }" class="course-card__img" />
            </div>
            <div class="course-card__category course-card__category--${
              categoryColors[course.category]
            }">
                ${
                  course.category === "hr"
                    ? "HR & Recruiting"
                    : course.category.charAt(0).toUpperCase() +
                      course.category.slice(1)
                }
            </div>
            <h3 class="course-card__title">${course.title}</h3>
            <div class="course-card__footer">
                <span class="course-card__price">${course.price}</span>
                <span class="course-card__divider">|</span>
                <span class="course-card__author">by ${course.author}</span>
            </div>
        </div>
    `
    )
    .join("");
}

// ===== ОБНОВЛЕНИЕ СЧЕТЧИКОВ ФИЛЬТРОВ =====
function updateCounts() {
  const counts = {
    all: coursesData.length,
    marketing: 0,
    management: 0,
    hr: 0,
    design: 0,
    development: 0,
  };

  coursesData.forEach((course) => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });

  filterButtons.forEach((btn) => {
    const category = btn.dataset.category;
    const count = counts[category] || 0;
    const countSpan = btn.querySelector(".filters__count");
    if (countSpan) {
      countSpan.textContent = count;
    }
  });
}

// ===== ОБНОВЛЕНИЕ АКТИВНОГО ФИЛЬТРА =====
function updateActiveFilter(category) {
  filterButtons.forEach((btn) => {
    btn.classList.toggle(
      "filters__item--active",
      btn.dataset.category === category
    );
  });
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// Поиск
searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value.trim();
  renderCourses();
});

// Фильтры
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    currentCategory = category;
    updateActiveFilter(category);
    renderCourses();
  });
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
updateCounts();
renderCourses();
