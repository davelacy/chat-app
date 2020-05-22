class Message {
  constructor(data = {}) {
    this.sentAt = data.sentAt || null;
    this.type = data.type || "message";
    this.content = data.content || null;
    this.handle = data.handle || null;
    this.users = data.users || [];
    this.messages = data.messages || [];
  }

  get stringFormat() {
    return JSON.stringify(this.data);
  }

  get data() {
    return {
      sentAt: this.sentAt,
      type: this.type,
      content: this.content,
      handle: this.handle,
      users: this.users,
      messages: this.messages,
    };
  }

  broadcast(wss) {
    wss.clients.forEach((client) => client.send(this.stringFormat));
  }
}

module.exports = Message;
