import { addMessageAC, changeNewMessageAC, IDialogs } from '../../redux/dialogs_reducer';
import { connect } from 'react-redux';
import { Dialogs } from './Dialogs';
import { AppRootStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';

interface IMapStateToProps {
  dialogsData: IDialogs;
}
interface IMapDispatchToProps {
  addMessage: () => void;
  changeNewMessage: (text: string) => void;
}

const mapStateToProps = (state: AppRootStateType): IMapStateToProps => {
  debugger;
  return {
    dialogsData: state.dialogsData,
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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
