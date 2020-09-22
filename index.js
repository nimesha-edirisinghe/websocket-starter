const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const server = http.createServer((req, res) =>
  console.log("Received a request")
);

//pass the server object to the WebSocketServer library to do all the job, this class will override the req/res
const websocket = new WebSocketServer({
  httpServer: server,
});

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it!
websocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("Opened!!!"));
  connection.on("close", () => console.log("CLOSED!!!"));
  connection.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`);
    connection.send(`got your message: ${message.utf8Data}`);
  });

  //use connection.send to send stuff to the client
  // sendEvery5Seconds();
});

server.listen(8080, () => console.log("listening on port 8080"));

function sendEvery5Seconds() {
  connection.send(`Message ${Math.random()}`);
  setTimeout(sendEvery5Seconds, 5000);
}
