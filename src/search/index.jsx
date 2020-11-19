import React from 'react';
import ReactDOM from 'react-dom';
import small from './images/small.png';
import yb from './images/yb.jpeg';
import './search.less';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count, common } = this.state;
    return (
      <div className="box">
        <div className="span">span test</div>

        <button
          type="button"
          onClick={() => {
            this.setState(prevState => ({ count: prevState + 1 }));
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
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById('root'));
