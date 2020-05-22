const WebSocket = require("ws");
const {
  uniqueNamesGenerator,
  adjectives,
  animals,
} = require("unique-names-generator");

const Message = require("./Message");

const nameConfig = {
  dictionaries: [adjectives, animals],
  length: 2,
};

const websocketServer = async (server) => {
  let messages = [];
  let users = [];

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req, client) => {
    const handle = uniqueNamesGenerator(nameConfig).replace("_", " ");
    const joinedAt = new Date().getTime();

    // we invite the user who just joined,
    // sending their username and the message registry
    const invite = new Message({
      sentAt: joinedAt,
      type: "invite",
      handle,
      messages,
    });

    ws.send(invite.stringFormat);

    // when this user messages, we parse and broadcast
    ws.on("message", (msg, req) => {
      try {
        const incommingMessage = JSON.parse(msg);
        incommingMessage.handle = handle;
        incommingMessage.sentAt = new Date().getTime();

        const message = new Message(incommingMessage);
        messages.push(incommingMessage);

        message.broadcast(wss);
      } catch (e) {
        console.log(e);
      }
    });

    // delete the object when the user leaves
    ws.on("close", (data) => {
      // remove the user from the list
      users = users.filter((u) => u.handle !== handle);

      const leaveNotification = new Message({
        sentAt: new Date().getTime(),
        type: "leave",
        handle,
        users,
      });
      leaveNotification.broadcast(wss);
    });

    // store record of users online
    users.push({ handle, joinedAt });

    const joinNotification = new Message({
      sentAt: joinedAt,
      type: "join",
      content: "",
      handle,
      users,
    });
    joinNotification.broadcast(wss);
    return wss;
  });
};

module.exports = websocketServer;
