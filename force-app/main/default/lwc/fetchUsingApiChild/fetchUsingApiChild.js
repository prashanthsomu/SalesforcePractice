import { LightningElement, api } from 'lwc';
import getReceipe from '@salesforce/apex/receipeCls.getReceipe';

export default class FetchUsingApiChild extends LightningElement {

  @api image;
  @api title;
  @api price;
  @api time;
  @api summary;
  @api recipeId;
  @api
  set dishTypes(data) {
    this.dishList = data && data.join();
  }
  get dishTypes() {
    return this.dishList;
  }
  @api
  set diets(data) {
    this.dietList = data && data.join();
  }
  get diets() {
    return this.dietList;
  }
  dishList;
  dietList;

  fetchRecipe() {
    getReceipe({ receipeId: this.recipeId })
        .then((data) => {
          console.log('buttondata',data);
            const recipe = JSON.parse(data);
            console.log('buttondata2',recipe);
        if (recipe) {
            this.image = recipe.image;
            this.price = recipe.pricePerServing;
            this.time = recipe.readyInMinutes;
            this.summary = recipe.summary;
            this.dishList = recipe.dishTypes && recipe.dishTypes.join();
            console.log('dt', recipe.dishTypes);
            console.log('dtj',recipe.dishTypes.join());
            this.dietList = recipe.diets && recipe.diets.join();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  get hasDetails() {
    return this.summary ? true : false;
  }

}