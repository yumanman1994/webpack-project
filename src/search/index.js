import React from 'react';
import ReactDOM from 'react-dom';
import add from 'yxm-large-number';
import small from './images/small.png';
import yb from './images/yb.jpeg';
import './search.less';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      num: add('9999999994234234234243243249', '4234234234299999999999'),
    };
  }

  render() {
    const { count, common, num } = this.state;
    return (
      <div className="box">
        <div className="span">span test</div>
        <button
          type="button"
          onClick={() => {
            this.setState(prevState => ({
              count: prevState.count + 1,
            }));
          }}
        >
          click
          {count}
        </button>
        <div>
          <img src={small} alt="small" />
        </div>
        <div>
          <img src={yb} alt="yb" />
        </div>
        <p>{common}</p>
        <p>{num}</p>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById('root'));
