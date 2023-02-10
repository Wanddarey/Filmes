function getcomms() {

    var idfilme = localStorage.getItem("filmeId")
    var token = localStorage.getItem("token")

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
            for (const comms of responseJson) {

                console.log(comms);

                var comm = document.createElement("div");
                comm.className = "list-group-item"

                var commentinfo = document.createElement("div");
                commentinfo.className = "commsuserinfo"

                const userav = getcommuser(comms.idUser)
                console.log(userav)

                var img = document.createElement("img");
                img.className = "compfp";
                img.id = "compfp"
                try {
                    img.src = userav.avatar;
                } catch (error) {

                }

                if (img.src == "") {
                    img.src = "th.jpg"
                }

                console.log("commenter profile pic " + userav + " - " + img.src)

                var h5 = document.createElement("h5");
                h5.className = "commusername"
                h5.innerText = "-" + comms.nameUser;

                var p = document.createElement('p');
                p.innerText = " - " + comms.created_at;
                p.className = "commdt";

                console.log("commenter name " + h5.innerText + " " + comms.nameUser)

                // get the value of the comment text
                const comment = comms.conteudo

                // create a new div to hold the comment
                const li = document.createElement('li');
                li.className = "content";

                // check if the comment includes a URL
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                const url = comment.match(urlRegex);
                if (url) {
                    // if there is a URL, wrap it in a link
                    li.innerHTML = comment.replace(urlRegex, `<a target="_blank" rel="noopener noreferrer" href="${url[0]}">${url[0]}</a>`);
                } else {
                    // if there is no URL, just add the comment text
                    li.innerHTML = comment;            
                }
                
                commentinfo.append(img, h5, p)
                comm.append(commentinfo)
                comm.append(li)
                document.getElementById("commentsection").append(comm)

            }

        })
        .catch((error) => {
            console.log(error);
        });

}

function getcommuser(id) {

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
            console.log("getcommuser " + JSON.stringify(responseJson));

            const userav = responseJson.user;

            return userav;

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
        })
        .catch((error) => {
            console.log(error);
        });

    var commentinfo = document.createElement("div");
    commentinfo.className = "commsuserinfo"

    var img = document.createElement("img");
    img.className = "compfp";
    img.id = "compfp"

    if (img.src == "") {
        img.src = "th.jpg"
    }

    console.log("commenter profile pic" + " " + img.src);

    var h5 = document.createElement("h5");
    h5.className = "commusername"
    h5.innerText = "-" + getcommenterusername()

    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = cont;

    commentinfo.append(img, h5);
    document.getElementById("commentsection").append(commentinfo);
    document.getElementById("commentsection").append(li);
}

function getcommenterusername() {

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
            return json.stringify(responseJson.user.name);
        })
        .catch((error) => {
            console.log(error);
        });

}