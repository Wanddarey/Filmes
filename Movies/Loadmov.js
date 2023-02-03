function getMovies() {

    var num = 0;
    var idcnt = 0;

    fetch('https://meus-filmes.pt/api/movies', {
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

                if (num == 0) {
                    var divSup = document.createElement("div");
                    divSup.style = "text-align: center;";

                    var divSup1 = document.createElement("div");
                    divSup1.style = "margin: 5%;";

                    var divRow = document.createElement("div");
                    divRow.className = "row";
                    divRow.id = "rowplcm" + idcnt;

                    var divCol = document.createElement("div");
                    divCol.className = "col-sm-6 mb-3 mb-sm-0";

                    var divCard = document.createElement("div");
                    divCard.className = "card";

                    var divCardBody = document.createElement("div");
                    divCardBody.className = "card-body";

                    var a = document.createElement("a");
                    a.className = "titulo";
                    a.innerText = filme.name;
                    a.href = "Filme.html"
                    a.setAttribute("onclick", "getid(" + filme.id + ")");

                    var img = document.createElement("img");
                    img.className = "imgg mx-auto d-block";
                    img.src = filme.avatar;

                    var h4 = document.createElement("h4");
                    h4.className = "descr";
                    h4.innerText = filme.tipo;

                    var h6 = document.createElement("h6");
                    h6.className = "descr card-title";
                    h6.innerText = "Type: " + filme.tipo;

                    divCardBody.append(img)
                    divCardBody.append(a)
                    divCardBody.append(h6)
                    divCard.append(divCardBody)
                    divCol.append(divCard)
                    divRow.append(divCol)
                    divSup1.append(divRow)
                    divSup.append(divSup1)
                    document.getElementById("bodymov").append(divSup)

                    num = 1;
                }
                else {

                    var divCol = document.createElement("div");
                    divCol.className = "col-sm-6 mb-3 mb-sm-0";

                    var divCard = document.createElement("div");
                    divCard.className = "card";

                    var divCardBody = document.createElement("div");
                    divCardBody.className = "card-body";

                    var a = document.createElement("a");
                    a.className = "titulo";
                    a.innerText = filme.name;
                    a.href = "Filme.html"
                    a.setAttribute("onclick", "getid(" + filme.id + ")");

                    var img = document.createElement("img");
                    img.className = "imgg mx-auto d-block";
                    img.src = filme.avatar;

                    var h6 = document.createElement("h6");
                    h6.className = "descr card-title";
                    h6.innerText = "Type: " + filme.tipo;

                    divCardBody.append(img)
                    divCardBody.append(a)
                    divCardBody.append(h6)
                    divCard.append(divCardBody)
                    divCol.append(divCard)
                    divRow.append(divCol)

                    document.getElementById("rowplcm" + idcnt).append(divCol)

                    idcnt += 1;
                    num = 0;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

var numid = 0;

function getid(num) {
    numid = num
}

function LoadMov() {

    var token = localStorage.getItem("token")
    try {
        fetch('https://meus-filmes.pt/api/movies/id',{
            mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': numid
            },

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }


}