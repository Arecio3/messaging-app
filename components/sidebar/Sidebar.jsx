import { Avatar, IconButton, Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as EmailValidator from "email-validator"
import SearchIcon from "@material-ui/icons/Search";
import swal from 'sweetalert';

function Sidebar() { 
    const createChat = () => {
        const input = swal({
            text: "Please enter Username",
            content: "input",
        })
        if (!input) return null;

        if (EmailValidator.validate(input)) {
            // add chat into db
            
        }
    };
  return (
    <Container className="sidebar">
      <Header>
        <UserAvatar style={{backgroundColor: "#4285F4"}}/>

        <IconsContainer>
        {/* Wrapping it in IconButton makes it a button */}
          <IconButton>
            <ChatIcon style={{color: "#4285F4"}}/>
          </IconButton>
          <IconButton>
          <MoreVertIcon style={{color: "#4285F4"}}/>
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search Chats"/>
      </Search>

      <SidebarButton onClick={createChat}>New Chat</SidebarButton>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;


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
color: #4285F4;

`;
