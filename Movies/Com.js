function getcomms() {

    var movid = parseInt(document.getElementById("movid").innerText)

    fetch('https://meus-filmes.pt/api/comments/idMovie', {
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