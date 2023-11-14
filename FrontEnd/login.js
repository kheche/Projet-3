const form = document.querySelector(".login");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const controlLogins = {
    mail: event.target.querySelector("#mail").value,
    pswd: event.target.querySelector("#pswd").value,
  };
console.log(controlLogins)
console.log(JSON.stringify(controlLogins))
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(controlLogins),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Impossible de contacter la base de données");
    }

    return response.json();
  });
});
