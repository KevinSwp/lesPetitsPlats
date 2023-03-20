/**
 * Properties recipe
 */
export default class Recipe {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._serving = data.serving;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
        this._ingredients = data.ingredients;
    }

    // get & set
    get id () {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get serving() {
        return this._serving;
    }

    set serving (value) {
        this._serving = value;
    }

    get time() {
        return this._time;
    }

    set time (value) {
        this._time = value;
    }

    get description() {
        return this._description;
    }

    set description (value) {
        this._description = value;
    }

    get appliance() {
        return this._appliance;
    }

    set appliance (value) {
        this._appliance = value;
    }

    get ustensils() {
        return this._ustensils;
    }

    set ustensils (value) {
        this._ustensils = value;
    }

    get ingredients() {
        return this._ingredients;
    }

    set ingredients (value) {
        this._ingredients = value;
    }
}
