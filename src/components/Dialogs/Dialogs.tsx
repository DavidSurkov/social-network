import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Dialog } from './Dialog/Dialog';
import { MessageReceived } from './Message/MessageReceived';
import { MessageSent } from './Message/MessageSent';
import { IDialogs } from '../../redux/dialogs_reducer';
//Styles
const AllDialogs = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
`;
const MessageBoxStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
`;
const AreaMessageSentStyle = styled.div`
  textarea {
    min-height: 50px;
    font-size: 18px;
    display: flex;
    margin: 0 auto;
  }
  button {
    display: flex;
    margin: 0 auto;
  }
`;

interface IDialog {
  dialogsData: IDialogs;
  addMessage: () => void;
  changeNewMessage: (text: string) => void;
}
export const Dialogs = (props: IDialog) => {
  const dialogsElements = props.dialogsData.users.map((d) => (
    <Dialog key={d.id} image={d.image} name={d.name} id={d.id} />
  ));
  const messageSentElements = props.dialogsData.messages.messageSent.map((m) => (
    <MessageSent key={m.id} message={m.message} id={m.id} />
  ));
  const messageReceivedElements = props.dialogsData.messages.messageReceived.map((m) => (
    <MessageReceived key={m.id} message={m.message} id={m.id} />
  ));
  const addMessageCallback = () => {
    props.addMessage();
  };
  const newMessageHandler = (element: ChangeEvent<HTMLTextAreaElement>) => {
    props.changeNewMessage(element.currentTarget.value);
  };

  return (
    <AllDialogs>
      <div>{dialogsElements}</div>
      <MessageBoxStyle>
        <AreaMessageSentStyle>
          <textarea value={props.dialogsData.messages.textForNewMessage} onChange={newMessageHandler} />
          <button onClick={addMessageCallback}>Send</button>
          {messageSentElements}
        </AreaMessageSentStyle>
        <div>{messageReceivedElements}</div>
      </MessageBoxStyle>
    </AllDialogs>
  );
};
