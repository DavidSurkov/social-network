import dialogAvatar from '../images/dialogAvatar.jpg';
import dialogAvatar1 from '../images/dialogAvatar1.jpg';
import dialogAvatar2 from '../images/dialogAvatar2.jpg';

export interface IFriends {
  id: number;
  name: string;
  image: string;
}

const initialState = {
  friends: [
    { id: 1, name: 'Sam', image: dialogAvatar },
    { id: 2, name: 'Karen', image: dialogAvatar1 },
    { id: 3, name: 'Samanta', image: dialogAvatar2 },
  ] as Array<IFriends>,
};
export type ISidebar = typeof initialState;

export const sidebarReducer = (state: ISidebar = initialState, action: any): ISidebar => {
  return state;
};
