// fetch("http://localhost:5678/api/works").then((works) => {
//   console.log(works);
//   const getWorks = works.json();
//   console.log(getWorks);
// });
// const getCategories = fetch("http://localhost:5678/api/categories");
// console.log(getCategories);

const url = "http://localhost:5678/api/works/";
const sectionGallery = document.querySelector(".gallery");
const allpicturs = document.querySelector(".toute-la-gallery");
const theObjects = document.querySelector(".objet-gallery");
const theApartements = document.querySelector(".appartement-gallery");
const theHotelsRestautrants = document.querySelector(
  ".restaurants-hotels-gallery"
);

function getWorks() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (i in data) {
        sectionGallery.innerHTML += `
        <figure>
				<img src = " ${data[i].imageUrl}" >
				<figcaption>${data[i].title}</figcaption>
			</figure>
        
        `;
      }
      // *************AFFICHAGE DE TOUTE LA GALLERY VAEC LE BOUTON "TOUS"************
      allpicturs.addEventListener("click", function () {
        sectionGallery.innerHTML = "";
        getWorks();
      });
      // *************AFFICHAGE DE TOUTE LA GALLERY OBJET VAEC LE BOUTON "OBJET"************
      theObjects.addEventListener("click", function () {
        const dataFilters = data.filter(function (dataFilter) {
          return dataFilter.category.name === "Objets";
        });
        sectionGallery.innerHTML = "";
        console.log(dataFilters);
        for (let j = 0; j < dataFilters.length; j++) {
          sectionGallery.innerHTML += `
          <figure>
          <img src = " ${dataFilters[j].imageUrl}" >
          <figcaption>${dataFilters[j].title}</figcaption>
        </figure>
          
          `;
        }
      });
      // *************AFFICHAGE DE la  LA GALLERY APPARTTEMENTS  VAEC LE BOUTON "APPARTEMENT"************
      theApartements.addEventListener("click", function () {
        const dataFilters = data.filter(function (dataFilter) {
          return dataFilter.category.name === "Appartements";
        });
        sectionGallery.innerHTML = "";
        console.log(dataFilters);
        for (let j = 0; j < dataFilters.length; j++) {
          sectionGallery.innerHTML += `
          <figure>
          <img src = " ${dataFilters[j].imageUrl}" >
          <figcaption>${dataFilters[j].title}</figcaption>
        </figure>
          
          `;
        }
      });
      // *************AFFICHAGE DE LA  LA GALLERY  OBJET VAEC LE BOUTON "Hotels & Restaurant"************
      theHotelsRestautrants.addEventListener("click", function () {
        const dataFilters = data.filter(function (dataFilter) {
          return dataFilter.category.name === "Hotels & restaurants";
        });
        sectionGallery.innerHTML = "";
        console.log(dataFilters);
        for (let j = 0; j < dataFilters.length; j++) {
          sectionGallery.innerHTML += `
          <figure>
          <img src = " ${dataFilters[j].imageUrl}" >
          <figcaption>${dataFilters[j].title}</figcaption>
        </figure>
          
          `;
        }
      });
    });
}

getWorks();
