import React from 'react'
import ReactDOM from 'react-dom'
import { funcA } from './tree-shaking'
import { Apple } from './componetns'
import { common } from '../../common/index'
import yb from './images/yb.jpeg'
import small from './images/small.png'

import './search.less'

class Search extends React.Component {
  state = {
    count: 0,
    common: common(),
  }
  render() {
    const appleModel = new Apple({
      model: 'IphoneX',
    }).getModel()

    console.log(appleModel)
    return (
      <div className="box">
        <div className="span">span test</div>

        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            })
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
        <p>{this.state.common}</p>
      </div>
    )
  }
}

ReactDOM.render(<Search />, document.getElementById('root'))
