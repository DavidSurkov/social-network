import { authoriseReducer, AuthoriseStateType, setUserData } from '../../redux/authorise_reducer';

const initialState = {} as AuthoriseStateType;

it('should add authorise data', function () {
  const state = authoriseReducer(initialState, setUserData(2, 'surkovdavid@gmail.com', 'dave', true));
  expect(state.email).toBe('surkovdavid@gmail.com');
  expect(state.userId).toBe(2);
  expect(state.login).toContain('dave');
});
