function addMov() {

    var token = localStorage.getItem("token");

    var name = document.getElementById("name").value

    var description = document.getElementById("description").value

    var tipo = document.getElementById("tipo").value

    const fileInput = document.querySelector('#inputFile');
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description',description);
    formData.append('tipo',tipo);
    formData.append('avatar',fileInput.files[0]);

    const options = {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
    try {
        fetch('https://meus-filmes.pt/api/createMovie', options)
    .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
                alert("Movie added")

                document.getElementById("imgmo").src = "th.jpg"

                document.getElementById("name").value = null

                document.getElementById("description").value = null

                document.getElementById("tipo").value = null

        })
        .catch((error) => {
            console.log(error);
        });
    } catch (error) {
        alert("Error")
        console.log(error)
    }
    

}