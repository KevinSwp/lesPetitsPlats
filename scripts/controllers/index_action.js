/**
 * Import required modules and components
*/
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";
import { showFilterDropdown, showFilterDropdownAppliance, showFilterDropdownUstensil } from "../utils/filters.js";


    /**
     * Select elements from DOM
     */
    const filter = document.getElementById("dropdownFilter");
    const filterAppliance = document.getElementById("dropdownFilterAppliance")
    const filterUstensil = document.getElementById("dropdownFilterUstensil")
    const searchBarSection = document.getElementById("searchBarSection");
    const recipeSection = document.querySelector(".recipes-list");

    const listTagsIngredients = [];
    const listTagsAppliance = [];
    const listTagsUstensil = [];

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
    
            // Sort all recipes by keyword, tags 
             recipes =  sortAll(recipes);

            displayAll(recipes)
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
        const tagButtons = document.querySelectorAll("#tagsFilter button");
        const selectedTags = [];
    
        for (let i = 0; i < tagButtons.length; i++) {
            selectedTags.push(tagButtons[i].textContent.toLowerCase());
        }
    
        if (selectedTags.length === 0) {
            return recipes;
        }
    
        const filteredRecipes = [];
    
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeIngredients = [];
    
            for (let j = 0; j < recipe.ingredients.length; j++) {
                recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
            }
    
            let allTagsIncluded = true;
    
            for (let j = 0; j < selectedTags.length; j++) {
                if (!recipeIngredients.includes(selectedTags[j])) {
                    allTagsIncluded = false;
                    break;
                }
            }
    
            if (allTagsIncluded) {
                filteredRecipes.push(recipe);
            }
        }
    
        return filteredRecipes;
    };

    const filterByDropdownAppliance = (recipes) => {
        //
        const selectedAppliances = [];
        const applianceButtons = document.querySelectorAll("#tagsFilter button");
        
        for (let i = 0; i < applianceButtons.length; i++) {
            selectedAppliances.push(applianceButtons[i].textContent.toLowerCase());
        }
        
        if (selectedAppliances.length === 0) {
            return recipes;
        }
        
        return recipes.filter(recipe => {
            const recipeAppliance = recipe.appliance.toLowerCase();
            let isApplianceIncluded = false;
        
            for (let i = 0; i < selectedAppliances.length; i++) {
            if (selectedAppliances[i] === recipeAppliance) {
                isApplianceIncluded = true;
                break;
            }
            }
        
            return isApplianceIncluded;
        });
    };

    const filterByDropdownUstensil = (recipes) => {
        const ustensilButtons = document.querySelectorAll("#tagsFilter button");
        const selectedUstensil = [];
        
        for (let i = 0; i < ustensilButtons.length; i++) {
            selectedUstensil.push(ustensilButtons[i].textContent.toLowerCase());
        }
        
        if (selectedUstensil.length === 0) {
            return recipes;
        }
        
        return recipes.filter(recipe => {
            const recipeUstensil = recipe.appliance.toLowerCase();
            
            return selectedUstensil.includes(recipeUstensil);
        });
    };

    /**
     * Function to sort all recipes by keywords and dropdown selection
     */
    const sortAll =  (recipes) => {

        recipes = sortByKeywords(recipes);
        recipes = filterByDropdownIngredient(recipes);

        recipes = filterByDropdownAppliance(recipes);

        recipes = filterByDropdownUstensil(recipes);
        
        return recipes
    };


    /**
     * 
     */
    const displayAll = (recipes) => {
        displayAllRecipes(recipes)
        displayDropdownIngredient(recipes)
        displayDropdownAppliance(recipes)
        displayDropdownUstensil(recipes)
        
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

    // Display matching ingredient from the search bar
    searchInput.addEventListener("input", () => {

        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";

        const uniqueIngredientsArray = Array.from(uniqueIngredients);
        let filteredIngredients = [];

        for (let i = 0; i < uniqueIngredientsArray.length; i++) {
            if (uniqueIngredientsArray[i].includes(searchKeyword)) {
                filteredIngredients.push(uniqueIngredientsArray[i]);
            }
        }

        for (let i = 0; i < filteredIngredients.length; i++) {
            const ingredient = filteredIngredients[i];
            dropdownContent.innerHTML += `<button>${ingredient}</button>`;
        }

        const buttons = document.querySelectorAll(".dropdown_content button");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", (event) => {
                document.querySelector("#tagsFilter").appendChild(event.target);
            });
        }
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
 * Display dropdown appliance
*/
const displayDropdownAppliance = (recipes) => {
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getFilterAppliance();
    filterAppliance.appendChild(dropdown);

    const searchInput = document.getElementById("searchFilterAppliance");
    const dropdownContent = document.querySelector(".dropdown_contentAppliance");
    
    dropdownContent.innerHTML = "";
    // remove duplicate tags from dropdown
    const uniqueAppliances = new Set();
    recipes.forEach(recipe => {
        uniqueAppliances.add(recipe.appliance.toLowerCase());
    });

    uniqueAppliances.forEach(appliance => {
        dropdownContent.innerHTML += `<button>${appliance}</button>`;
    });
    
    // Select button tag
    const buttons = document.querySelectorAll(".dropdown_contentAppliance button");
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
            displayDropdownAppliance(recipes);
        
            newButton.addEventListener('click', async () => {
                // Remove tag from tag section
                newButton.remove();
                const allRecipes = await getAllRecipes();
                const recipes =  sortAll(allRecipes);
                displayAllRecipes(recipes);
                displayDropdownAppliance(recipes);  
            });
        });
    });

    // Display matching appliance from the search bar
    searchInput.addEventListener("input", () => {
        
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";
        
        const appliancesArray = Array.from(uniqueAppliances);
        let filteredAppliances = [];

        for (let i = 0; i < appliancesArray.length; i++) {
            if (appliancesArray[i].includes(searchKeyword)) {
                filteredAppliances.push(appliancesArray[i]);
            }
        }

        for (let i = 0; i < filteredAppliances.length; i++) {
            dropdownContent.innerHTML += `<button>${filteredAppliances[i]}</button>`;
        }

        const buttons = document.querySelectorAll(".dropdown_contentAppliance button");
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", (event) => {
                document.querySelector("#tagsFilter").appendChild(event.target);
            });
        }
    });

    // Init svg
    const svg = document.querySelector(".svgIconAppliance svg");
    svg.classList.add("svgDisable");
    // Add listeners on filters
    document.getElementById("selectedAppliance").addEventListener("click", () => {
        showFilterDropdownAppliance()
    });
};

/**
 * Display dropdown ustensil
*/
const displayDropdownUstensil = (recipes) => {
    const objectIndexView = new IndexView();
    const dropdown = objectIndexView.getFilterUstensil();
    filterUstensil.appendChild(dropdown);

    const searchInput = document.getElementById("searchFilterUstensil");
    const dropdownContent = document.querySelector(".dropdown_contentUstensil");

    dropdownContent.innerHTML = "";
    // remove duplicate tags from dropdown
    const uniqueUstensils = new Set();

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            if (ustensil) {
                uniqueUstensils.add(ustensil.toLowerCase());
            }
        });
    });

    uniqueUstensils.forEach(ustensil => {
        dropdownContent.innerHTML += `<button>${ustensil}</button>`;
    });

    // Select button tag
    const buttons = document.querySelectorAll(".dropdown_contentUstensil button");
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

            newButton.addEventListener('click', async () => {
                // Remove tag from tag section
                newButton.remove();
                const allRecipes = await getAllRecipes();
                const recipes = sortAll(allRecipes);
                displayAllRecipes(recipes);
            });
        });
    });

    // Display matching Ustensil from the search bar
    searchInput.addEventListener("input", () => {

        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";

        const uniqueUstensilsArray = Array.from(uniqueUstensils);
        const filteredUstensils = [];

        for (let i = 0; i < uniqueUstensilsArray.length; i++) {
            const ustensil = uniqueUstensilsArray[i];
            if (ustensil.toLowerCase().includes(searchKeyword)) {
                filteredUstensils.push(ustensil);
                dropdownContent.innerHTML += `<button>${ustensil}</button>`;
            }
        }

        const buttons = document.querySelectorAll(".dropdown_contentUstensil button");

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.addEventListener("click", (event) => {
                document.querySelector("#tagsFilter").appendChild(event.target);
            });
        }
    });

    // Init svg
    const svg = document.querySelector(".svgIconUstensil svg");
    svg.classList.add("svgDisable");
    // Add listeners on filters
    document.getElementById("selectedUstensil").addEventListener("click", () => {
        showFilterDropdownUstensil()
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
    
        // Sort all recipes by keyword, tags 
        recipes =  sortAll(recipes);

        displayAll(recipes)
    };

    init();