/**
 * Import required modules and components
*/
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";
import { showFilterDropdown } from "../utils/filters.js";


    /**
     * Select elements from DOM
     */
    const filter = document.getElementById("dropdownFilter");
    const searchBarSection = document.getElementById("searchBarSection");
    const recipeSection = document.querySelector(".recipes-list");

    /**
     * Fetch all recipes and create RecipeFactory objects from them
     */
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

        // Add listener to the search bar
        searchBar.addEventListener("input", async () => {

            // Get all recipes
            let recipes = await getAllRecipes();
    
            console.log(recipes)
            // Sort all recipes by keyword, tags 
             recipes =  sortAll(recipes);

            displayAll(recipes)
            // Reset and display recipes cards
            //displayAllRecipes(recipes);
    
            // Display dropdown
            //displayDropdownIngredient(recipes);
        });
    };

    /**
     * Filter recipes based on search bar input
     */
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

    /**
     *  Filter recipes based on dropdown ingredient
     */
    const filterByDropdownIngredient = (recipes) => {
        const selectedTags = Array
        .from(document.querySelectorAll("#tagsFilter button"))
        .map(tagButton => tagButton.textContent.toLowerCase());
    
        if (selectedTags.length === 0) {
            return recipes;
        }
    
        return recipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            
            return selectedTags.every(tag => recipeIngredients.includes(tag));
        });
    };

    //function filter materiel

    //function filter ustensil

    /**
     * Function to sort all recipes by keywords and dropdown selection
     */
    const sortAll =  (recipes) => {

        recipes = sortByKeywords(recipes);
        recipes = filterByDropdownIngredient(recipes);
        //const filteredByKeywords = sortByKeywords(recipes);
        //const filteredByDropdownSelection = filterByDropdownIngredient(filteredByKeywords);
        //materiel
        //ustensil
        
        //return filteredByDropdownSelection;
        return recipes
    };


    /**
     * 
     */
    const displayAll = (recipes) => {
        displayAllRecipes(recipes)
        displayDropdownIngredient(recipes)
    }
    

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

        // 
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
    console.log('on display dropdown ingredient')
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getFilterIngredient();
    filter.appendChild(dropdown);

    const searchInput = document.getElementById("searchFilter");
    const dropdownContent = document.querySelector(".dropdown_content");
    
    dropdownContent.innerHTML = "";
    // remove duplicate tags from dropdown
    const uniqueIngredients = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            uniqueIngredients.add(ingredient.ingredient.toLowerCase());
        });
    });

    uniqueIngredients.forEach(ingredient => {
        dropdownContent.innerHTML += `<button>${ingredient}</button>`;
    });
    
    // Select button tag
    const buttons = document.querySelectorAll(".dropdown_content button");
    // For each button
    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            // Add button tags in section tags
            const newButton = document.createElement('button')
            newButton.textContent = event.target.textContent;
            document.querySelector("#tagsFilter").appendChild(newButton);
            
            // Relaunch all sort function
            const allRecipes = await getAllRecipes();
            const recipes = sortAll(allRecipes);
            displayAllRecipes(recipes);
            displayDropdownIngredient(recipes);  
        
            newButton.addEventListener('click', async () => {
                // Remove tag from tag section
                newButton.remove();
                const allRecipes = await getAllRecipes();
                const recipes =  sortAll(allRecipes);
                displayAllRecipes(recipes);
                displayDropdownIngredient(recipes);  
            });
        });
    });

    //dropdown materiel

    //dropdown ustensil

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
            });
        });
    });

    // Init svg
    const svg = document.querySelector(".svgIcon svg");
    svg.classList.add("svgDisable");
    // Add listeners on filters
    document.getElementById("selected").addEventListener("click", () => {
        showFilterDropdown()
    });

};

    /**
     * Init
     */
    const init = async () => {

        // Display search bar
        displaySearchBar();
    
        // Get all recipes
        let recipes = await getAllRecipes();
        //const allRecipesPromise = await getAllRecipes();
    
        // Sort all recipes by keyword, tags 
        recipes =  sortAll(recipes);
        //const recipes =  sortAll(allRecipesPromise);

        displayAll(recipes)

        // Reset and display recipes cards
        //displayAllRecipes(recipes);
    
        // Display dropdown
        //displayDropdownIngredient(recipes);
    };

    init();