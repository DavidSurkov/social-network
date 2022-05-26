import { follow, setUsers, toggleFollowingProgress, unfollow, IUser, usersReducer } from '../../redux/users_reducer';

const state = {
  users: [
    {
      name: 'David',
      id: 3,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'john',
      id: 6,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: true,
    },
  ] as IUser[],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as number[],
};
const users: IUser[] = [
  {
    name: 'Steve',
    id: 2,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: false,
  },
  {
    name: 'Kayle',
    id: 1,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null,
    },
    status: null,
    followed: true,
  },
];

it('should followed to be true', function () {
  const newState = usersReducer(state, follow(3));
  expect(newState.users[0].followed).toBe(true);
});
it('should followed to be false', function () {
  const newState = usersReducer(state, unfollow(3));
  expect(newState.users[0].followed).toBe(false);
});
it('should set two new users', function () {
  const newState = usersReducer(state, setUsers(users));
  expect(newState.users.length).toBe(2);
});
it('should toggle following to true', function () {
  const newState = usersReducer(state, toggleFollowingProgress(true, 3));
  expect(newState.followingProgress.length).toBe(1);
  expect(newState.followingProgress[0]).toBe(3);
});
it('should toggle following to false', function () {
  const newState = usersReducer(state, toggleFollowingProgress(false, 3));
  expect(newState.followingProgress.length).toBe(0);
  expect(newState.followingProgress[0]).toBe(undefined);
});
