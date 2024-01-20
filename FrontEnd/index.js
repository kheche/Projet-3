const tokenVerif = localStorage.getItem("token");
console.log(tokenVerif);
// *************RECUPERATION DES ELEMENTS DE FITRAGE DE LA GALLERIE****************
const sectionGallery = document.querySelector(".gallery");
const allpicturs = document.querySelector(".toute-la-gallery");
const theObjects = document.querySelector(".objet-gallery");
const theApartements = document.querySelector(".appartement-gallery");
const theHotelsRestautrants = document.querySelector(
  ".restaurants-hotels-gallery"
);

// *************apparution et la disparution des (modifier,logout,login)*******************//

const btnModify = document.querySelectorAll(".btn-display");
const btnLogin = document.querySelector(".link-login");
const btnLogOut = document.querySelector(".link-logout");
console.log(btnModify);

btnModify.forEach((btnDisplay) => {
  if (tokenVerif == null) {
    btnDisplay.style.display = "none";
  } else {
    btnLogin.style.display = "none";
  }
});
btnLogOut.addEventListener("click", (e) => {
  e.preventDefault();
  btnModify.forEach((btnDisplay) => {
    btnDisplay.style.display = "none";
    btnLogin.style.display = "inline-block";
  });
});

function getWorks() {
  fetch("http://localhost:5678/api/works/")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      sectionGallery.innerHTML = "";
      for (let i in data) {
        sectionGallery.innerHTML += `
           <figure>
         	<img src = " ${data[i].imageUrl}" >
       	<figcaption>${data[i].title}</figcaption>

       </figure>

          `;
      }

      // &&&&&&&&&&& Debut de filtrage des traveaux dans la page d'accueil&&&&&&&&&&&//

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
      // *************AFFICHAGE DE LA  LA GALLERY  LE BOUTON "Hotels & Restaurant"************
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
  fetch("http://localhost:5678/api/works/")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      galleryModal.innerHTML = "";
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
  const categorieElement = document.querySelector("[name = 'category']");

  const figureElement = document.createElement("figure");
  // &&&&&& className permet de rajouter une class à un element en js &&&&
  figureElement.className = "figureModal";
  figureElement.setAttribute("data-id", work.id);
  console.log(figureElement);
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
  console.log(work.category.name);
}

function deleteWorkById(id) {
  const confirmation = confirm(
    "Êtes vous sûr de vouloir supprimer cet élément"
  );
  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenVerif}`,
      },
    })
      .then((response) => {
        let workToRemove = document.querySelector(`figure[data-id="${id}"]`);
        workToRemove.remove();
        getWorks();
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
  titrePhoto.value = "";
  categoriePhoto.value = "";
  imgRecuperee.style.display = "none";
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

imgRecuperee.addEventListener("change", () => {
  verifyInput();
  console.log(imgRecuperee.files);
  let fileUrl = URL.createObjectURL(imgRecuperee.files[0]);
  console.log(fileUrl);
  let imgUpload = document.createElement("img");
  imgUpload.src = fileUrl;
  let contenair = document.querySelector(".image-icon");
  contenair.appendChild(imgUpload);
  console.log(imgUpload);
  let faImage = document.querySelector(".fa-image");
  faImage.style.display = "none";
});

btnValiderphoto.addEventListener("click", () => {
  if (
    titrePhoto.value == "" ||
    categoriePhoto.value == "" ||
    imgRecuperee.value == ""
  ) {
    alert("Veuillez remplir tous les champs ");
  } else {
  }

  // LA FORMEDATA A ENVOYER AU SERVEUR//
  const formData = new FormData();
  formData.append("title", titrePhoto.value);
  formData.append("category", categoriePhoto.value);
  formData.append("image", imgRecuperee.files[0]);
  postData(formData);
  console.log(formData);
  titrePhoto.value = "";
  categoriePhoto.value = "";
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
      blockModal2.style.zIndex = -100;
      getWorksForModal();
      getWorks();
    })
    .catch((error) => {});
}
