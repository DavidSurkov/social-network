import dialogAvatar from './../images/dialogAvatar.jpg';
import dialogAvatar1 from './../images/dialogAvatar1.jpg';
import dialogAvatar2 from './../images/dialogAvatar2.jpg';
import dialogAvatar3 from './../images/dialogAvatar3.jpg';
import dialogAvatar4 from './../images/dialogAvatar4.png';
import { addPostAC, changeNewTextAC, ProfileActionType, profileReducer } from './profile_reducer';
import { addMessageAC, changeNewMessageAC, DialogsActionType, dialogsReducer } from './dialogs_reducer';
import { sidebarReducer } from './sidebar_reducer';

interface IPosts {
  id: number;
  text: string;
  likeCounter: number;
}
interface IProfile {
  textForNewPost: string;
  posts: Array<IPosts>;
}
interface IMessageSent {
  id: number;
  message: string;
}
interface IMessageReceived {
  id: number;
  message: string;
}
interface IMessage {
  textForNewMessage: string;
  messageSent: Array<IMessageSent>;
  messageReceived: Array<IMessageReceived>;
}
interface IDialogs {
  messages: IMessage;
  users: Array<IUsers>;
}
interface IUsers {
  id: number;
  name: string;
  image: string;
}
interface IFriends {
  id: number;
  name: string;
  image: string;
}
interface ISidebar {
  friends: Array<IFriends>;
}

interface IState {
  profileData: IProfile;
  dialogsData: IDialogs;
  sidebar: ISidebar;
}

interface IStore {
  _state: IState;
  _onChange: () => void;
  subscribe: (observer: () => void) => void;
  getState: () => IState;
  dispatch: (action: ActionTypes) => void;
}

type ActionTypes = ProfileActionType | DialogsActionType;

export const store: IStore = {
  _state: {
    profileData: {
      textForNewPost: '',
      posts: [
        { id: 1, text: 'Good afternoon', likeCounter: 8 },
        { id: 2, text: 'I would like to say something', likeCounter: 4 },
        { id: 3, text: 'But I will not', likeCounter: 133 },
      ],
    },
    dialogsData: {
      messages: {
        textForNewMessage: '',
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
    },
    sidebar: {
      friends: [
        { id: 1, name: 'Sam', image: dialogAvatar },
        { id: 2, name: 'Karen', image: dialogAvatar1 },
        { id: 3, name: 'Samanta', image: dialogAvatar2 },
      ],
    },
  },
  _onChange() {
    console.log('state has changed');
  },
  subscribe(observer) {
    this._onChange = observer;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    // @ts-ignore
    this._state.profileData = profileReducer(this._state.profileData, action);
    // @ts-ignore
    this._state.dialogsData = dialogsReducer(this._state.dialogsData, action);
    this._onChange();
    //this._state.sidebar = sidebarReducer(this._state.sidebar, action);
  },
};
