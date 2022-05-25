import dialogAvatar from '../../images/dialogAvatar.jpg';
import { addMessageAC, dialogsReducer, IDialogs } from '../../redux/dialogs_reducer';

const initialState: IDialogs = {
  messages: {
    messageSent: [{ id: 1, message: 'Hello, you are a friend of mine' }],
    messageReceived: [{ id: 1, message: 'How are you' }],
  },
  users: [{ id: 1, name: 'Max', image: dialogAvatar }],
};
it('should add new message correct', function () {
  const state = dialogsReducer(initialState, addMessageAC({ message: 'hoho' }));
  expect(state.messages.messageSent[1].message).toBe('hoho');
  expect(state.messages.messageSent[0].message).toBe('Hello, you are a friend of mine');
});
