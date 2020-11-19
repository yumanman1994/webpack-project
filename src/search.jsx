import React from 'react';
import ReactDOM from 'react-dom';
import small from './images/small.png';
import yb from './images/yb.jpeg';
import './search.less';
class Search extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <div className="box">
        <div className="span">span test</div>

        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          click{this.state.count}
        </button>
        <div>
          <img src={small} alt="small" />
        </div>
        <div>
          <img src={yb} alt="yb" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById('root'));
