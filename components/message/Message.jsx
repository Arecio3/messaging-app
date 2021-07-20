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
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 25px;
  position: relative;
  text-align: center;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #4285f4;
  color: white;
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color: #111;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
