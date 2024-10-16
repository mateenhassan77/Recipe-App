const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchRecipes  = async (query) => {
    
    recipeContainer.innerHTML = "<h2>Fetching  Recipes...</h2>";

    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML =`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to<span>${meal.strCategory}</span></p>
        `
const button = document.createElement('button');
button.textContent = 'View Recipe';
recipeDiv.appendChild(button);



button.addEventListener('click', () => {
    openRecipePopup(meal);


});



        recipeContainer.appendChild(recipeDiv);
    })
    }
    catch(error) {
        recipeContainer.innerHTML = "<h2>Error in fatching recipes</h2>"
    }
}
const fetchIngredients =(meal) =>{
    let IngredientsList= "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${ingredient} - ${measure}</li>`
        }
        else{
            break;
        }
    }
    return IngredientsList;

}
const openRecipePopup =(meal)=>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions: </h3>
    <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>
    `


    recipeDetailsContent.parentElement.style.display = "block";


}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";

})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
       recipeContainer.innerHTML = `<h2>type the meal in search box</h2>`;
       return;
    }
    fetchRecipes(searchInput);
    
});
