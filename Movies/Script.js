function registeracc() {

  var name = document.getElementById("name").value

  var email = document.getElementById("email").value

  var bio = "ola"

  var password = document.getElementById("password").value

  fetch('http://meus-filmes.pt/api/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      bio: bio,
      password: password,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.message == "CREATED") {
        alert("conta criada com sucesso")
      }
      else {
        alert("não foi possivel criar a conta")
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

function login() {

  var email = document.getElementById("email").value

  var password = document.getElementById("password").value

  fetch('http://meus-filmes.pt/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      email: email,
      password: password,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.token != null) {
        alert("sucesso")
        localStorage.setItem("token", responseJson.token);
        location.replace("user.html");
      }
      else {
        alert("email ou password errada")
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

function logout() {

  localStorage.removeItem('token')
  location.replace("Index.html")

}

function checklogin() {
  try {
    var token = localStorage.getItem("token")
  } catch (error) {
    console.log(error)
  }


  console.log(token)

  if (token != null) {
    location.replace("user.html")
  }

}

function getProfile() {

  var token = localStorage.getItem("token")

  fetch('http://meus-filmes.pt/api/profile', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      var datetime = responseJson.user.created_at.split("T")
      var date = datetime[0]
      console.log(datetime[1].split(".")[0])
      var time = datetime[1].split(".")[0]
      if (responseJson.user.avatar != null) {
        document.getElementById("imgprof").src = responseJson.user.avatar
      }
      document.getElementById("titulo").innerText = responseJson.user.name
      document.getElementById("conteudo").innerText
        = "Email: " + responseJson.user.email + "\n"
        + "Creation date: " + date + " " + time
    })
    .catch((error) => {
      console.log(error);
    });

}

function uploadAvatar() {
  var token = localStorage.getItem("token");
  const fileInput = document.querySelector('#inputFile');
  const formData = new FormData();

  formData.append('avatar', fileInput.files[0]);

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  fetch('https://meus-filmes.pt/api/uploadAvatar', options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

function editacc() {

  var token = localStorage.getItem("token")

  var name = document.getElementById("name").value

  var bio = document.getElementById("bio").value

  fetch('http://meus-filmes.pt/api/editProfile', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      name: name,
      bio: bio,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);

      if (responseJson.message == "") {
        alert("não foi possivel editar a conta")
      }
      else {
        alert("conta editada com sucesso")
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

function getProfileedit() {

  var token = localStorage.getItem("token")

  fetch('http://meus-filmes.pt/api/profile', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      var datetime = responseJson.user.created_at.split("T")
      var date = datetime[0]
      console.log(datetime[1].split(".")[0])
      var time = datetime[1].split(".")[0]

      document.getElementById("name").value = responseJson.user.name
      document.getElementById("bio").value = responseJson.user.bio

    })
    .catch((error) => {
      console.log(error);
    });

}