import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

//Styles
const StatusStyle = styled.div`
  display: flex;
  margin: 0 10px;
  flex-direction: column;
  min-width: 250px;
`;
const StyledInput = styled.input`
  width: 240px;
`;
const StyledSpan = styled.span``;

type ProfileStatusType = {
  status: string;
  updateProfileStatusTC: (status: string) => void;
  isOwner: boolean;
};

/*export class ProfileStatus extends React.Component<ProfileStatusType> {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateProfileStatusTC(this.state.status);
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };
  componentDidUpdate(
    prevProps: Readonly<ProfileStatusType>,
    prevState: Readonly<{ editMode: boolean; status: string }>,
  ) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode && <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>}
        {this.state.editMode && (
          <input
            onChange={this.onStatusChange}
            autoFocus={true}
            onBlur={this.deactivateEditMode}
            value={this.state.status}
          />
        )}
      </>
    );
  }
}*/
export const ProfileStatus = (props: ProfileStatusType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    props.isOwner && setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateProfileStatusTC(status);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <StatusStyle>
      <span>Status:</span>
      {!editMode && <StyledSpan onDoubleClick={activateEditMode}>{status}</StyledSpan>}
      {editMode && (
        <StyledInput onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
      )}
    </StatusStyle>
  );
};
