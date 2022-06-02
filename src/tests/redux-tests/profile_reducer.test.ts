import {
  addPostAC,
  deletePost,
  IProfile,
  IUserProfile,
  profileReducer,
  setStatus,
  setUserProfile,
} from '../../redux/profile_reducer';

const state: IProfile = {
  posts: [
    { id: 1, text: 'Good afternoon', likeCounter: 8 },
    { id: 2, text: 'I would like to say something', likeCounter: 4 },
    { id: 3, text: 'But I will not', likeCounter: 133 },
  ],
  profile: {} as IUserProfile,
  status: '',
};
const newPost = 'Good afternoon';
const userProfile: IUserProfile = {
  contacts: {
    facebook: null,
    website: 'google.com',
    vk: null,
    twitter: null,
    instagram: 'surkovdavid',
    youtube: null,
    github: null,
    mainLink: null,
  },
  lookingForAJob: true,
  lookingForAJobDescription: null,
  fullName: null,
  userId: 6,
  photos: {
    small: 'string',
    large: 'string',
  },
};

it('should add one post', function () {
  const newState = profileReducer(state, addPostAC({ post: newPost }));
  expect(newState.posts.length).toBe(4);
});
it('should added post to be correct', function () {
  const newState = profileReducer(state, addPostAC({ post: newPost }));
  expect(newState.posts[3].text).toBe(newPost);
});
it('should previous post not to be changed', function () {
  const newState = profileReducer(state, addPostAC({ post: newPost }));
  expect(newState.posts[2].text).toBe('But I will not');
});
it('should properly set user data', function () {
  const newState = profileReducer(state, setUserProfile(userProfile));
  expect(newState.profile.contacts.instagram).toBe('surkovdavid');
});
it('should change status', function () {
  const newState = profileReducer(state, setStatus('new status'));
  expect(newState.status).toBe('new status');
});
it('should reduce number of posts by one', function () {
  const newState = profileReducer(state, deletePost(2));
  expect(newState.posts.length).toBe(2);
});
