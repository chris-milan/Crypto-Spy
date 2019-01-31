import React, { Component } from 'react';
import propTypes from 'prop-types';
import SaveDataItem from './SaveDataItem';

class SaveDataShown extends Component {
  render() {
    const { saveData } = this.props;

    return saveData.map(item => (
      <SaveDataItem
        key={item._id}
        savedData={item.title}
        thePath={this.props.path}
      />
    ));
  }
}

SaveDataShown.propTypes = {
  savedData: propTypes.array
};

export default SaveDataShown;
