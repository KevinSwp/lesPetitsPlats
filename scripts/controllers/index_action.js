/**
 * Import
 */
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";
import { showFilterDropdown } from "../utils/filters.js";

/**
 * Select element from DOM
 */
const filter = document.getElementById("dropdownFilter");
const searchBarSection = document.getElementById("searchBarSection");
const recipeSection = document.querySelector(".recipes-list");

/**
 * Reset la liste des recettes
 */
const resetDisplayRecipes = () => {
    recipeSection.innerHTML = "";
}

/**
 * Display all recipes
 */
const displayAllRecipes = (recipes) => {
    recipes.forEach((recipeData) => {
        // Build recipe object from data
        const recipe = new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1);
        // Build and display the recipe card
        const recipeCardView = new IndexView(recipe);
        const recipeCard = recipeCardView.getRecipeCardIndex();
        recipeSection.appendChild(recipeCard);
    });
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
 * Display recipes that match the search criteria
 */
const displaySearchRecipes = (recipes, searchText) => {

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
 * Delete tag on click
 */
const deleteTags = () => {
    document.querySelectorAll("#tagsFilter button").forEach((button) => {
      button.addEventListener("click", (event) => {
        button.parentNode.removeChild(button);
        // document.querySelector(".dropdown_content").appendChild(event.target);
      });
    });
  };

/**
 * Display dropdown
*/
const displayDropdown = (recipes) => {
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getFilter();
    filter.appendChild(dropdown);

    const searchInput = document.getElementById("searchFilter");
    const dropdownContent = document.querySelector(".dropdown_content");
    
    searchInput.addEventListener("input", () => {
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";
        recipes.forEach(recipeData => {
            const recipe = new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1);
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase().includes(searchKeyword)) {
                    dropdownContent.innerHTML += `<button>${ingredient.ingredient}</button>`;
                } else {
                    dropdownContent.innerHTML += `<button>${ingredient.ingredient}</button>`;
                }
            });
        });
        const buttons = document.querySelectorAll(".dropdown_content button");
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                document.querySelector("#tagsFilter").appendChild(event.target);
            });
        });
    });

    // Init svg
    const svg = document.querySelector(".svgIcon svg");
    svg.classList.add("svgDisable");
    // Add listeners on filters
    document.getElementById("selected").addEventListener("click", showFilterDropdown);

};

const sortByKeywords = (recipes) => {
    // Filter recipes from search bar
    const searchInput = document.querySelector("#searchBarSection input");
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase().trim();

        // Empty recipes section
        resetDisplayRecipes();

        // Display filtered recipes
        displaySearchRecipes(recipes, searchText);
    });
}

/**
 * Init
 */
const init = () => {
    // Load recipes data
    fetch("data/recipes.json")
        .then((response) => response.json())
        .then((data) => {
            const { recipes } = data;

            // Delete tags
            deleteTags();
            // Display dropdown
            displayDropdown(recipes);
            // Display search bar
            displaySearchBar();
            // Display all recipes
            displayAllRecipes(recipes);
            sortByKeywords(recipes);

        })
        .catch((error) => {
            console.error(`Error fetching data: ${error}`);
            document.querySelector("#main").innerHTML = "Impossible d'afficher les recettes.";
        });
};

init();