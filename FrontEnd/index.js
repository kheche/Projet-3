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
      for (let i in data) {
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

// *******************LA PARTIE MODALE MODALE*******************//
const galleryModal = document.querySelector(".gallery-modal");

function getWorksForModal() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i in data) {
        galleryModal.innerHTML += `
        <figure class = "figureModal" >
				<img src = ${data[i].imageUrl} class = "img-modal"> 
        <span class = "content-i"> 
        <i class="fa-solid fa-trash-can"></i>
        </span>
      	</figure>
        
        `;
      }
    });
}

getWorksForModal();
// PARTIE DE LA FERMETURE ET OUVERTURE DE LA MODAL//
let modal = null;
console.log(galleryModal);
const openModal = function (e) {
  e.preventDefault();
  const valeursHref = document.querySelector(e.target.getAttribute("href"));
  //Annulation du display = none
  valeursHref.style.display = null;
  valeursHref.removeAttribute("aria-hidden");
  valeursHref.setAttribute("aria-modal", "true");
  modal = valeursHref;
  modal.addEventListener("click", closeModal);
  //   Fermeturede de la fenetre modal à partir de
  modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopingPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-close-modal")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopingPropagation);
  modal = null;
};
const stopingPropagation = function (e) {
  // Utilisation de "la methode stopPropagation()" pour arreter la propagation vres les parents
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

const linkModal = document.querySelector(".link-modal");
linkModal.addEventListener("click", openModal);
