const initialState = {
  isInitialised: false,
};
type InitialStateType = typeof initialState;
type ActionType = ReturnType<typeof initialisedSuccessAC>;

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'app/INITIALISED-SUCCESS':
      return { ...state, isInitialised: true };

    default:
      return state;
  }
};

export const initialisedSuccessAC = () =>
  ({
    type: 'app/INITIALISED-SUCCESS',
  } as const);
/*
export const initialiseAppTC = () => (dispatch: Dispatch<any>) => {
    try {
       await dispatch(initialiseAuthDataTC());

    }
};
*/
