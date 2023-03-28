/**
 * Import
 */
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";

/**
 * Select element from DOM
 */
const filter = document.getElementById("dropdown");
const searchBarSection = document.getElementById("searchBarSection");
const recipeSection = document.querySelector(".recipes-list");

/**
 * Display search bar
 */
const displayDropdown = () => {
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getDropdownFilter();
    filter.appendChild(dropdown);
};

/**
 * Display search bar
 */
const displaySearchBar = () => {
    const searchBarView = new IndexView();
    const searchBar = searchBarView.getSearchBar();
    searchBarSection.appendChild(searchBar);
};

/**
 * Display all recipes
 */
const displayRecipes = (recipes, searchText) => {
    recipes.forEach((recipeData) => {
        // Build recipe object from data
        const recipe = new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1);

        // Check if the recipe name or description includes the search text
        const recipeTitle = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
        const includesSearchText = recipeTitle.includes(searchText) || recipeDescription.includes(searchText);

        // If the recipe matches the search criteria, build and display the recipe card
        if (includesSearchText) {
            const recipeCardView = new IndexView(recipe);
            const recipeCard = recipeCardView.getRecipeCardIndex();
            recipeSection.appendChild(recipeCard);
        }
    });
};

/**
 * Init
 */
const init = () => {
    // Load recipes data
    fetch("data/recipes.json")
        .then((response) => response.json())
        .then((data) => {
            const { recipes } = data;

            // Display dropdown
            displayDropdown();

            // Display search bar
            displaySearchBar();

            // Display all recipes
            displayRecipes(recipes);



            // Filter recipes from search bar
            const searchInput = document.querySelector("#searchBarSection input");
            searchInput.addEventListener("input", () => {
                const searchText = searchInput.value.toLowerCase().trim();

                // Empty recipes section
                recipeSection.innerHTML = "";

                // Display filtered recipes
                displayRecipes(recipes, searchText);
            });
        })
        .catch((error) => {
            console.error(`Error fetching data: ${error}`);
            document.querySelector("#main").innerHTML = "Impossible d'afficher les recettes.";
        });
};

init();