function getcomms() {

    var idfilme = localStorage.getItem("filmeId")
    var token = localStorage.getItem("token")

    fetch('https://meus-filmes.pt/api/comments/' + idfilme, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        },
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            for (const comms of responseJson) {
                if (filme.id > 12) {

                    var commentinfo = document.createElement("div");
                    commentinfo.className = "hstack"
                    commentinfo.style = "margin: 5px;";

                    const comavatar = getcommuser(comms.idUser)

                    var img = document.createElement("img");
                    img.className = "compfp";
                    img.src = comavatar

                    var h5 = document.createElement("img");
                    h5.style="margin-top: 6px;"
                    h5.innerText = "-" + comms.user

                    var p = document.createElement("p");
                    img.className = "list-group-item";

                    commentinfo.append(img)
                    commentinfo.append(h5)
                    document.getElementById("commentsection").append(commentinfo)
                    document.getElementById("commentsection").append(divSup)
                }

            }
            
        })
        .catch((error) => {
            console.log(error);
        });

}

function getcommuser(id){

    var token = localStorage.getItem("token")

  fetch('http://meus-filmes.pt/api/users/' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);

      return responseJson.user.avatar

    })
    .catch((error) => {
      console.log(error);
    });

}

function ratchng() {

    document.getElementById("rtng").innerText = "Rating: " + document.getElementById("range").value;

}

function addcomm() {

    var token = localStorage.getItem("token")
    var cont = document.getElementById("commentcontent").value
    var Idm = localStorage.getItem("filmeId")
    var pnt = document.getElementById("range").value


    fetch('http://meus-filmes.pt/api/commentMovie', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            conteudo: cont,
            idMovie: Idm,
            points: pnt
        }),
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);

            console.log(responseJson.message)
            if (responseJson.message == "updated") {
                alert("conta editada com sucesso")

                location.replace("user.html")
            }
            else {
                alert("não foi possivel editar a conta")
            }
        })
        .catch((error) => {
            console.log(error);
        });

}