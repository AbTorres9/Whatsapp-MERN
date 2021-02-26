import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("3133dd1a024c8d8d34ef", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) => {
      //alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <h1>MERN Whatsapp Clone</h1>
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
