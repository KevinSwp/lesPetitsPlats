/**
 * Hide/Display filter ingredient
*/
export const showFilterDropdown = () => {
    const selected = document.getElementById("selected");
    const svg = document.querySelector(".svgIcon svg");
    const option = document.querySelector(".dropdown_content");
    const formSearchBarFilter = document.querySelector(".formSearchBarFilter");

    if (option.style.display != "block") {
        // Open dropdown
        option.style.display = "block";
        formSearchBarFilter.style.display = "block"; // Ajout de cette ligne
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    } else {
        option.style.display = "none";
        formSearchBarFilter.style.display = "none"; // Ajout de cette ligne
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
};

/**
 * Hide/Display filter appliance
*/
export const showFilterDropdownAppliance = () => {
    const selected = document.getElementById("selectedAppliance");
    const svg = document.querySelector(".svgIconAppliance svg");
    const option = document.querySelector(".dropdown_contentAppliance");
    const formSearchBarFilter = document.querySelector(".formSearchBarFilterAppliance");

    if (option.style.display != "block") {
        // Open dropdown
        option.style.display = "block";
        formSearchBarFilter.style.display = "block"; // Ajout de cette ligne
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    } else {
        option.style.display = "none";
        formSearchBarFilter.style.display = "none"; // Ajout de cette ligne
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
};

/**
 * Hide/Display filter ustensil
*/
export const showFilterDropdownUstensil = () => {
    const selected = document.getElementById("selectedUstensil");
    const svg = document.querySelector(".svgIconUstensil svg");
    const option = document.querySelector(".dropdown_contentUstensil");
    const formSearchBarFilter = document.querySelector(".formSearchBarFilterUstensil");

    if (option.style.display != "block") {
        // Open dropdown
        option.style.display = "block";
        formSearchBarFilter.style.display = "block"; // Ajout de cette ligne
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    } else {
        option.style.display = "none";
        formSearchBarFilter.style.display = "none"; // Ajout de cette ligne
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
};