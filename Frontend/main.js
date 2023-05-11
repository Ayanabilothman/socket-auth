document.querySelector("#submitToken").addEventListener("click", () => {
  const token = document.querySelector("#token").value;
  sessionStorage.setItem("token", `Bearer ${token}`);
  startApp();
});

function startApp() {
  const socket = io("http://localhost:3000", {
    auth: {
      token: sessionStorage.getItem("token"),
    },
  });

  socket.on("connect_error", (error) => {
    console.log(error.message);
  });

  //////////////inputs//////////////
  const msgInput = document.querySelector("#message");

  /////////////////Functions////////////

  function renderMsg(message, name) {
    const pMsg = document.createElement("p");
    pMsg.innerHTML = name + ": " + message;
    document.querySelector("#chat").append(pMsg);
  }

  function clearInput(input) {
    input.value = "";
  }

  function sendMsgToSever(message) {
    socket.emit("message:recieve", message, (arg) => {
      console.log(arg);
    });
  }

  socket.on("message:send", (message, name) => {
    renderMsg(message, name);
  });

  ///////////////////////////////Message/////////////////////////////////
  document.querySelector("#addMsg").addEventListener("click", () => {
    const message = msgInput.value;

    // clear the input
    clearInput(msgInput);

    // send message to the server
    sendMsgToSever(message);
  });
}
