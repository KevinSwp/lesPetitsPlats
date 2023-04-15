/**
 * Hide/Display filter
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