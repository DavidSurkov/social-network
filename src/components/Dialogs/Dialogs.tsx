import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Dialog } from './Dialog/Dialog';
import { MessageReceived } from './Message/MessageReceived';
import { MessageSent } from './Message/MessageSent';
import { IDialogs } from '../../redux/dialogs_reducer';
import { useForm } from 'react-hook-form';
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
const ErrorText = styled.div`
  color: red;
`;

interface IDialog {
  dialogsData: IDialogs;
  addMessage: (message: { message: string }) => void;
}
type FormType = {
  message: string;
};
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit = (data: FormType) => {
    props.addMessage(data);
    reset();
  };
  return (
    <AllDialogs>
      <div>{dialogsElements}</div>
      <MessageBoxStyle>
        <AreaMessageSentStyle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register('message', { maxLength: 50 })} />
            {errors.message && <ErrorText>Max length is 50 symbols</ErrorText>}
            <button>Send</button>
          </form>
          {messageSentElements}
        </AreaMessageSentStyle>
        <div>{messageReceivedElements}</div>
      </MessageBoxStyle>
    </AllDialogs>
  );
};
