import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

class GameOverModal extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    if (this.props.open === true) {
      this.setState({ open: true });
    }
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    const { open } = this.state;
    return (
      <div>
        {/* <button onClick={this.onOpenModal}>Open modal</button> */}
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  }
}

export default GameOverModal;