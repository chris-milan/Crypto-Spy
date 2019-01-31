import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/saveDataActions';
import {
  fetchTheSavedData,
  checkIfLoading
} from '../../reducers/saveDataReducer';
import SaveDataShown from './SaveDataShown';

import Header from '../../components/header';
import Spinner from '../../components/common/Spinner';
import './dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getSaves();
    this.props.setSavesLoading();
  }

  render() {
    let theSavedData = this.props.savedData;
    console.log('theSavedData', theSavedData);

    let thePath = this.props.match.path;

    let savedDataContent;

    if (theSavedData === null || theSavedData.length === 0) {
      savedDataContent = <div className="spinner"><Spinner /></div>;
    } else {
      savedDataContent = (
        <SaveDataShown saveData={theSavedData} path={thePath} />
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <Header />
          <div className="row dashboardContainer">{savedDataContent}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getSaves: propTypes.func.isRequired,
  setSavesLoading: propTypes.func.isRequired,
  savedData: propTypes.array,
  individualSave: propTypes.object,
  loading: propTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getSaves: () => {
      dispatch(actionCreators.getSaves());
    },
    setSavesLoading: () => {
      dispatch(actionCreators.setSavesLoading());
    }
  };
};

const mapStateToProps = state => ({
  savedData: fetchTheSavedData(state),
  loading: checkIfLoading(state),
  individualSave: state.individualSave
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
