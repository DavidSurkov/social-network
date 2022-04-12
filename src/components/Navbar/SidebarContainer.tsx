import { AppRootStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import { ISidebar } from '../../redux/sidebar_reducer';
import { Sidebar } from './Sidebar';

interface IMapStateToProps {
  sidebar: ISidebar;
}

const mapStateToProps = (state: AppRootStateType): IMapStateToProps => {
  return {
    sidebar: state.sidebar,
  };
};

export const SidebarContainer = connect(mapStateToProps)(Sidebar);
