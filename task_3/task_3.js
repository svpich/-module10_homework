let websocket;
const wsUri = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector(".input-wrapper__input");
const sendBtn = document.querySelector(".input-wrapper__send-btn");
const geoBtn = document.querySelector(".input-wrapper__geo");
const output = document.querySelector(".output-wrapper");

connectWebSocket();

geoBtn.addEventListener("click", () => {
    getGeolocation()
    .then((coords) => {
        websocket.send(JSON.stringify(new Message(coords, "link")));

        writeLinkToScreen(`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`);
    });
})

sendBtn.addEventListener("click", () => {   
    let messageOut = input.value;
    
    writeToScreen(messageOut, "message-out");

    websocket.send(JSON.stringify(new Message(messageOut, "text")));

    input.value = "";
})

function writeToScreen(message, className) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    pre.className = className;
    output.appendChild(pre);
  }

function writeLinkToScreen(link) {
    let pre = document.createElement("a");
    pre.innerHTML = "Гео-локация";
    pre.className = "message-out";
    pre.setAttribute('href', link);
    output.appendChild(pre);
}

function connectWebSocket() {
    websocket = new WebSocket(wsUri);
    
    websocket.onopen = function(evt) {
        console.log("CONNECTED")
    };
  
    websocket.onclose = function(evt) {
        console.log("DISCONNECTED")
    };
  
    websocket.onmessage = function(evt) {
        let messageIn = JSON.parse(evt.data);

        if (messageIn.type == "text") {
            writeToScreen(messageIn.message, "message-in");
        }
    };
  
    websocket.onerror = function(evt) {
        console.log("Ошибка при подключении: ", evt.data);
    };
}

function getGeolocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
               
                resolve( {latitude: coords.latitude, 
                        longitude: coords.longitude} );
              });
          } else {
            console.log("Нет поддержки определения геолокации")
            reject(new Error("Нет поддержки определения геолокации"))
          }
    })
    
}

class Message {
    constructor(message, type) {
        this.message = message;
        this.type = type;
      }
}
