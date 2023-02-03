function imgchng() {

    const reader = new FileReader()

    let files = document.getElementById('inputFile').files
    reader.onload = async (event) => {
        document.getElementById('imgmo').setAttribute('src', event.target.result)
    }
    console.log(reader.readAsDataURL(files[0]))
}

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

    fetch('https://meus-filmes.pt/api/createMovie', options)
    .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            console.log(error);
        });

}