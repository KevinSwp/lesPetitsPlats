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
    // Select all the buttons inside the "tagsFilter" element
    const tagButtons = document.querySelectorAll("#tagsFilter button");
    // Initialize an array to store the selected tags (ingredients)
    const selectedTags = [];

    // Iterate over the buttons and store their text content in lowercase
    for (let i = 0; i < tagButtons.length; i++) {
        selectedTags.push(tagButtons[i].textContent.toLowerCase());
    }

    // If there are no selected tags, return the original recipes array
    if (selectedTags.length === 0) {
        return recipes;
    }

    // Initialize an array to store the filtered recipes
    const filteredRecipes = [];

    // Iterate over the recipes array
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        // Initialize an array to store the recipe ingredients in lowercase
        const recipeIngredients = [];

        // Iterate over the ingredients and store them in lowercase
        for (let j = 0; j < recipe.ingredients.length; j++) {
            recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
        }

        // Assume all selected tags are included in the recipe ingredients
        let allTagsIncluded = true;

        // Check if all selected tags are included in the recipe ingredients
        for (let j = 0; j < selectedTags.length; j++) {
            if (!recipeIngredients.includes(selectedTags[j])) {
                allTagsIncluded = false;
                break;
            }
        }

        // If all selected tags are included, add the recipe to the filtered recipes array
        if (allTagsIncluded) {
            filteredRecipes.push(recipe);
        }
    }

    // Return the filtered recipes array
    return filteredRecipes;
};

/**
 *  Filter recipes based on dropdown appliance
 */  
const filterByDropdownAppliance = (recipes) => {
    // Create an empty array to store the selected appliances
    const selectedAppliances = [];
    // Get all the appliance filter buttons from the DOM
    const applianceButtons = document.querySelectorAll("#tagsFilter button");

    // Iterate through the appliance filter buttons and store the text content in lowercase
    for (let i = 0; i < applianceButtons.length; i++) {
        selectedAppliances.push(applianceButtons[i].textContent.toLowerCase());
    }

    // If no appliances are selected, return the original recipes array
    if (selectedAppliances.length === 0) {
        return recipes;
    }

    // Filter the recipes based on the selected appliances
    return recipes.filter(recipe => {
        const recipeAppliance = recipe.appliance.toLowerCase();
        let isApplianceIncluded = false;

        // Check if the current recipe appliance is in the selected appliances list
        for (let i = 0; i < selectedAppliances.length; i++) {
            if (selectedAppliances[i] === recipeAppliance) {
                isApplianceIncluded = true;
                break;
            }
        }

        return isApplianceIncluded;
    });
};

/**
 *  Filter recipes based on dropdown ustensil
 */
const filterByDropdownUstensil = (recipes) => {
    // Get all the utensil filter buttons from the DOM
    const ustensilButtons = document.querySelectorAll("#tagsFilter button");
    // Create an empty array to store the selected utensils
    const selectedUstensil = [];

    // Iterate through the utensil filter buttons and store the text content in lowercase
    for (let i = 0; i < ustensilButtons.length; i++) {
        selectedUstensil.push(ustensilButtons[i].textContent.toLowerCase());
    }

    // If no utensils are selected, return the original recipes array
    if (selectedUstensil.length === 0) {
        return recipes;
    }

    // Filter the recipes based on the selected utensils
    return recipes.filter(recipe => {
        const recipeUstensil = recipe.appliance.toLowerCase();

        // Check if the current recipe utensil is in the selected utensils list
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
 * Display all element
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

    // Reset recipe
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

        // Get the search keyword from searchInput and convert it to lowercase
        const searchKeyword = searchInput.value.toLowerCase();
        // Clear the dropdownContent innerHTML
        dropdownContent.innerHTML = "";
    
        // Create a uniqueIngredientsArray from the uniqueIngredients set
        const uniqueIngredientsArray = Array.from(uniqueIngredients);
        // Initialize an empty array for filtered ingredients
        let filteredIngredients = [];
    
        // Loop through the uniqueIngredientsArray
        for (let i = 0; i < uniqueIngredientsArray.length; i++) {
            // If the current ingredient includes the search keyword, add it to filteredIngredients
            if (uniqueIngredientsArray[i].includes(searchKeyword)) {
                filteredIngredients.push(uniqueIngredientsArray[i]);
            }
        }
    
        // Loop through the filteredIngredients array
        for (let i = 0; i < filteredIngredients.length; i++) {
            // Get the current ingredient
            const ingredient = filteredIngredients[i];
            // Append a button element with the current ingredient to the dropdownContent innerHTML
            dropdownContent.innerHTML += `<button>${ingredient}</button>`;
        }
    
        // Get all button elements within the dropdown_content class
        const buttons = document.querySelectorAll(".dropdown_content button");
    
        // Loop through the buttons
        for (let i = 0; i < buttons.length; i++) {
            // Add a click event listener to each button
            buttons[i].addEventListener("click", (event) => {
                // When a button is clicked, append it to the #tagsFilter element
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
    
        // Convert the value of the search input to lowercase and store it in searchKeyword
        const searchKeyword = searchInput.value.toLowerCase();
        
        // Clear the innerHTML of the dropdownContent element
        dropdownContent.innerHTML = "";
        
        // Create an array from the uniqueAppliances set and store it in appliancesArray
        const appliancesArray = Array.from(uniqueAppliances);
        
        // Initialize an empty array to store filtered appliances
        let filteredAppliances = [];
    
        // Iterate through the appliancesArray and filter appliances based on the searchKeyword
        for (let i = 0; i < appliancesArray.length; i++) {
            if (appliancesArray[i].includes(searchKeyword)) {
                filteredAppliances.push(appliancesArray[i]);
            }
        }
    
        // Iterate through the filteredAppliances array and create a button for each appliance in the dropdownContent
        for (let i = 0; i < filteredAppliances.length; i++) {
            dropdownContent.innerHTML += `<button>${filteredAppliances[i]}</button>`;
        }
    
        // Select all buttons within the dropdown_contentAppliance element and store them in the buttons variable
        const buttons = document.querySelectorAll(".dropdown_contentAppliance button");
        
        // Attach a click event listener to each button that appends the clicked button to the tagsFilter element
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

        // Get the search keyword from the input field and convert it to lowercase
        const searchKeyword = searchInput.value.toLowerCase();
        
        // Clear the inner HTML of the dropdown content
        dropdownContent.innerHTML = "";
    
        // Create an array from the uniqueUstensils set
        const uniqueUstensilsArray = Array.from(uniqueUstensils);
        const filteredUstensils = [];
    
        // Iterate through the uniqueUstensilsArray
        for (let i = 0; i < uniqueUstensilsArray.length; i++) {
            const ustensil = uniqueUstensilsArray[i];
            
            // Check if the ustensil name includes the search keyword
            if (ustensil.toLowerCase().includes(searchKeyword)) {
                
                // Add the ustensil to the filteredUstensils array
                filteredUstensils.push(ustensil);
                
                // Add a button with the ustensil name to the dropdown content
                dropdownContent.innerHTML += `<button>${ustensil}</button>`;
            }
        }
    
        // Select all buttons inside the dropdown content
        const buttons = document.querySelectorAll(".dropdown_contentUstensil button");
    
        // Iterate through the buttons
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            
            // Add a click event listener to each button
            button.addEventListener("click", (event) => {
                
                // Append the clicked button to the tagsFilter element
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