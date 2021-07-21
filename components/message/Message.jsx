import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  // It will choose weather your the sender or receiver weather your logged in or not
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp
            ? moment(message.timestamp).format("LT")
            : "delivered"}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 10px 20px;
  border-radius:25px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 25px;
  position: relative;
  @media (max-width: 600px) {
    padding: 13px;
  }
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #4285f4;
  color: white;
  border-bottom-right-radius: 2px;

  @media (max-width: 600px) {
    margin-right: none;
  }
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
  border-bottom-left-radius: 2px;



  @media (max-width: 600px) {
    text-align: inherit;
  }
`;

const Timestamp = styled.span`
  color: #111;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
  @media (max-width: 600px) {
   padding-bottom: 2px;
   padding-top: 3px;
   font-size: 7px;
  }
`;
