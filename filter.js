const allBrandsTemplate = document.querySelector('.allBrandsTemplate');
const brandsTemplate = Handlebars.compile(allBrandsTemplate.innerText);

const allColorsTemplate = document.querySelector('.allcolorsTemplate');
const colorsTemplate = Handlebars.compile(allColorsTemplate.innerText);

const filterAllCarsTemplate = document.querySelector('.filterAllCarsTemplate');
const makeTemplate = Handlebars.compile(filterAllCarsTemplate.innerText);
const brandsElem = document.querySelector('.brandsElem')

axios.get("https://api-tutor.herokuapp.com/v1/makes")
    .then(function (response) {
        const brands = response.data;

        brandsElem.innerHTML = brandsTemplate({
            brands
        })
    })

const color = document.querySelector('.colorselection')

axios
    .get("https://api-tutor.herokuapp.com/v1/colors")
    .then(function (response) {
        const colors = response.data;

        color.innerHTML = colorsTemplate({
            colors
        })
    })

const submit = document.querySelector('.submit')

const filter = document.querySelector('.filter')


submit.addEventListener('click', function () {

    if (brandsElem.value && color.value) {
        axios
            .get("https://api-tutor.herokuapp.com/v1/cars/make/" + brandsElem.value + "/color/" + color.value)
            .then(function (response) {
                const allCarsfilter = response.data;

                filter.innerHTML = makeTemplate({
                    allCarsfilter

                })

            })

            // const allCarsElem = document.querySelector('.cars');
            // allCarsElem.innerHTML = allCarsTemplate({
            //    allCars: response.data
            // })


    } else if (color.value) {
        axios
            .get("https://api-tutor.herokuapp.com/v1/cars/color/" + color.value)
            .then(function (response) {
                const allCarsfilter = response.data;

                filter.innerHTML = makeTemplate({
                    allCarsfilter

                })

            })
    } else if (brandsElem.value) {
        axios
            .get("https://api-tutor.herokuapp.com/v1/cars/make/" + brandsElem.value)
            .then(function (response) {
                const allCarsfilter = response.data;

                filter.innerHTML = makeTemplate({
                    allCarsfilter

                })

            })
    } else {
        filter.innerHTML = "Please choose an option for color & or brand "
    }
})