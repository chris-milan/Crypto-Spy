import React, { Component } from 'react';
import Theme from './theme';
import Highcharts from 'highcharts/highstock';
import '../overviewbody.css';
import {
  HighchartsStockChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Navigator,
  RangeSelector,
  Tooltip,
  LineSeries
} from 'react-jsx-highstock';

Highcharts.createElement(
  'link',
  {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
  },
  null,
  document.getElementsByTagName('head')[0]
);

// Apply the theme
Highcharts.setOptions(Theme);

const createDataPoint = (time = Date.now(), magnitude = 100, offset = 0) => {
  return [time + offset * magnitude, Math.round(Math.random() * 100 * 2) / 2];
};

const createRandomData = (time, magnitude, points = 100) => {
  const data = [];
  let i = points * -1 + 1;
  for (i; i <= 0; i++) {
    data.push(createDataPoint(time, magnitude, i));
  }
  return data;
};

const addDataPoint = (data, toAdd) => {
  const newData = data.slice(0); // Clone
  const temp = [Date.now(), toAdd];
  newData.push(temp);
  return newData;
};

class TheChart extends Component {
  constructor(props) {
    super(props);
    this.updateLiveData = this.updateLiveData.bind(this);

    const now = Date.now();
    this.state = {
      highChartData: createRandomData(now),
      liveUpdate: false
    };
  }

  componentDidMount() {
    this.handleStartLiveUpdate();
  }

  updateLiveData() {
    const { highChartData } = this.state;

    this.setState({
      highChartData: addDataPoint(highChartData, this.props.theData.OneMin)
    });
  }

  handleStartLiveUpdate(e) {
    e && e.preventDefault();
    this.setState({
      liveUpdate: window.setInterval(this.updateLiveData, 1000)
    });
  }

  render() {
    const { highChartData } = this.state;

    return (
      <div className="TheChart">
        <HighchartsStockChart>
          <Chart zoomType="x" />

          <RangeSelector>
            <RangeSelector.Button count={1} type="day">
              1d
            </RangeSelector.Button>
            <RangeSelector.Button count={12} type="hour">
              12h
            </RangeSelector.Button>
            <RangeSelector.Button count={6} type="hour">
              6h
            </RangeSelector.Button>
            <RangeSelector.Button count={4} type="hour">
              4h
            </RangeSelector.Button>
            <RangeSelector.Button count={2} type="hour">
              2h
            </RangeSelector.Button>
            <RangeSelector.Button count={1} type="hour">
              1h
            </RangeSelector.Button>
            <RangeSelector.Button count={30} type="minute">
              30m
            </RangeSelector.Button>
            <RangeSelector.Button count={15} type="minute">
              15m
            </RangeSelector.Button>
            <RangeSelector.Button count={10} type="minute">
              10m
            </RangeSelector.Button>
            <RangeSelector.Button count={5} type="minute">
              5m
            </RangeSelector.Button>
            <RangeSelector.Button count={3} type="minute">
              3m
            </RangeSelector.Button>
            <RangeSelector.Button count={1} type="minute">
              1m
            </RangeSelector.Button>
            <RangeSelector.Button type="all">All</RangeSelector.Button>
            <RangeSelector.Input boxBorderColor="#7cb5ec" />
          </RangeSelector>

          <Tooltip />

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Mentions Count</YAxis.Title>
            <LineSeries name="Show Mentions" data={highChartData} />
          </YAxis>

          <Navigator />
        </HighchartsStockChart>
      </div>
    );
  }
}

export default withHighcharts(TheChart, Highcharts);
