import React, { Component } from 'react';
import './homebody.css';

class Pagination extends Component {
  state = {
    paginations: [1, 2, 3, 4],
    currentpage: 1
  };
  PageOneHandler = event => {
    console.log(`Page ${this.state.paginations[0]} was clicked`);
  };
  PageTwoHandler = event => {
    console.log(`Page ${this.state.paginations[1]} was clicked`);
  };
  PageThreeHandler = event => {
    console.log(`Page ${this.state.paginations[2]} was clicked`);
  };
  PageFourHandler = event => {
    console.log(`Page ${this.state.paginations[3]} was clicked`);
  };
  render() {
    return (
      <div className="rightFloat">
        <div className="pageNums" onClick={this.PageOneHandler}>
          {this.state.paginations[0]}
        </div>
        <div className="pageNums" onClick={this.PageTwoHandler}>
          {this.state.paginations[1]}
        </div>
        <div className="pageNums" onClick={this.PageThreeHandler}>
          {this.state.paginations[2]}
        </div>
        <div className="pageNums" onClick={this.PageFourHandler}>
          {this.state.paginations[3]}
        </div>
        <div>Copyright &copy; {new Date().getFullYear()}</div>
      </div>
    );
  }
}

export default Pagination;
