import dialogAvatar from '../images/dialogAvatar.jpg';
import dialogAvatar1 from '../images/dialogAvatar1.jpg';
import dialogAvatar2 from '../images/dialogAvatar2.jpg';
import dialogAvatar3 from '../images/dialogAvatar3.jpg';
import dialogAvatar4 from '../images/dialogAvatar4.png';

export interface IMessageSent {
  id: number;
  message: string;
}
export interface IMessageReceived {
  id: number;
  message: string;
}
export interface IUsers {
  id: number;
  name: string;
  image: string;
}
export interface IMessage {
  messageSent: Array<IMessageSent>;
  messageReceived: Array<IMessageReceived>;
}
export interface IDialogs {
  messages: IMessage;
  users: Array<IUsers>;
}

const initialState: IDialogs = {
  messages: {
    messageSent: [
      { id: 1, message: 'Hello, you are a friend of mine' },
      { id: 2, message: 'Good afternoon' },
      { id: 3, message: 'I am from Oriflame' },
    ],
    messageReceived: [
      { id: 1, message: 'How are you' },
      { id: 2, message: 'I hope you are doing well' },
      { id: 3, message: 'I am from Oriflame' },
    ],
  },
  users: [
    { id: 1, name: 'Max', image: dialogAvatar },
    { id: 2, name: 'Steve', image: dialogAvatar1 },
    { id: 3, name: 'Jannet', image: dialogAvatar2 },
    { id: 4, name: 'Megatron', image: dialogAvatar3 },
    { id: 5, name: 'Sting', image: dialogAvatar4 },
  ],
};

export const dialogsReducer = (state: IDialogs = initialState, action: DialogsActionType): IDialogs => {
  switch (action.type) {
    case 'dialogs/ADD-MESSAGE': {
      const newMessage: IMessageSent = { id: Math.random() * 100, message: action.messages.message };
      return {
        ...state,
        messages: {
          ...state.messages,
          messageSent: [...state.messages.messageSent, newMessage],
        },
      };
    }
    default:
      return state;
  }
};
export const addMessageAC = (messages: { message: string }) => ({ type: 'dialogs/ADD-MESSAGE', messages } as const);
export type DialogsActionType = ReturnType<typeof addMessageAC>;
