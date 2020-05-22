import React, { Component } from "react";

import ChatBox from "./components/ChatBox";
import UsersBox from "./components/UsersBox";

const client = new WebSocket("ws://localhost:9000");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: undefined,
      users: [],
      messages: [],
      content: "",
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ content: e.target.value });
  }
  sendMessage(e) {
    e.preventDefault();
    const content = e.target.content.value;
    client.send(
      JSON.stringify({
        type: "message",
        content,
      })
    );
    this.setState({ content: "" });
  }

  componentDidMount() {
    client.addEventListener("open", () => {
      console.log("WebSocket Client Connected");
    });
    client.addEventListener("message", (response) => {
      const msg = JSON.parse(response.data);
      switch (msg.type) {
        case "invite":
          this.setState({ handle: msg.handle, messages: msg.messages });
          break;
        case "message":
          this.setState({ messages: [...this.state.messages, msg] });
          break;
        case "join":
          this.setState({ users: msg.users });
          break;
        case "leave":
          this.setState({ users: msg.users });
          break;
        default:
          console.log("Unrecongnized message received");
          break;
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container py-4">
          <div className="row rounded-lg overflow-hidden shadow">
            <div className="col-4 px-0">
              <div className="bg-white">
                <div className=" px-4 py-2 bg-light">
                  <p className="h5 mb-0 py-1">Chat room users</p>
                </div>
                <UsersBox {...this.state}></UsersBox>
              </div>
            </div>
            <div className="col-8 px-0">
              <ChatBox {...this.state} />
              <form onSubmit={this.sendMessage} className="bg-light">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Type a message"
                    aria-describedby="button-addon2"
                    className="form-control rounded-0 border-0 py-4 bg-light"
                    value={this.state.content}
                    name="content"
                    autoComplete="off"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      id="button-addon2"
                      type="submit"
                      className="btn btn-link"
                    >
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
