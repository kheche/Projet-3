const tokenVerif = localStorage.getItem("token");
console.log(tokenVerif);
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
          <span>${dataFilters[j].id}<span>

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
        <div> ${dataFilters[j].id}</div>
          
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
        creatFigureItem(data[i]);

        // galleryModal.innerHTML += `
        // <figure class = "figureModal" >
        // <img src = ${data[i].imageUrl} class = "img-modal">
        // <span class = "content-i  delete-items">
        // <i class="fa-solid fa-trash-can"></i>
        // </span>
        // </figure>

        // `;
      }
    });
}
function creatFigureItem(work) {
  const figureElement = document.createElement("figure");
  figureElement.className = "figureModal";
  figureElement.setAttribute("data-id", work.id);
  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.className = "img-modal";
  figureElement.appendChild(imgElement);
  const contentIEement = document.createElement("span");
  contentIEement.className = "content-i";

  const iconElement = document.createElement("i");
  iconElement.className = "fa-solid fa-trash-can";
  contentIEement.appendChild(iconElement);
  figureElement.appendChild(contentIEement);

  galleryModal.appendChild(figureElement);
  contentIEement.addEventListener("click", (e) => {
    e.preventDefault();
    deleteWorkById(work.id);
  });
}

function deleteWorkById(id) {
  const confirmation = confirm("Etes vous sur de vouloir supprimer ce travail");
  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenVerif}`,
      },
    })
      .then((response) => {
        console.log(response.json());
        let workToRemove = document.querySelector(`figure[data-id="${id}"]`);
        workToRemove.remove();
      })
      .catch((error) => {});
  }
}

getWorksForModal();

// PARTIE DE LA FERMETURE ET OUVERTURE DE LA MODAL//
let modal = null;
console.log(galleryModal);
const openModal = function (e) {
  e.preventDefault();
  const valeursHref = document.querySelector(e.target.getAttribute("href"));
  console.log(valeursHref);
  //Annulation du display = none
  valeursHref.style.display = null;
  valeursHref.removeAttribute("aria-hidden");
  valeursHref.setAttribute("aria-modal", "true");
  modal = valeursHref;
  modal.addEventListener("click", closeModal);
  //   Fermeturede de la fenetre modal à partir de LA CROIX//
  modal.querySelectorAll(".js-close-modal").forEach((close) => {
    close.addEventListener("click", closeModal);
  });
  // ARRET DE PROPATION DE LA FERMETURE SUR TOUTE LA FETRE MODALE AU CLIC//
  modal.querySelectorAll(".js-modal-stop").forEach((stop) => {
    stop.addEventListener("click", stopingPropagation);
  });
};
// LA FONCTION DE LA FERMETURE DE  LA FENETRE MODAL//
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelectorAll(".js-close-modal").forEach((close) => {
    close.addEventListener("click", closeModal);
  });

  modal.querySelectorAll(".js-modal-stop").forEach((f) => {
    f.removeEventListener("click", stopingPropagation);
  });

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
console.log(linkModal);
// &&&&&&&&&&&&&&&&&&&&&&&&&&TRAITEMENT DES MODAL EN JAVASCRIPT&&&&&&&&&&&&&&&&//

const blockModal2 = document.querySelector(".block-modal2");
const imgRecuperee = document.querySelector("#photo-input");
const btnAjouterPhoto = document.querySelector(".btn-ajouter-photo");
const flecheDeRecule = document.querySelector(".la-fleche");
const btnValiderphoto = document.querySelector(".btn-valider-photo");
const titrePhoto = document.querySelector("#titre-photo");
const categoriePhoto = document.querySelector("#categorie-photo");
console.log(titrePhoto);

btnAjouterPhoto.addEventListener("click", () => {
  blockModal2.style.zIndex = 100;
});

flecheDeRecule.addEventListener("click", () => {
  blockModal2.style.zIndex = -100;
});

// ***************CREATION DE FONCTION DE TEST DU CHAMP DES INPUTS ET SELECT*************
const verifyInput = function () {
  console.log(titrePhoto.value, categoriePhoto.value);
  if (
    titrePhoto.value != "" &&
    categoriePhoto.value != "" &&
    imgRecuperee.value != ""
  ) {
    btnValiderphoto.style.background = "green";
    btnValiderphoto.style.color = "white";
  } else {
    btnValiderphoto.style.background = "red";
  }
};
titrePhoto.addEventListener("input", verifyInput);
categoriePhoto.addEventListener("change", verifyInput);
imgRecuperee.addEventListener("change", verifyInput);

btnValiderphoto.addEventListener("click", () => {
  if (
    titrePhoto.value == "" ||
    categoriePhoto.value == "" ||
    imgRecuperee.value == ""
  ) {
    alert("Veuillez remplir tous les champs ");
    return;
  }
  // LA FORMEDATA A ENVOYER AU SERVEUR//
  const formData = new FormData();
  formData.append("title", titrePhoto.value);
  formData.append("category", categoriePhoto.value);
  formData.append("image", imgRecuperee.files[0]);
  postData(formData);
  console.log(formData);
});

function postData(formData) {
  console.log(tokenVerif);
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokenVerif}`,
    },
  })
    .then((response) => {
      console.log(response.json());
    })
    .catch((error) => {});
}
