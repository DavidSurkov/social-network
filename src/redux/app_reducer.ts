const initialState = {
  isInitialised: false,
};
type InitialStateType = typeof initialState;
export type AppActionType = ReturnType<typeof initialisedSuccessAC>;

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
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
