/**
 * Hide/Display filter
*/
export const showFilterDropdown = () => {
    const selected = document.getElementById("selected");
    const svg = document.querySelector(".svgIcon svg");
    const option = document.querySelector(".dropdown_content");

    if (option.style.display != "block") {
        // Open dropdown
        option.style.display = "block";
        selected.classList.add("selectedActive");
        svg.classList.add("svgEnable");
        svg.classList.remove("svgDisable");
    }
    
    else {
        option.style.display = "none";
        selected.classList.remove("selectedActive");
        svg.classList.add("svgDisable");
        svg.classList.remove("svgEnable");
    }
}

/**
 * Hide filter
 */
const hideFilterDropdown = () => {
    const selected = document.getElementById("selected");
    const svg = document.querySelector(".svgIcon svg");
    const option = document.querySelector(".dropdown_content");
    option.style.display = "none";
    selected.classList.remove("selectedActive");
    svg.classList.add("svgDisable");
}