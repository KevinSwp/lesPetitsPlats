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

// Array tags
let selectIngredientsTags = [];

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
 * Display dropdown
 */
const displayDropdown = () => {
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getFilter();
    filter.appendChild(dropdown);

    // Init svg
    const svg = document.querySelector(".svgIcon svg");
    svg.classList.add("svgDisable");
    // Add listeners on filters
    document.getElementById("selected").addEventListener("click", showFilterDropdown);
};

const getRecipes = () => {

    //  1- fetch
    // 2- Convertie en objet avec la factory

    return recipes
}

/**
 * On trie la liste des recipes et retourne uniquement les recettes qui matches
 */
const sortAll = (recipes) => {

    // 1èere fonction : trie en fonction des mots clés
    const L1 = sortByKeywords(recipes)
    const L2 = sortByIngredientsTags(L1)   
    const L3 = sortByUstensilsTags(L2)   
    const L4 = sortByMaterielsTags(L3)   
 
    // On a toutes les recettes qui matchent avec tous les filtres
    return L4
}

const sortByIngredientsTags = (recipes) => {

    // On récupère les tags sélectionné depuis selectIngredientsTags 

    return recipes
}

/**
 * Mise à jour de l'affichage 
 */
const updateDisplayRecipes = (recipes) => {
    resetDisplayRecipes()
    displayNewRecipes(recipes)
}

const sortByKeywords = (recipes) => {
    // Filter recipes from search bar
    const searchInput = document.querySelector("#searchBarSection input");
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase().trim();

        // Empty recipes section
        resetDisplayRecipes();

        // Display filtered recipes
        displaySearchRecipes(recipes, searchText);

        // 1- Fetch des recettes
        // 2- SortAll
        // 3- Affiches

        //const recipes = getRecipes()
        //const recipesSorted = sortAll(recipes)
        //updateDisplayRecipes(recipesSorted);
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

            // Display dropdown
            displayDropdown();
            // Display search bar
            displaySearchBar();
            // Display all recipes
            displayAllRecipes(recipes);
            sortByKeywords(recipes);

            
            //const recipes = getRecipes()
            // updateDisplayRecipes(recipes);
        })
        .catch((error) => {
            console.error(`Error fetching data: ${error}`);
            document.querySelector("#main").innerHTML = "Impossible d'afficher les recettes.";
        });
};

init();