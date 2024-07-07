const search=document.querySelector('#search');
const searchButton=document.querySelector('#search-button');
const recipeContainer= document.querySelector('.recipe-container');
const recipeCloseBtn= document.querySelector('.recipe-close-btn');
const recipeDetailsContent= document.querySelector('.recipe-details-content');

searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const name=search.value.trim();
    if(!name){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchApi(name)
})

const fetchApi=async (name)=>{
    recipeContainer.innerHTML=`<h2>Fetching Recipe...</h2>`
    try {
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const response=await data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv= document.createElement('div');
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}"/>
            <h2>${meal.strMeal}</h2>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belong to <span>${meal.strCategory}</span>  category</p>
        `
        const button=document.createElement('button');
        button.innerHTML="View Recipe";
        recipeContainer.appendChild(recipeDiv);
        recipeDiv.appendChild(button);

        button.addEventListener('click',()=>{
            openIngredient(meal);
        })
    });
    } catch (error) {
        recipeContainer.innerHTML="<h2>Error in Fetching Recipe...</h2>";    
    }
}

const openIngredient=(meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredient:</h3>
        <ul class="ingredientList">${fetchIngredient(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p >${meal.strInstructions}</p>
        </div>
    `
    
    recipeDetailsContent.parentElement.style.display='block';
}

const fetchIngredient=(meal)=>{
    let ingredienstList="";
    for(let i=1;i<=20;i++){
        const ingredient= meal[`strIngredient${i}`];
        if(ingredient){
            const measure= meal[`strMeasure${i}`];
            ingredienstList+=`<li>${measure}: ${ingredient}</li>`
        }   
        else{
            break;
        }

    }
    return ingredienstList;
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})