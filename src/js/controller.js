import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //Loding Recipe
    await model.loadRecipe(id);

    //Rendering the Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1 Get Search Query
    const query = searchView.getQuery();

    if (!query) return;

    //2 Load Search Results
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    //3 Render Results
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchResults);
};
init();
