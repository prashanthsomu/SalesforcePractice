import { LightningElement } from 'lwc';
import getRandomReceipe from '@salesforce/apex/receipeCls.getRandomReceipe';
import getReceipeByIngredient from '@salesforce/apex/receipeCls.getReceipeByIngredient';


export default class FetchUsingApi extends LightningElement {
 
    recipes = [];
    fetchRandomRecipe() {
        getRandomReceipe()
            .then((data) => {
                console.log('r1', data);
                console.log('r2',JSON.parse(data));
                this.recipes =
                    JSON.parse(data) && JSON.parse(data).recipes
                        ? JSON.parse(data).recipes
                        : [];
                console.log('r3',this.recipes);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchRecipesByIngredients() {
        const ingredients = this.template.querySelector(".ingredient-input").value;
        getReceipeByIngredient({ ingredients })
            .then((data) => {
                this.recipes = JSON.parse(data);
                console.log(this.recipes);
            })
            .catch((error) => {
                console.error(error);
            });
    }

}