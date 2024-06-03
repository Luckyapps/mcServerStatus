window.onload = init;

function init(){
    loadUI();
}

var servers = {
    storageName: "serverListe",
    list: [
        "popcornserver.onthewifi.com",
        "GOMMEHD.NET",
        "luckyapps.serverminecraft.com"
    ],
    save(){
        localStorage.setItem(storageName, JSON.stringify(this.list));
    },
    load(){
        if(localStorage.getItem(storageName) != null){
            this.list = JSON.parse(localStorage.getItem(storgeName));
        }else{
            console.warn(`Der Speicherstand von ${this.storageName} konnte nicht geladen werden.`);
        }
    }
};

async function loadStatus(adress){
    var response = await fetch("https://api.mcsrvstat.us/3/"+ adress);
    data = await response.json();
    console.log(data);
    return data;
}

async function loadUI(){
    for(i=0; i < servers.list.length; i++){
        showStatus(await loadStatus(servers.list[i]), i);
    }
}

function showStatus(data, index){
    if(index != 0){
        document.getElementsByTagName("nav")[0].innerHTML += `<a href="#${data.hostname}">${data.hostname}</a>`
        document.getElementById("statusList").innerHTML += `<div class="listItem" id="${data.hostname}">
        <div class="online"></div>
        <div class="listHead">
            <img class="icon" src="">
            <h2 class="hostname">Popcornserver</h2>
        </div>
        <div class="shortInfo">
            <div class="version"></div>
            <div class="ip"></div>
            <div class="port"></div>
        </div>
        <span class="motd"></span>
        <div class="players">
            <div class="maxPlayers hidden"></div>
            <div class="onlinePlaxers hidden"></div>
            <div class="playerList">
                <h3 class="playerListeHead"></h3>
                <ul></ul>
            </div>
        </div>
        <hr style="width: 100%;">
        <div class="timestamp"></div>
    </div>`;
    }
    var listItem = document.getElementsByClassName("listItem")[index];
    if(data.online){
        listItem.getElementsByClassName("online")[0].classList.add("isonline");
        listItem.getElementsByClassName("online")[0].innerHTML = "Online";
    }else{
        listItem.getElementsByClassName("online")[0].classList.remove("isonline");
        listItem.getElementsByClassName("online")[0].innerHTML = "Offline";
    }
    listItem.getElementsByClassName("hostname")[0].innerHTML = data.hostname;
    listItem.getElementsByClassName("ip")[0].innerHTML = data.ip;
    listItem.getElementsByClassName("port")[0].innerHTML = data.port;
    listItem.getElementsByClassName("version")[0].innerHTML= data.version;
    //listItem.getElementsByClassName("")[0]. = ;
    //listItem.getElementsByClassName("")[0].innerHTML = data.;
    listItem.getElementsByClassName("motd")[0].innerHTML = "<div>" + data.motd.html[0] +"</div>";
    listItem.getElementsByClassName("motd")[0].innerHTML += "<div>" + data.motd.html[1] +"</div>";
    listItem.getElementsByClassName("icon")[0].src = data.icon;
    listItem.getElementsByClassName("playerListeHead")[0].innerHTML = `${data.players.online} von ${data.players.max} Spielern Online:`;
    listItem.getElementsByClassName("playerList")[0].getElementsByTagName("ul")[0].innerHTML = "";
    try{
        data.players.list.forEach(element => {
            listItem.getElementsByClassName("playerList")[0].getElementsByTagName("ul")[0].innerHTML += `<li>${element.name} <span class="uuid">${element.uuid}</span></li>`;
        });
    }catch(err){
        listItem.getElementsByClassName("playerList")[0].innerHTML += "<p style='color: #970b0b;'>Die Spieler können nicht aufgelistet werden.</p>"
    }

    listItem.getElementsByClassName("timestamp")[0].innerHTML = "Stand von: "+ new Date(data.debug.cachetime * 1000);
}

function getTimestamp(unix_timestamp){

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds
var date = new Date(unix_timestamp * 1000);

// Hours part from the timestamp
var hours = date.getHours();

// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();

// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(date);

return formattedTime;

}