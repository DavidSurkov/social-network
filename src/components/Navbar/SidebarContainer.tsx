import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import { ISidebar } from '../../redux/sidebar_reducer';
import { Sidebar } from './Sidebar';
import { AuthoriseStateType } from '../../redux/authorise_reducer';

interface IMapStateToProps {
  sidebar: ISidebar;
  authentication: AuthoriseStateType;
}

const mapStateToProps = (state: AppRootStateType): IMapStateToProps => {
  return {
    sidebar: state.sidebar,
    authentication: state.authentication,
  };
};

export const SidebarContainer = connect(mapStateToProps)(Sidebar);
