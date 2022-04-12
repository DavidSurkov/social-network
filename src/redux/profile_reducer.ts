const initialState: IProfile = {
  textForNewPost: '',
  posts: [
    { id: 1, text: 'Good afternoon', likeCounter: 8 },
    { id: 2, text: 'I would like to say something', likeCounter: 4 },
    { id: 3, text: 'But I will not', likeCounter: 133 },
  ],
};

export interface IPosts {
  id: number;
  text: string;
  likeCounter: number;
}
export interface IProfile {
  textForNewPost: string;
  posts: Array<IPosts>;
}
export const profileReducer = (state: IProfile = initialState, action: ProfileActionType): IProfile => {
  switch (action.type) {
    case 'ADD-POST': {
      const newPost: IPosts = { id: Math.random() * 100, text: state.textForNewPost, likeCounter: 0 };
      return { ...state, textForNewPost: '', posts: [...state.posts, newPost] };
    }
    case 'CHANGE-NEW-TEXT':
      return { ...state, textForNewPost: action.newText };
    default:
      return state;
  }
};
export const addPostAC = () => ({ type: 'ADD-POST' } as const);
export const changeNewTextAC = (newText: string) => ({ type: 'CHANGE-NEW-TEXT', newText } as const);

export type ProfileActionType = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC>;
