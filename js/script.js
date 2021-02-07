// search click
const button = document.getElementById('search');
button.addEventListener('click', () => {
    const customInput = document.getElementById('customInput');
    const row = document.getElementById('row');

    //data API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${customInput.value}`)
        .then(res => res.json())
        .then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-3 mt-4 data-parent-div" dataid="${meal.idMeal}">
                        <div class="bg-info card text-center rounded-3">
                            <img src="${meal.strMealThumb}" data-id="${meal.idMeal}" class="card-img-top" >
                            <div class="card-body p-3" data-id="${meal.idMeal}">
                                <h3 class="card-text text-center fs-5"  data-id="${meal.idMeal}" >${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                        `;
                });
            } else {
                html = "sorry this meal not available.";
                row.classList.add('unavoidable');
            }
            row.innerHTML = html;
        })
});


//details data API
row.addEventListener('click', (event) => {
    const idfind = event.target;
    const detailsId = idfind.dataset.id;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsId}`)
        .then(res => res.json())
        .then(data => {
            const details = document.getElementById('details');
            details.style.display = 'block';
            let itemDetails = " ";
            if (data.meals) {
                data.meals.forEach(meal => {

                    itemDetails += `
                    <div class="card mb-3 bg-info">
                        <button type="button" class="close" aria-label="Close">
                            <span class="m-3 fs-3" aria-hidden="true" id="close">&times;</span>
                          </button>
                        <img class="rounded-top mt-4 card-img-top w-50" src="${meal.strMealThumb}" data-id="${meal.idMeal}" alt="Card image cap">
                        <div class="card-body">
                        <h4>Category: <span>${meal.strCategory}</span></h4>
                            <h5 class="card-title text-lite">Item: <span>${meal.strArea}</span></h5>
                            <p class="card-text text-center w-75 m-auto pt-4 fs-5">Details: <span class="fs-6">${meal.strInstructions}</p>
                        </div>
                    </div>
 
                    `;
                });
                details.innerHTML = itemDetails;
            }
            // close click
            const close = document.getElementById('close');
            close.addEventListener('click', () => {
                const details = document.getElementById('details');
                details.style.display = 'none';
            })
        })
})