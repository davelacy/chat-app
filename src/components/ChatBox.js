import React, { Component } from "react";
import Message from "./Message";
import { animateScroll } from "react-scroll";

export default class ChatBox extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "scrolling-box",
    });
  }

  render() {
    return (
      <div className="px-4 py-5 chat-box bg-white" id="scrolling-box">
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              myHandle={this.props.handle}
              {...message}
            ></Message>
          );
        })}
      </div>
    );
  }
}
