// -----------------------------
// RECIPE DATA (Part 1)
// -----------------------------
const recipes = [
    { title: "Pasta Alfredo", difficulty: "easy", time: 20 },
    { title: "Chicken Curry", difficulty: "medium", time: 45 },
    { title: "Paneer Tikka", difficulty: "medium", time: 35 },
    { title: "Grilled Sandwich", difficulty: "easy", time: 10 },
    { title: "Biryani", difficulty: "hard", time: 60 },
    { title: "Maggi Masala", difficulty: "easy", time: 5 },
    { title: "Sushi Roll", difficulty: "hard", time: 50 },
    { title: "Fried Rice", difficulty: "easy", time: 25 }
];


// -----------------------------
// STATE VARIABLES
// -----------------------------
let currentFilter = "all";
let currentSort = "none";


// -----------------------------
// DOM REFERENCES
// -----------------------------
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortButtons = document.querySelectorAll(".sort-btn");


// -----------------------------
// PURE FILTER FUNCTIONS
// -----------------------------
const filterByDifficulty = (recipes, filter) => {
    if (filter === "all") return recipes;
    if (filter === "quick") return recipes.filter(r => r.time < 30);

    return recipes.filter(r => r.difficulty === filter);
};


// -----------------------------
// PURE SORT FUNCTIONS
// -----------------------------
const sortByName = (recipes) => {
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) => a.time - b.time);
};


// -----------------------------
// APPLY FILTER
// -----------------------------
const applyFilter = (recipes, filterType) => {
    return filterByDifficulty(recipes, filterType);
};


// -----------------------------
// APPLY SORT
// -----------------------------
const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes; // No sorting
    }
};


// -----------------------------
// RENDER FUNCTION
// -----------------------------
const renderRecipes = (recipesToShow) => {
    recipeContainer.innerHTML = "";

    recipesToShow.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Time:</strong> ${recipe.time} min</p>
        `;

        recipeContainer.appendChild(card);
    });
};


// -----------------------------
// UPDATE ACTIVE BUTTON UI
// -----------------------------
const updateButtonStates = () => {
    filterButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === currentFilter);
    });

    sortButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.sort === currentSort);
    });
};


// -----------------------------
// MAIN UPDATE FUNCTION
// -----------------------------
const updateDisplay = () => {
    let result = recipes;

    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);

    console.log(`Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);

    renderRecipes(result);
};


// -----------------------------
// EVENT LISTENERS
// -----------------------------
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        updateButtonStates();
        updateDisplay();
    });
});

sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentSort = btn.dataset.sort;
        updateButtonStates();
        updateDisplay();
    });
});


// -----------------------------
// INITIAL LOAD
// -----------------------------
updateDisplay();
updateButtonStates();
