/**
 * Import
 */
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";

/**
 * Select element from DOM
 */
const searchBarSection = document.getElementById("searchBarSection");
const recipeSection = document.querySelector(".recipes-list");

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
const displayRecipes = (recipes) => {
    recipes.forEach((recipeData) => {
        // Build recipe object from data
        const recipe = new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1);

        // Build recipe card from object
        const recipeCardView = new IndexView(recipe);
        const recipeCard = recipeCardView.getRecipeCardIndex();

        // Add recipe card as child
        recipeSection.appendChild(recipeCard);
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

            // Display search bar
            displaySearchBar();

            // Display all recipes
            displayRecipes(recipes);

            // Filter recipes from search bar
            const searchInput = document.querySelector("#searchBarSection input");
            searchInput.addEventListener("input", () => {
                const searchText = searchInput.value.toLowerCase().trim();
                const filteredRecipes = recipes.filter((recipeData) => {
                    const recipe = new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1);
                    const recipeTitle = recipe.name.toLowerCase();
                    return recipeTitle.includes(searchText);
                });

                // Empty recipes section
                recipeSection.innerHTML = "";

                // Display filtered recipes
                displayRecipes(filteredRecipes);
            });
        })
        .catch((error) => {
            console.error(`Error fetching data: ${error}`);
            document.querySelector("#main").innerHTML = "Impossible d'afficher les recettes.";
        });
};

init();