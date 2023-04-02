export default class IndexView {
    constructor(recipe) {
        this._recipe = recipe;
    }

    //Function content filter
    getFilter = () => {
        //Create div element in the DOM
        const div = document.createElement('div');
        div.classList.add("filter");
        //Fill the DOM
        div.innerHTML = `
            <div role="menu" class="dropdown">
                <button id="selected" class="btnDropdown">
                    <span id="selectedText">Ingredients</span>
                    <span class="svgIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                        </svg>
                    </span>
                </button>

                <div class="dropdown_content">
                    <button class="item">Coco</button>
                </div>
            </div>
        `;

        return div;
    }

    //Function content home page
    getSearchBar = () => {
        // Create article element in the DOM
        const div = document.createElement('div');
        // Fill the DOM
        div.innerHTML = `
            <form class="formSearchBar">
                <input class="searchInput" type="text" id="search" placeholder="Rechercher une recette">
                <svg class="magnifying_glass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </form>
        `;

        return div;
    }

    //Function content home page
    getRecipeCardIndex = () => {
        // Create article element in the DOM
        const div = document.createElement('div');
        div.classList.add("figureRecipe");
        /*// Fill the DOM
        if (this._recipe.ingredients[0].unit === undefined) {
            div.innerHTML = `
                <figure>
                    <img class="imageRecipe" src="../assets/images/recette.jpg">
                    <figcaption>
                        <h1 class="titleRecipe">${this._recipe.name}</h1>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[0].ingredient} :</p>
                            <p>${this._recipe.ingredients[0].quantity}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[1].ingredient}</p>
                            <p>${this._recipe.ingredients[1].quantity}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[2].ingredient} :</p>
                            <p>${this._recipe.ingredients[2].quantity}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[3].ingredient}</p>
                            <p>${this._recipe.ingredients[3].quantity}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[4].ingredient} :</p>
                            <p>${this._recipe.ingredients[4].quantity}</p>
                        </div>
                        <p class="description">${this._recipe.description}</p>
                    </figcaption>
                </figure>  
            `;
        }
        else {
            div.innerHTML = `
                <figure>
                    <img class="imageRecipe" src="../assets/images/recette.jpg">
                    <figcaption>
                        <h1 class="titleRecipe">${this._recipe.name}</h1>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[0].ingredient} :</p>
                            <p>${this._recipe.ingredients[0].quantity}</p>
                            <p>${this._recipe.ingredients[0].unit}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[1].ingredient}</p>
                            <p>${this._recipe.ingredients[1].quantity}</p>
                            <p>${this._recipe.ingredients[1].unit}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[2].ingredient} :</p>
                            <p>${this._recipe.ingredients[2].quantity}</p>
                            <p>${this._recipe.ingredients[2].unit}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[3].ingredient}</p>
                            <p>${this._recipe.ingredients[3].quantity}</p>
                            <p>${this._recipe.ingredients[3].unit}</p>
                        </div>
                        <div class="ingredient">
                            <p>${this._recipe.ingredients[4].ingredient} :</p>
                            <p>${this._recipe.ingredients[4].quantity}</p>
                            <p>${this._recipe.ingredients[4].unit}</p>
                        </div>
                        <p class="description">${this._recipe.description}</p>
                    </figcaption>
                </figure>  
            `;
        }*/
        // Fill the DOM
        if (this._recipe.ingredients[0].unit === undefined) {
            div.innerHTML = `
                <figure>
                    <img class="imageRecipe" src="../assets/images/recette.jpg">
                    <figcaption>
                        <div class="title_time">
                            <h1 class="titleRecipe">${this._recipe.name}</h1>
                            <p>${this._recipe.time} min</p>
                        </div>
                        <div class="ingredients_description">
                            <div>
                                <div class="ingredient">
                                    <p>${this._recipe.ingredients[0].ingredient}:</p>
                                    <p>${this._recipe.ingredients[0].quantity}</p>
                                </div>
                                <div class="ingredient">
                                    <p>${this._recipe.ingredients[1].ingredient}:</p>
                                </div>
                            </div>
                            <p class="description">${this._recipe.description}</p>
                        </div>
                    </figcaption>
                </figure>  
            `;
        }
        else {
            div.innerHTML = `
                <figure>
                    <img class="imageRecipe" src="../assets/images/recette.jpg">
                    <figcaption>
                        <div class="title_time">
                            <h1 class="titleRecipe">${this._recipe.name}</h1>
                            <p>${this._recipe.time} min</p>
                        </div>
                        <div class="ingredients_description">
                            <div>
                                <div class="ingredient">
                                    <p>${this._recipe.ingredients[0].ingredient}:</p>
                                    <p>${this._recipe.ingredients[0].quantity}</p>
                                    <p>${this._recipe.ingredients[0].unit}</p>
                                </div>
                                <div class="ingredient">
                                    <p>${this._recipe.ingredients[1].ingredient}:</p>
                                    <p>${this._recipe.ingredients[1].quantity}</p>
                                </div>
                            </div>
                            <p class="description">${this._recipe.description}</p>
                        </div>
                    </figcaption>
                </figure>  
            `;
        }
                    
        return div;
    }

    //get & set
    get recipe() {
        return this._recipe;
    }

    set recipe(value) {
        this._recipe = value;
    }
}