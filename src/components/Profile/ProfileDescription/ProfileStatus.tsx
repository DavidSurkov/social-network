import React, { ChangeEvent, useEffect, useState } from 'react';

type ProfileStatusType = {
  status: string;
  updateProfileStatusTC: (status: string) => void;
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
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateProfileStatusTC(status);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <>
      {!editMode && <span onDoubleClick={activateEditMode}>{status}</span>}
      {editMode && <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />}
    </>
  );
};
