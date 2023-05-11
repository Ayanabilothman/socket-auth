export const msgHandler = (io, socket) => {
  const sendMessage = (message) => {
    io.emit("message:send", message, socket.user.userName);
  };

  const recieveMessage = (message, cb) => {
    sendMessage(message);
    cb("Msg Recieved!");
  };

  socket.on("message:recieve", recieveMessage);
};
