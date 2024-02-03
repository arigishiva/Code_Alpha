const recipes = [
    { name: "Tandoori chicken wraps", ingredients: "chicken,tortillas,salt,ginger paste,garlic paste,", instructions: "1.Make a spice mixture. 2. marinate the meet. 3.fry the chicken pieces. 4.Prepare the wrap and relish." },
    { name: "Bajra masala khichdi", ingredients: "pearl millet,potato,ghee,clove,turmeric,curry leaves", instructions: "1.Boil bajra and potatoes. 2.Saute all the whole spices.3.Add boiled potatoes and bajra to the kadhai.4.Serve with curd and ghee." }
];

// Function to display recipes
function displayRecipes() {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Function to save a new or edited recipe
function saveRecipe() {
    const nameInput = document.getElementById("recipe-name");
    const ingredientsInput = document.getElementById("ingredients");
    const instructionsInput = document.getElementById("instructions");

    const recipe = {
        name: nameInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value
    };

    recipes.push(recipe);
    displayRecipes();
    clearForm();
}

// Function to edit a recipe
function editRecipe(index) {
    const recipe = recipes[index];

    const nameInput = document.getElementById("recipe-name");
    const ingredientsInput = document.getElementById("ingredients");
    const instructionsInput = document.getElementById("instructions");

    nameInput.value = recipe.name;
    ingredientsInput.value = recipe.ingredients;
    instructionsInput.value = recipe.instructions;

    // Remove the edited recipe from the array
    recipes.splice(index, 1);

    displayRecipes();
}

// Function to delete a recipe
function deleteRecipe(index) {
    recipes.splice(index, 1);
    displayRecipes();
}

// Function to clear the form after saving or editing a recipe
function clearForm() {
    document.getElementById("recipe-form").reset();
}

// Initial display of recipes
displayRecipes();