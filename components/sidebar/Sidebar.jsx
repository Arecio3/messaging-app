import { Avatar, IconButton, Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as EmailValidator from "email-validator";
import SearchIcon from "@material-ui/icons/Search";
import { auth, db } from "../../firebase";
import swal from "sweetalert";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatComponent from "../ChatComponent";

function Sidebar() {
  const [user] = useAuthState(auth);
  // Goes to firestore db querys users array and checks email
  const userChatsRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatsRef);


  const createChat = () => {
    swal({
      text: "Please enter Username",
      content: "input",
    }).then((input) => {
      if (!input) return null;
      // console.log(input)
      // also makes sure user doesn't start a chat with themselves, adds to db if not already created
      if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email) {
        // add chat into db
        db.collection("chats").add({
          users: [user.email, input],
        });
      }
    });
  };

  const chatAlreadyExist = (recipientEmail) => 
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  

  return (
    <Container className="sidebar">
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

        <IconsContainer>
          {/* Wrapping it in IconButton makes it a button */}
          <IconButton>
            <ChatIcon style={{ color: "#4285F4" }} onClick={createChat}/>
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ color: "#4285F4" }} />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search Chats" />
      </Search>

      <SidebarButton onClick={createChat}>New Chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <ChatComponent key={chat.id} id={chat.id} users={chat.data().users} db={db}/>
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
min-height: 350px;
overflow-y: scroll;

::-webkit-scrollbar {
  display: none;
}

-ms-overflow-style: none; /* IE and Edge */
 scrollbar-width: none; /* FireFox */

 @media (max-width: 600px) {
   min-width: 200px;
   font-size: 11px;
 }
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }

  :hover {
    background-color: #6699cc;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  margin-left: 30px;
`;
// const HeaderTitle = styled.div`
// display: flex;
// text-align: center;
// justify-content: center;
// `;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div`
  color: #4285f4;
`;
