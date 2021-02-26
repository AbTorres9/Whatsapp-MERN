import { Avatar } from "@material-ui/core";
import "../Css/SidebarChat.css";
const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>Room name</h2>
        <p>this is the last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
