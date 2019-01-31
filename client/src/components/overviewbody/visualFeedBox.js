import React, { Component } from 'react';
import WhisperBox from './visualFeedBox/whisperBox';
import TheChart from './highcharts/chart';
import './overviewbody.css';

class VisualFeedBox extends Component {
  state = {
    showChart: false
  };

  showWhispersHandler = () => {
    console.log(`SHOW WHISPERS`);
    this.setState({
      showChart: false
    });
  };

  showChartHandler = () => {
    console.log(`SHOW CHART`);
    this.setState({
      showChart: true
    });
  };

  render() {
    const whisperView = <WhisperBox key={2} data={this.props.data} />;
    const chartView = <TheChart key={3} theData={this.props.data} />;

    return (
      <div>
        <div
          onClick={this.showWhispersHandler}
          className="nav-link seeWhispersHeader"
        >
          See The Whispers
        </div>
        <div
          onClick={this.showChartHandler}
          className="nav-link seeChartHeader rightFloat"
        >
          Chart
        </div>
        <div>{this.state.showChart ? chartView : whisperView}</div>
      </div>
    );
  }
}
export default VisualFeedBox;
