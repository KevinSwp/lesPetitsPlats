export default class IndexView {
    constructor(recipe) {
        this._recipe = recipe;
    }

    /**
     * Function content filter
     */
    getFilterIngredient = () => {
        //Create div element in the DOM
        const div = document.createElement('div');
        div.classList.add("filter");
        //Fill the DOM
        div.innerHTML = `
            <div role="menu" class="dropdown">
                <button id="selected" class="btnDropdown">
                    <span id="selectedText">Ingredients</span>
                    <span class="svgIconBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                        </svg>
                    </span>
                </button>

                <div>
                    <form class="formSearchBarFilter">
                        <div class="blocInput">
                            <input class="searchInputFilter" type="text" id="searchFilter" placeholder="Rechercher un ingredient">
                            <button type="button" class="btnCloseFromInput">
                                <span class="svgIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                                        <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                    <div class="dropdown_content"></div>
                </div>
            </div>
        `;

        return div;
    }

    getFilterAppliance = () => {
        //Create div element in the DOM
        const div = document.createElement('div');
        div.classList.add("filter");
        //Fill the DOM
        div.innerHTML = `
            <div role="menu" class="dropdownAppliance">
                <button id="selectedAppliance" class="btnDropdownAppliance">
                    <span id="selectedTextAppliance">Appareils</span>
                    <span class="svgIconApplianceBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                        </svg>
                    </span>
                </button>
    
                <div>
                    <form class="formSearchBarFilterAppliance">
                        <div class="blocInputAppliance">
                            <input class="searchInputFilterAppliance" type="text" id="searchFilterAppliance" placeholder="Rechercher un appareil">
                            <button type="button" class="btnCloseFromInputAppliance">
                                <span class="svgIconAppliance">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                                        <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                    <div class="dropdown_contentAppliance"></div>
                </div>
            </div>
        `;

        return div;
    }

    getFilterUstensil = () => {
        //Create div element in the DOM
        const div = document.createElement('div');
        div.classList.add("filter");
        //Fill the DOM
        div.innerHTML = `
            <div role="menu" class="dropdownUstensil">
                <button id="selectedUstensil" class="btnDropdownUstensil">
                    <span id="selectedTextUstensil">Ustensiles</span>
                    <span class="svgIconUstensilBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                        </svg>
                    </span>
                </button>
    
                <div>
                    <form class="formSearchBarFilterUstensil">
                        <div class="blocInputUstensil">
                            <input class="searchInputFilterUstensil" type="text" id="searchFilterUstensil" placeholder="Rechercher un ustensil">
                            <button type="button" class="btnCloseFromInputUstensil">
                                <span class="svgIconUstensil">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                    
                                        <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>    
                    </form>
                    <div class="dropdown_contentUstensil"></div>
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

        let content = `
            <figure>
                <img class="imageRecipe" src="../assets/images/recette.jpg" alt="">
                <figcaption>
                    <div class="title_time">
                        <h1 class="titleRecipe">${this._recipe.name}</h1>
                        <p class="timer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                            </svg>
                            ${this._recipe.time} min
                        </p>
                    </div>
                    <div class="ingredients_description">
                        <div>`
                            for (let i = 0; i < this._recipe.ingredients.length; i++) {
                                content += `
                                    <div className="ingredient">
                                        <p>
                                            <span><strong>${this._recipe.ingredients[i].ingredient}</strong> :</span>
                                            `

                                            if (this._recipe.ingredients[i].quantity) {
                                                content += `<span>${this._recipe.ingredients[i].quantity} </span>`
                                            }
                                            if (this._recipe.ingredients[i].unit) {
                                                content += `<span>${this._recipe.ingredients[i].unit} </span>`
                                            }

                                        content += `</p>
                                    </div>
                                `;
                            }

                            const maxLength = 300;
                            let myText = ''

                            if (this._recipe.description.length > maxLength){
                                myText = this._recipe.description.substring(0, maxLength).concat('...');
                            }

                            else {
                                myText = this._recipe.description
                            }
                            /*// Version 2
                            this._recipe.description.length > maxLength ?
                                    myText = this._recipe.description.substring(0, maxLength).concat('...') :
                                    myText = this._recipe.description*/

                            content += `</div>

                        <p class="description">${myText}</p>
                    </div>
                </figcaption>
            </figure>
        `;

        div.innerHTML = content;

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