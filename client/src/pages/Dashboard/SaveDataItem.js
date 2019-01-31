import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Aside from '../../components/overviewbody/aside';
import VisualFeedBox from '../../components/overviewbody/visualFeedBox';

class SaveDataItem extends Component {
  render() {
    const savedData = JSON.parse(this.props.savedData);

    return (
      <div>
        <div className="row overviewBody">
          <div className="col">
            <Aside key={1} data={savedData} thePath={this.props.thePath} />
          </div>

          <div className="col-8">
            <VisualFeedBox
              key={2}
              data={savedData}
              thePath={this.props.thePath}
            />
          </div>
        </div>
      </div>
    );
  }
}

SaveDataItem.propTypes = {
  savedDataItem: propTypes.object
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SaveDataItem);
