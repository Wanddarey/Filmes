function getcomms() {

    var idfilme = localStorage.getItem("filmeId")

    fetch('https://meus-filmes.pt/api/comments/' + idfilme, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            console.log(error);
        });

}

function ratchng(){

document.getElementById("rtng").innerText = "Rating: " + document.getElementById("range").value;

}