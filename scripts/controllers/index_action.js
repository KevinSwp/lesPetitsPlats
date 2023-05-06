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
    const applianceButtons = document.querySelectorAll("#tagsFilterAppliance button");

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
    const ustensilButtons = document.querySelectorAll("#tagsFilterUstensil button");
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
        const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

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

    recipes.forEach((recipe) => {
        // Build and display the recipe card
        const recipeCardView = new IndexView(recipe);
        const recipeCard = recipeCardView.getRecipeCardIndex();
        recipeSection.appendChild(recipeCard);
    });
};

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
    if (!document.querySelector(".dropdown_content")) {
        const objectIndexView = new IndexView();
        const dropdown = objectIndexView.getFilterIngredient();
        filter.appendChild(dropdown);
    }

    const searchInput = document.getElementById("searchFilter");
    const dropdownContent = document.querySelector(".dropdown_content");

    dropdownContent.innerHTML = "";

    const uniqueIngredients = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            uniqueIngredients.add(ingredient.ingredient.toLowerCase());
        });
    });

    const addButtonClickListeners = (buttons) => {
        buttons.forEach(button => {
            button.addEventListener("click", async (event) => {
                // Vérifier si le bouton existe déjà dans la section de tags
                const existingButton = document.querySelector(`#tagsFilter [data-ingredient="${event.target.textContent.toLowerCase()}"]`);
                if (existingButton) {
                    // Ne pas ajouter le bouton s'il existe déjà
                    return;
                }
    
                const buttonSvgDiv = document.createElement('div');
                buttonSvgDiv.id = `buttonSVG`;
                // Ajouter un attribut data-ingredient pour faciliter la recherche
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
    
                buttonSvgDiv.addEventListener("click", async () => {
                    buttonSvgDiv.remove();
                    const allRecipes = await getAllRecipes();
                    const recipes = sortAll(allRecipes);
                    displayAll(recipes);
                });
            });
        });
    };

    uniqueIngredients.forEach(ingredient => {
        dropdownContent.innerHTML += `<button>${ingredient}</button>`;
    });

    const buttons = document.querySelectorAll(".dropdown_content button");
    addButtonClickListeners(buttons);

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
    if (!document.querySelector(".dropdown_contentAppliance")) {
        const objectIndexView = new IndexView();
        const dropdown = objectIndexView.getFilterAppliance();
        filterAppliance.appendChild(dropdown);
    }

    const searchInput = document.getElementById("searchFilterAppliance");
    const dropdownContent = document.querySelector(".dropdown_contentAppliance");

    dropdownContent.innerHTML = "";

    const uniqueAppliances = new Set();
    recipes.forEach(recipe => {
        uniqueAppliances.add(recipe.appliance.toLowerCase());
    });

    const addButtonClickListeners = (buttons) => {
        buttons.forEach(button => {
            button.addEventListener("click", async (event) => {
                // Vérifier si le bouton existe déjà dans la section de tags
                const existingButton = document.querySelector(`#tagsFilterAppliance [data-appliance="${event.target.textContent.toLowerCase()}"]`);
                if (existingButton) {
                    // Ne pas ajouter le bouton s'il existe déjà
                    return;
                }
    
                const buttonSvgDiv = document.createElement('div');
                buttonSvgDiv.id = `buttonSVGAppliance`;
                // Ajouter un attribut data-appliance pour faciliter la recherche
                buttonSvgDiv.setAttribute('data-appliance', event.target.textContent.toLowerCase());
    
                const newButton = document.createElement('button');
                newButton.textContent = event.target.textContent;
                buttonSvgDiv.appendChild(newButton);
    
                const svgElement = createSvgElement();
                buttonSvgDiv.appendChild(svgElement);
    
                document.querySelector("#tagsFilterAppliance").appendChild(buttonSvgDiv);
    
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

    uniqueAppliances.forEach(appliance => {
        dropdownContent.innerHTML += `<button>${appliance}</button>`;
    });

    const buttons = document.querySelectorAll(".dropdown_contentAppliance button");
    addButtonClickListeners(buttons);

    searchInput.addEventListener("input", () => {
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";

        const uniqueAppliancesArray = Array.from(uniqueAppliances);
        let filteredAppliances = [];

        for (let i = 0; i < uniqueAppliancesArray.length; i++) {
            if (uniqueAppliancesArray[i].includes(searchKeyword)) {
                filteredAppliances.push(uniqueAppliancesArray[i]);
            }
        }

        for (let i = 0; i < filteredAppliances.length; i++) {
            const appliance = filteredAppliances[i];
            dropdownContent.innerHTML += `<button>${appliance}</button>`;
        }

        const filteredButtons = document.querySelectorAll(".dropdown_contentAppliance button");
        addButtonClickListeners(filteredButtons);
    });

    const svg = document.querySelector(".svgIconAppliance svg");
    svg.classList.add("svgDisable");

    document.getElementById("selectedAppliance").addEventListener("click", () => {
        showFilterDropdownAppliance()
    });
};

/**
 * Display dropdown ustensil
*/
const displayDropdownUstensil = (recipes) => {
    if (!document.querySelector(".dropdown_contentUstensil")) {
        const objectIndexView = new IndexView();
        const dropdown = objectIndexView.getFilterUstensil();
        filterUstensil.appendChild(dropdown);
    }

    const searchInput = document.getElementById("searchFilterUstensil");
    const dropdownContent = document.querySelector(".dropdown_contentUstensil");

    dropdownContent.innerHTML = "";

    const uniqueUstensils = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            if (ustensil) {
                uniqueUstensils.add(ustensil.toLowerCase());
            }
        });
    });

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

    uniqueUstensils.forEach(ustensil => {
        dropdownContent.innerHTML += `<button>${ustensil}</button>`;
    });

    const buttons = document.querySelectorAll(".dropdown_contentUstensil button");
    addButtonClickListeners(buttons);

    searchInput.addEventListener("input", () => {
        const searchKeyword = searchInput.value.toLowerCase();
        dropdownContent.innerHTML = "";

        const uniqueUstensilsArray = Array.from(uniqueUstensils);
        let filteredUstensils = [];

        for (let i = 0; i < uniqueUstensilsArray.length; i++) {
            if (uniqueUstensilsArray[i].includes(searchKeyword)) {
                filteredUstensils.push(uniqueUstensilsArray[i]);
            }
        }

        for (let i = 0; i < filteredUstensils.length; i++) {
            const ustensil = filteredUstensils[i];
            dropdownContent.innerHTML += `<button>${ustensil}</button>`;
        }

        const filteredButtons = document.querySelectorAll(".dropdown_contentUstensil button");
        addButtonClickListeners(filteredButtons);
    });

    const svg = document.querySelector(".svgIconUstensil svg");
    svg.classList.add("svgDisable");

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