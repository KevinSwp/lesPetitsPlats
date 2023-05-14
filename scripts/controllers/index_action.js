/**
 * Import required modules and components
*/
import RecipeFactory from "../factories/RecipeFactory.js";
import { RECIPE_TYPES } from "../factories/RecipeFactory.js";
import IndexView from "../views/index_view.js";
import { showFilterDropdown, showFilterDropdownAppliance, showFilterDropdownUstensil, closeAllDropdowns } from "../utils/filters.js";


/**
 * Select elements from DOM
 */
const filter = document.getElementById("dropdownFilter");
const filterAppliance = document.getElementById("dropdownFilterAppliance")
const filterUstensil = document.getElementById("dropdownFilterUstensil")
const searchBarSection = document.getElementById("searchBarSection");
const recipeSection = document.querySelector(".recipes-list");

/**
 * Fetch all recipes and create RecipeFactory objects from them
 */
const getAllRecipes = async () => {

    try {
        // Fetch the data from the "recipes.json" file
        const response = await fetch("data/recipes.json");
        // Extract the JSON data from the response
        const data = await response.json();
        // Get the "recipes" array from the JSON data
        const { recipes } = data;
        // Create an array of recipe objects using the map method
        const recipeObjects = recipes.map((recipeData) => {
          // Create a new recipe object using the RecipeFactory and return it
          return new RecipeFactory(recipeData, RECIPE_TYPES.JSON_V1);
        });
        // Return the array of recipe objects
        return recipeObjects;
      }
    
    // Catch any errors that occur during the data fetching or processing
    catch (error) {
        // Log the error to the console
        console.error(`Error fetching data: ${error}`);
        // Throw the error to be handled by the calling function
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
    const recipesOK = recipes.map(recipe => {
        // Check if the recipe name or description includes the search text
        const recipeTitle = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
        const includesSearchText = recipeTitle.includes(searchText) || recipeDescription.includes(searchText);

        // If the recipe matches the search criteria, build and display the recipe card
        if (includesSearchText) {
            const recipeCardView = new IndexView(recipe);
            const recipeCard = recipeCardView.getRecipeCardIndex();
            recipeSection.appendChild(recipeCard);
            return recipe;
        }
    })
    .filter(recipe => recipe !== undefined);

    return recipesOK;
};

/**
 *  Filter recipes based on dropdown ingredient
 */
const filterByDropdownIngredient = (recipes) => {
    // Select all the buttons inside the "tagsFilter" element
    const tagButtons = document.querySelectorAll("#tagsFilter button");

    // Create an array of lowercase text content of the tag buttons
    const selectedTags = Array.from(tagButtons).map(button => button.textContent.toLowerCase());

    // If there are no selected tags, return the original recipes array
    if (selectedTags.length === 0) {
        return recipes;
    }

    // Filter the recipes array based on selected tags
    const filteredRecipes = recipes.filter(recipe => {
        // Create an array of lowercase recipe ingredients
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
      
        // Check if all selected tags are included in the recipe ingredients
        return selectedTags.every(tag => recipeIngredients.includes(tag));
    });

    // Return the filtered recipes array
    return filteredRecipes;
};

/**
 *  Filter recipes based on dropdown appliance
 */  
const filterByDropdownAppliance = (recipes) => {
    // Get all the appliance filter buttons from the DOM and convert the NodeList to an array
    const applianceButtons = Array.from(document.querySelectorAll("#tagsFilterAppliance button"));

    // Create an array of the selected appliance names in lowercase using the map method
    const selectedAppliances = applianceButtons.map(button => button.textContent.toLowerCase());

    // If no appliances are selected, return the original recipes array
    if (selectedAppliances.length === 0) {
        return recipes;
    }

    // Filter the recipes based on the selected appliances using the map method
    return recipes.filter(recipe => {
        const recipeAppliance = recipe.appliance.toLowerCase();

        // Check if the current recipe appliance is in the selected appliances list using the map method
        const isApplianceIncluded = selectedAppliances.some(selectedAppliance => selectedAppliance === recipeAppliance);

        return isApplianceIncluded;
    });
};

/**
 *  Filter recipes based on dropdown ustensil
 */
const filterByDropdownUstensil = (recipes) => {
    // Get all the utensil filter buttons from the DOM
    const ustensilButtons = document.querySelectorAll("#tagsFilterUstensil button");

    // Create an array of selected utensils using the map method
    const selectedUstensil = Array.from(ustensilButtons).map(button => button.textContent.toLowerCase());

    // If no utensils are selected, return the original recipes array
    if (selectedUstensil.length === 0) {
        return recipes;
    }

    // Filter the recipes based on the selected utensils
    return recipes.filter(recipe => {
        // Create an array of recipe utensils in lowercase using the map method
        const recipeUstensils = recipe.ustensils.map(utensil => utensil.toLowerCase());

        // Check if any of the selected utensils is in the recipe utensils list
        return selectedUstensil.some(ustensil => recipeUstensils.includes(ustensil));
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

    recipes.map(recipe => {
        // Build and display the recipe card
        const recipeCardView = new IndexView(recipe);
        const recipeCard = recipeCardView.getRecipeCardIndex();
        recipeSection.appendChild(recipeCard);
    });
};

/**
 * Create SVG element
 */
const createSvgElement = () => {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("viewBox", "0 0 512 512");
    
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("d", "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z");
    svgElement.appendChild(pathElement);

    return svgElement;
}

/**
 * Display dropdown
*/
const displayDropdownIngredient = (recipes) => {
    // Check if dropdown content doesn't already exist
    if (!document.querySelector(".dropdown_content")) {
        const objectIndexView = new IndexView();
        const dropdown = objectIndexView.getFilterIngredient();
        filter.appendChild(dropdown);
    }

    const searchInput = document.getElementById("searchFilter");
    const dropdownContent = document.querySelector(".dropdown_content");

    // Reset dropdown content
    dropdownContent.innerHTML = "";

    // Create a Set to store unique ingredients found in the recipes
    const uniqueIngredients = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            uniqueIngredients.add(ingredient.ingredient.toLowerCase());
        });
    });

    // Add click listeners to the dropdown buttons
    const addButtonClickListeners = (buttons) => {
        buttons.forEach((button) => {
            button.addEventListener("click", async (event) => {
                // Check if the button already exists in the tags section
                const existingButton = document.querySelector(`#tagsFilter [data-ingredient="${event.target.textContent.toLowerCase()}"]`);
                if (existingButton) {
                    // Don't add the button if it already exists
                    return;
                }
        
                // Create a new button with an SVG element
                const buttonSvgDiv = document.createElement('div');
                buttonSvgDiv.id = `buttonSVG`;
                // Add attribut to make easier the research
                buttonSvgDiv.setAttribute('data-ingredient', event.target.textContent.toLowerCase());
        
                const newButton = document.createElement('button');
                newButton.textContent = event.target.textContent;
                buttonSvgDiv.appendChild(newButton);
        
                const svgElement = createSvgElement();
                buttonSvgDiv.appendChild(svgElement);
        
                document.querySelector("#tagsFilter").appendChild(buttonSvgDiv);
        
                const allRecipes = await getAllRecipes();
                const recipes = sortAll(allRecipes);
                displayAll(recipes);
        
                // Reset input search bar
                searchInput.value = "";
        
                // Add a click listener to the new button to remove it from the tags section
                buttonSvgDiv.addEventListener("click", async () => {
                    buttonSvgDiv.remove();
                    const allRecipes = await getAllRecipes();
                    const recipes = sortAll(allRecipes);
                    displayAll(recipes);
                });
            });
        });
    };

    // Add buttons for each unique ingredient to the dropdown content
    uniqueIngredients.forEach(ingredient => {
        dropdownContent.innerHTML += `<button>${ingredient}</button>`;
    });

    // Add click listeners to the dropdown buttons
    const buttons = document.querySelectorAll(".dropdown_content button");
    addButtonClickListeners(buttons);

    // Add an event listener to the search input to filter the dropdown content based on the input
    searchInput.addEventListener("input", () => {
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";

        // Create an array from the Set of unique ingredients and filter it based on the search input
        const uniqueIngredientsArray = Array.from(uniqueIngredients);
        let filteredIngredients = [];

        // Loop through the filteredIngredients array and create a button for each ingredient
        uniqueIngredientsArray.forEach(ingredient => {
            if (ingredient.includes(searchKeyword)) {
                filteredIngredients.push(ingredient);
            }
        });

        // Select all buttons in the dropdown_content div and add click listeners to each one
        filteredIngredients.forEach(ingredient => {
            dropdownContent.innerHTML += `<button>${ingredient}</button>`;
        });

        const filteredButtons = document.querySelectorAll(".dropdown_content button");
        addButtonClickListeners(filteredButtons);
    });

    const svg = document.querySelector(".svgIcon svg");
    svg.classList.add("svgDisable");

    document.getElementById("selected").addEventListener("click", () => {
        showFilterDropdown()
    });
};

/**
 * Display dropdown appliance
*/
const displayDropdownAppliance = (recipes) => {
    // Check if the dropdown content already exists, if not create it
    if (!document.querySelector(".dropdown_contentAppliance")) {
        const objectIndexView = new IndexView();
        const dropdown = objectIndexView.getFilterAppliance();
        filterAppliance.appendChild(dropdown);
    }

    // Get the search input and the dropdown content
    const searchInput = document.getElementById("searchFilterAppliance");
    const dropdownContent = document.querySelector(".dropdown_contentAppliance");

    // Empty the dropdown content
    dropdownContent.innerHTML = "";

    // Create a set to store the unique appliance values
    const uniqueAppliances = new Set();

    // Loop through the recipes and add their appliances to the set
    recipes.forEach(recipe => {
        uniqueAppliances.add(recipe.appliance.toLowerCase());
    });

    // Function to add click listeners to the dropdown buttons
    const addButtonClickListeners = (buttons) => {
        buttons.forEach((button, i) => {

            // Add a click listener to the button
            button.addEventListener("click", async (event) => {

                // Check if the button already exists in the tags section
                const existingButton = document.querySelector(`#tagsFilterAppliance [data-appliance="${event.target.textContent.toLowerCase()}"]`);

                // If the button already exists, do not add it again
                if (existingButton) {
                    return;
                }

                // Create a new div for the button and add a data-appliance attribute for easy search
                const buttonSvgDiv = document.createElement('div');
                buttonSvgDiv.id = `buttonSVGAppliance`;
                buttonSvgDiv.setAttribute('data-appliance', event.target.textContent.toLowerCase());

                // Create a new button element and add it to the div
                const newButton = document.createElement('button');
                newButton.textContent = event.target.textContent;
                buttonSvgDiv.appendChild(newButton);

                // Create a new SVG element and add it to the div
                const svgElement = createSvgElement();
                buttonSvgDiv.appendChild(svgElement);

                // Add the button div to the tags section
                document.querySelector("#tagsFilterAppliance").appendChild(buttonSvgDiv);

                // Get all the recipes and sort them
                const allRecipes = await getAllRecipes();
                const recipes = sortAll(allRecipes);

                // Display all the recipes and reset the input search bar
                displayAll(recipes);
                searchInput.value = "";

                // Add a click listener to the button div to remove it and display all the recipes
                buttonSvgDiv.addEventListener("click", async () => {
                    buttonSvgDiv.remove();
                    const allRecipes = await getAllRecipes();
                    const recipes = sortAll(allRecipes);
                    displayAll(recipes);
                });
            });
        });
    };

    // Loop through the unique appliances and add a button for each one in the dropdown content
    uniqueAppliances.forEach(appliance => {
        dropdownContent.innerHTML += `<button>${appliance}</button>`;
    });

    // Get all the buttons inside the dropdown_contentAppliance
    const buttons = document.querySelectorAll(".dropdown_contentAppliance button");
    // Add click event listeners to the buttons
    addButtonClickListeners(buttons);

    // Listen for input changes on the searchInput field
    searchInput.addEventListener("input", () => {
        // Get the search keyword and convert it to lowercase
        const searchKeyword = searchInput.value.toLowerCase();
        // Clear the dropdown content
        dropdownContent.innerHTML = "";

        // Convert the uniqueAppliances set to an array
        const uniqueAppliancesArray = Array.from(uniqueAppliances);
        // Initialize an array to store the filtered appliances
        let filteredAppliances = [];

        // Loop through the uniqueAppliancesArray and filter based on the search keyword
        uniqueAppliancesArray.forEach(appliance => {
            if (appliance.includes(searchKeyword)) {
                filteredAppliances.push(appliance);
            }
        });

        // Loop through the filteredAppliances array and create buttons for each appliance
        filteredAppliances.forEach(appliance => {
            dropdownContent.innerHTML += `<button>${appliance}</button>`;
        });

        // Get all the buttons inside the filtered dropdown content and add click event listeners
        const filteredButtons = document.querySelectorAll(".dropdown_contentAppliance button");
        addButtonClickListeners(filteredButtons);
    });
    
    // Get the SVG element inside the svgIconAppliance container and add the "svgDisable" class
    const svg = document.querySelector(".svgIconAppliance svg");
    svg.classList.add("svgDisable");

    // Add a click event listener to the element with the ID "selectedAppliance" to show the filter dropdown
    document.getElementById("selectedAppliance").addEventListener("click", () => {
        showFilterDropdownAppliance()
    });
};
        

/**
 * Display dropdown ustensil
*/
const displayDropdownUstensil = (recipes) => {
    // Check if dropdown menu is not already created
    if (!document.querySelector(".dropdown_contentUstensil")) {
        const objectIndexView = new IndexView();
        const dropdown = objectIndexView.getFilterUstensil();
        filterUstensil.appendChild(dropdown);
    }

    const searchInput = document.getElementById("searchFilterUstensil");
    const dropdownContent = document.querySelector(".dropdown_contentUstensil");

    // Reset
    dropdownContent.innerHTML = "";

    const uniqueUstensils = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            if (ustensil) {
                uniqueUstensils.add(ustensil.toLowerCase());
            }
        });
    });

    // Function to add click listeners to buttons
    const addButtonClickListeners = (buttons) => {
        buttons.forEach(button => {
            button.addEventListener("click", async (event) => {
                // Vérifier si le bouton existe déjà dans la section de tags
                const existingButton = document.querySelector(`#tagsFilterUstensil [data-ustensil="${event.target.textContent.toLowerCase()}"]`);
                if (existingButton) {
                    // Ne pas ajouter le bouton s'il existe déjà
                    return;
                }
    
                const buttonSvgDiv = document.createElement('div');
                buttonSvgDiv.id = `buttonSVGUstensil`;
                // Ajouter un attribut data-ustensil pour faciliter la recherche
                buttonSvgDiv.setAttribute('data-ustensil', event.target.textContent.toLowerCase());
    
                const newButton = document.createElement('button');
                newButton.textContent = event.target.textContent;
                buttonSvgDiv.appendChild(newButton);
    
                const svgElement = createSvgElement();
                buttonSvgDiv.appendChild(svgElement);
    
                document.querySelector("#tagsFilterUstensil").appendChild(buttonSvgDiv);
    
                const allRecipes = await getAllRecipes();
                const recipes = sortAll(allRecipes);
                displayAll(recipes);
    
                // Reset input search bar
                searchInput.value = "";
    
                buttonSvgDiv.addEventListener("click", async () => {
                    buttonSvgDiv.remove();
                    const allRecipes = await getAllRecipes();
                    const recipes = sortAll(allRecipes);
                    displayAll(recipes);
                });
            });
        });
    };

    // Add the unique utensils as buttons to the dropdown menu
    uniqueUstensils.forEach(ustensil => {
        dropdownContent.innerHTML += `<button>${ustensil}</button>`;
    });

    const buttons = document.querySelectorAll(".dropdown_contentUstensil button");
    addButtonClickListeners(buttons);

    // Filter the dropdown menu based on the input search
    searchInput.addEventListener("input", () => {
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";

        const uniqueUstensilsArray = Array.from(uniqueUstensils);
        let filteredUstensils = [];

        uniqueUstensilsArray.forEach(ustensil => {
            if (ustensil.includes(searchKeyword)) {
                filteredUstensils.push(ustensil);
            }
        });

        filteredUstensils.forEach(ustensil => {
            dropdownContent.innerHTML += `<button>${ustensil}</button>`;
        });

        const filteredButtons = document.querySelectorAll(".dropdown_contentUstensil button");
        addButtonClickListeners(filteredButtons);
    });

    const svg = document.querySelector(".svgIconUstensil svg");
    svg.classList.add("svgDisable");

    document.getElementById("selectedUstensil").addEventListener("click", () => {
        showFilterDropdownUstensil()
    });
};

// Close current dropdown
const btnCloseFromCurrentInputWithDropdown = () => {
    const closeButton = document.querySelector(".btnCloseFromInput");
    closeButton.addEventListener("click", () => {
        closeAllDropdowns();
    });

    const closeButtonAppliance = document.querySelector(".btnCloseFromInputAppliance");
    closeButtonAppliance.addEventListener("click", () => {
        closeAllDropdowns();
    });

    const closeButtonUstensil = document.querySelector(".btnCloseFromInputUstensil");
    closeButtonUstensil.addEventListener("click", () => {
        closeAllDropdowns();
    });
}

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

    btnCloseFromCurrentInputWithDropdown();
};

init();