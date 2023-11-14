const form = document.querySelector(".login");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = document.querySelector("#mail").value;
  let password = document.querySelector("#pswd").value;
  console.log(` voici mon ${email} et mon password ${password}`);
  // Je controle le saisi de l'utilisation "email et pmot de passe//

  const btnSubmit = document.querySelector(".submit");
  const messageErreur = document.createElement("p");
  const logErreur = document.createElement("div");
  btnSubmit.appendChild(logErreur);
  btnSubmit.appendChild(messageErreur);
  if (email === "" || password === "") {
    messageErreur.innerHTML =
      "Veuillez remplir les champs ci-dessus s'il vous plait merci !";
    messageErreur.style.color = "red";
  }
  // *******************création de mon objet de logins****************//
  const controlLogins = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(controlLogins),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("test");

        logErreur.innerHTML = "Veuillez rentrer des logins corrects ";
        logErreur.style.color = "red";
      }

      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
    });
});
document.addEventListener("click", () => {
  messageErreur.innerHTML = "";
  logErreur.innerHTML = "";
});
