const closeAllDropdowns = () => {
    // Fermer le dropdown des ingrédients
    const ingredientDropdown = document.querySelector(".dropdown_content");
    ingredientDropdown.style.display = "none";
    document.querySelector(".formSearchBarFilter").style.display = "none";
    document.getElementById("selected").classList.remove("selectedActive");
    document.querySelector(".svgIcon svg").classList.remove("svgEnable");
    document.querySelector(".svgIcon svg").classList.add("svgDisable");

    // Fermer le dropdown des appareils
    const applianceDropdown = document.querySelector(".dropdown_contentAppliance");
    applianceDropdown.style.display = "none";
    document.querySelector(".formSearchBarFilterAppliance").style.display = "none";
    document.getElementById("selectedAppliance").classList.remove("selectedActive");
    document.querySelector(".svgIconAppliance svg").classList.remove("svgEnable");
    document.querySelector(".svgIconAppliance svg").classList.add("svgDisable");

    // Fermer le dropdown des ustensiles
    const ustensilDropdown = document.querySelector(".dropdown_contentUstensil");
    ustensilDropdown.style.display = "none";
    document.querySelector(".formSearchBarFilterUstensil").style.display = "none";
    document.getElementById("selectedUstensil").classList.remove("selectedActive");
    document.querySelector(".svgIconUstensil svg").classList.remove("svgEnable");
    document.querySelector(".svgIconUstensil svg").classList.add("svgDisable");
};

const openIngredientDropdown = () => {
    const selected = document.getElementById("selected");
    const svg = document.querySelector(".svgIcon svg");
    const option = document.querySelector(".dropdown_content");
    const dropdownPB = document.querySelector(".dropdown")
    const formSearchBarFilter = document.querySelector(".formSearchBarFilter");

    if (option.style.display != "block") {
        option.style.display = "block";
        dropdownPB.classList.add("dropdownPaddingBorder")
        formSearchBarFilter.style.display = "block";
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    } else {
        option.style.display = "none";
        dropdownPB.classList.remove("dropdownPaddingBorder")
        formSearchBarFilter.style.display = "none";
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
};

const openApplianceDropdown = () => {
    const selected = document.getElementById("selectedAppliance");
    const svg = document.querySelector(".svgIconAppliance svg");
    const option = document.querySelector(".dropdown_contentAppliance");
    const dropdownPB = document.querySelector(".dropdownAppliance");
    const formSearchBarFilter = document.querySelector(".formSearchBarFilterAppliance");

    if (option.style.display != "block") {
        option.style.display = "block";
        dropdownPB.classList.add("dropdownPaddingBorder")
        formSearchBarFilter.style.display = "block";
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    } else {
        option.style.display = "none";
        dropdownPB.classList.remove("dropdownPaddingBorder");
        formSearchBarFilter.style.display = "none";
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
};

const openUstensilDropdown = () => {
    const selected = document.getElementById("selectedUstensil");
    const svg = document.querySelector(".svgIconUstensil svg");
    const option = document.querySelector(".dropdown_contentUstensil");
    const dropdownPB = document.querySelector(".dropdownUstensil");
    const formSearchBarFilter = document.querySelector(".formSearchBarFilterUstensil");

    if (option.style.display != "block") {
        option.style.display = "block";
        dropdownPB.classList.add("dropdownPaddingBorder");
        formSearchBarFilter.style.display = "block";
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    } else {
        option.style.display = "none";
        dropdownPB.classList.remove("dropdownPaddingBorder");
        formSearchBarFilter.style.display = "none";
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
};

/**
 * Hide/Display filter ingredient
*/
export const showFilterDropdown = () => {
    closeAllDropdowns("ingredient");
    openIngredientDropdown();
};

/**
 * Hide/Display filter appliance
*/
export const showFilterDropdownAppliance = () => {
    closeAllDropdowns("appliance");
    openApplianceDropdown();
};

/**
 * Hide/Display filter ustensil
*/
export const showFilterDropdownUstensil = () => {
    closeAllDropdowns("ustensil");
    openUstensilDropdown();
};