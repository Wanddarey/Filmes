function openProfile(){

    location.replace("user.html")

}

function imgchng() {

    const reader = new FileReader()
  
    let files = document.getElementById('inputFile').files
    reader.onload = async (event) => {
        document.getElementById('imgmo').setAttribute('src', event.target.result)
    }
    console.log(reader.readAsDataURL(files[0]))
}

function getpfp(){

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
        if (responseJson.user.avatar != null) {
          document.getElementById("pfp").src = responseJson.user.avatar
        }
      })
      .catch((error) => {
        console.log(error);
      });

}