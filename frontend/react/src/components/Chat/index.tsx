import { useState, useRef } from "react";
import styles from "./Chat.module.css";
import type { Message } from "../../types";

type ChatProps = {
  selectedRoom?: string;
  messages: Message[];
  sendMessage: (message: string, user: string) => void;
};

export default function Chat({ selectedRoom, messages, sendMessage }: ChatProps) {
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const userInputRef = useRef<HTMLInputElement>(null);

  function handleSendMessage() {
    if (user !== "") {
      sendMessage(message, user);
      setMessage("");
    }
  }

  if (!selectedRoom) {
    return <span>Select a room to chat in</span>;
  }

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          message.user === user ? (
            <div className={styles.userMessage} key={index}>
              <span className={styles.user}>🧑‍💻 {message.user} -</span>
              <span className={styles.message}>{message.message}</span>
            </div>
          ) : (
            <div className={styles.otherMessage} key={index}>
              <span className={styles.user}>🧑‍💻 {message.user} -</span>
              <span className={styles.message}>{message.message}</span>
            </div>
          )
        ))}
      </div>
      {user === "" && (
        <div className={styles.nameInputContainer}>
          <input
            type="text"
            placeholder="Enter your name"
            ref={userInputRef}
          />
          <button onClick={() => setUser(userInputRef.current?.value || "")}>
            Join Chat
          </button>
        </div>
      )}
      <div className={styles.messageContainer}>
        <input
          className={styles.messageInput}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          disabled={user === ""}
          type="text"
        />
        <button
          onClick={handleSendMessage}
          disabled={user === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
}
