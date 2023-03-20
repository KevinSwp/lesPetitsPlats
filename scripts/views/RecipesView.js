export default class RecipesCardIndex {
    constructor(recipe) {
        this._recipe = recipe;
    }

    //Function content home page
    getSearchBar = () => {
        // Create article element in the DOM
        const div = document.createElement('div');
        // Fill the DOM
        div.innerHTML = `
            <form action="#" method="get">
                <label for="search">Recherche:</label>
                <input type="text" id="search" name="q">
                <button type="submit">Rechercher</button>
            </form>
        `;

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