import { addMessageAC, changeNewMessageAC, IDialogs } from '../../redux/dialogs_reducer';
import { connect } from 'react-redux';
import { Dialogs } from './Dialogs';
import { AppRootStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

interface IMapStateToProps {
  dialogsData: IDialogs;
  isLogged: boolean;
}
interface IMapDispatchToProps {
  addMessage: () => void;
  changeNewMessage: (text: string) => void;
}

const mapStateToProps = (state: AppRootStateType): IMapStateToProps => {
  return {
    dialogsData: state.dialogsData,
    isLogged: state.authentication.isLogged,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
  return {
    changeNewMessage: (text: string) => {
      dispatch(changeNewMessageAC(text));
    },
    addMessage: () => {
      dispatch(addMessageAC());
    },
  };
};

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));
