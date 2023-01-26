function registeracc() {

  var name = document.getElementById("name").value

  var email = document.getElementById("email").value

  var bio = "ola"

  var password = document.getElementById("password").value

  fetch('http://my-movies.online/api/register', {
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

  fetch('http://my-movies.online/api/login', {
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

  fetch('http://my-movies.online/api/profile', {
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

      document.getElementById("titulo").innerText = responseJson.user.name
      document.getElementById("conteudo").innerText
        = "Email: " + responseJson.user.email + "\n"
        + "Creation date: " + date + " " + time
    })
    .catch((error) => {
      console.log(error);
    });

}

function getMovies() {
  fetch('https://my-movies.online/api/movies', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      for (const filme of responseJson.movies) {
        console.log(filme.name);

      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function LoadMov(){

  fetch('https://my-movies.online/api/movies', {
    method: 'GET',
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

  fetch('https://my-movies.online/api/uploadAvatar', options)
    .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
      })
      .catch((error) => {
          console.log(error);
      });
}