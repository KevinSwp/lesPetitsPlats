/**
 * Import
*/
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";
import { showFilterDropdown } from "../utils/filters.js";

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Select elements from DOM
     */
    const filter = document.getElementById("dropdownFilter");
    const searchBarSection = document.getElementById("searchBarSection");
    const recipeSection = document.querySelector(".recipes-list");

    const getAllRecipes = async () => {
        try {
            const response = await fetch("data/recipes.json");
            const data = await response.json();
            const { recipes } = data;
            const recipeObjects = recipes.map((recipeData) => new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1));

            return recipeObjects;
        }
        catch (error) {
            console.error(`Error fetching data: ${error}`);
            throw error;
        }
    };

    /**
     * Display search bar
     */
    const displaySearchBar = () => {
        const searchBarView = new IndexView();
        const searchBar = searchBarView.getSearchBar();
        searchBarSection.appendChild(searchBar);

        // On ajoute le listener sur la search bar
        searchBar.addEventListener("input", async () => {
            const allRecipes = await getAllRecipes();
            const recipes = sortAll(allRecipes);
            displayAllRecipes(recipes);
            // displayDropdownIngredient(recipes);
        });
    };

    const sortByKeywords = (recipes) => {
        // Filter recipes from search bar
        const searchInput = document.querySelector("#searchBarSection input");
        const searchText = searchInput.value.toLowerCase().trim();

        // Empty recipes section
        recipeSection.innerHTML = "";

        // Display filtered recipes
        const recipesOK = [];
        recipes.forEach((recipe) => {
            // Check if the recipe name or description includes the search text
            const recipeTitle = recipe.name.toLowerCase();
            const recipeDescription = recipe.description.toLowerCase();
            const includesSearchText = recipeTitle.includes(searchText) || recipeDescription.includes(searchText);

            // If the recipe matches the search criteria, build and display the recipe card
            if (includesSearchText) {
                const recipeCardView = new IndexView(recipe);
                const recipeCard = recipeCardView.getRecipeCardIndex();
                recipeSection.appendChild(recipeCard);
                recipesOK.push(recipe);
            }
        });

        return recipesOK;
    };

    const filterByDropdownSelection = (recipes) => {
        const selectedTags = Array.from(document.querySelectorAll("#tagsFilter button"))
            .map(tagButton => tagButton.textContent.toLowerCase());
    
        if (selectedTags.length === 0) {
            return recipes;
        }
    
        return recipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            return selectedTags.every(tag => recipeIngredients.includes(tag));
        });
    };

    const sortAll = async (recipesPromise) => {
        const recipes = await recipesPromise;
        const filteredByKeywords = sortByKeywords(recipes);
        const filteredByDropdownSelection = filterByDropdownSelection(filteredByKeywords);
        
        return filteredByDropdownSelection;
    };

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
        resetDisplayRecipes();

        recipes.forEach((recipe) => {
            // Build and display the recipe card
            const recipeCardView = new IndexView(recipe);
            const recipeCard = recipeCardView.getRecipeCardIndex();
            recipeSection.appendChild(recipeCard);
        });
    };

/**
 * Display dropdown
*/
const displayDropdownIngredient = (recipes) => {
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getFilter();
    filter.appendChild(dropdown);

    const searchInput = document.getElementById("searchFilter");
    const dropdownContent = document.querySelector(".dropdown_content");
    
    // On affiche une première fois tous le monde qui match
    dropdownContent.innerHTML = "";
    const uniqueIngredients = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            uniqueIngredients.add(ingredient.ingredient.toLowerCase());
        });
    });

    uniqueIngredients.forEach(ingredient => {
        dropdownContent.innerHTML += `<button>${ingredient}</button>`;
    });
    
    const buttons = document.querySelectorAll(".dropdown_content button");
    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            // On l'ajoute dans tagsFilter
            const newButton = document.createElement('button')
            newButton.textContent = event.target.textContent;
            document.querySelector("#tagsFilter").appendChild(newButton);
            
            // On relance toutes les fonctons de trie
            const allRecipes = await getAllRecipes();
            const recipes = await sortAll(allRecipes);
            displayAllRecipes(recipes);
            displayDropdownIngredient(recipes);  
        
            newButton.addEventListener('click', async () => {
                // On supprime le bouton de tagsFilter
                newButton.remove();
                const allRecipes = await getAllRecipes();
                const recipes = await sortAll(allRecipes);
                displayAllRecipes(recipes);
                displayDropdownIngredient(recipes);  
            });
        });
    });

    // Display matching ingredient from the search bar
    searchInput.addEventListener("input", () => {
        
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";
        
        const filteredIngredients = Array.from(uniqueIngredients).filter(ingredient => ingredient.includes(searchKeyword));
    
        filteredIngredients.forEach(ingredient => {
            dropdownContent.innerHTML += `<button>${ingredient}</button>`;
        });
    
        const buttons = document.querySelectorAll(".dropdown_content button");
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                document.querySelector("#tagsFilter").appendChild(event.target);
                // Faire pareil que au-dessus
            });
        });
    });

    // Init svg
    const svg = document.querySelector(".svgIcon svg");
    svg.classList.add("svgDisable");
    // Add listeners on filters
    document.getElementById("selected").addEventListener("click", showFilterDropdown);

};


    /**
     * Init
     */
    const init = async () => {
        // Display search bar
        displaySearchBar();
    
        // Get all recipes
        const allRecipesPromise = getAllRecipes();
    
        // Sort all recipes by keyword, tags 
        const recipes = await sortAll(allRecipesPromise);
    
        // Reset and display recipes cards
        displayAllRecipes(recipes);
    
        // Display dropdown
        displayDropdownIngredient(recipes);
    };

    init();
});