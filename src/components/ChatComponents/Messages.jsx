import React from "react";
import Message from "./Message";

function Messages({ messages }) {
  return (
    <div className="text-white h-full overflow-auto">
      {messages.map((m) => (
        <Message message={m} key={m.text} />
      ))}
    </div>
  );
}

export default Messages;
