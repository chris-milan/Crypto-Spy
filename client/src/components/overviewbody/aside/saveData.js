import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addSave } from '../../../actions/saveDataActions';
import './aside.css';

class SaveData extends Component {
  state = {
    isSaved: false
  };
  saveDataHandler = e => {
    e.preventDefault();

    const newSave = {
      title: JSON.stringify(this.props.saveData)
    };

    this.props.addSave(newSave);

    this.setState({
      isSaved: true
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    let saveButtonWorking = (
      <h3 onClick={this.saveDataHandler.bind(this)} className="save-status">Save Coin Data</h3>
    );

    if (this.props.thePath) {
      saveButtonWorking = <h3 className="save-status">Delete Coin Data</h3>;
    }

    const isItSaved = (
      <div>
        {this.state.isSaved ? (
          <h3 className="loginToSave">Your Data Has Been Saved</h3>
        ) : (
          saveButtonWorking
        )}
      </div>
    );

    const saveDemo = (
      <div>
        <h3 className="loginToSave">Login to save data for this coin.</h3>
      </div>
    );

    return (
      <div className="save-data-button">
        {isAuthenticated ? isItSaved : saveDemo}
      </div>
    );
  }
}

SaveData.propTypes = {
  addSave: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addSave }
)(SaveData);
