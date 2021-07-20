import { Avatar, IconButton } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../message/Message";
import MicIcon from '@material-ui/icons/Mic';
import MoodIcon from '@material-ui/icons/Mood';
import firebase from 'firebase';
import getRecipientEmail from "../../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import * as React from 'react';

function MessageScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("")
  const router = useRouter();
  const endOfMessagesRef = useRef(null);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      // Merge = wont overide
    },
      { merge: true }
    );

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };
  // gives us user data
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>Last active: {` `}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo dateTime={recipient?.lastSeen?.toDate()} live />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
        <MoodIcon />
        {/* Every time user types it updates state */}
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button disabled={!input} type="submit" onClick={sendMessage}>Send</button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default MessageScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: sticky !important;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }

  @media (max-width: 600px) {
    > h3 {
      font-size: 10px
    }

    > p {
      font-size: 7px;
    }
  }
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 5px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;

  > button {
    margin-right: 5px;
    background-color: #e5ded8;
    padding: 5px;
    border-radius: 5px;
    color: gray;
    border: none;

    :enabled {
      border: none;
      background-color: #4285f4;
      padding: 5px;
      border-radius: 5px;
      color: whitesmoke;
    }
  }
  `;

const Input = styled.input`
    flex: 1;
    padding: 20px;
    background-color: whitesmoke;
    border: none;
    outline: none;
    border-radius: 10px;
    margin-left: 15px;
    margin-right: 15px;
  `;

const EndOfMessage = styled.div`
margin-bottom: 50px;
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
padding: 30px;
background-color: #e5ded8;
min-height: 90vh;

@media (max-width: 600px) {
    padding: 10px;
  }
`;
