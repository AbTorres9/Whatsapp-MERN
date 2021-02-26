import { IconButton, Avatar } from "@material-ui/core";
import { DonutLarge, SearchOutlined } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SidebarChat from "../Components/SidebarChat";
import "../Css/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2018/04/10090926/Fernando-Torres-Liverpool.jpg" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chat">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
