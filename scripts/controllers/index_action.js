/**
 * Import object from file
 */
import RecipesCardIndex from "../views/RecipesView.js";

//Select element from DOM
const searchBarSection = document.querySelector(".searchBarSection");

/**
 * Function display search bar
 */
const displaySearchBar = (searchBarTemplate) => {
    // Get content from view
    const searchBar = searchBarTemplate.getSearchBar();
    // Add as child
    searchBarSection.appendChild(searchBar);
}

displaySearchBar();

/**
 * Initialize data of the index page
 */
// const init = () => {
//     // Fetch data json
//     fetch ("data/recipes.js")
//     // Makes response
//     .then((response) => response.json())
//     // Display property photographers
//     .then(
//         (data) => {
//             const {recipes} = data;
//             displaySearchBar(recipes);
//         }
//     )
//     // Catch error
//     .catch(
//         (error) => {
//             console.error(`Error fetching data : ${error}`);
//             document.querySelector(".photographer_section").innerHTML = "Impossible d'afficher les photographes";
//         }
//     )
// }

// // Call the function
// init();
    