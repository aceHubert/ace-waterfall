import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from '../../libs'


class WaterfallItem extends Component {
  componentDidMount(){
    const node = ReactDOM.findDOMNode(this);
    if(node instanceof HTMLElement)
    {
      this.node = node;
    }   
  }

  render() {
    let classname = this.classNames('el-waterfall__item');
    return ( 
      <div className={this.className(classname)} style={this.style()}>
        {this.props.children}
      </div>
    );
  }
}

export default WaterfallItem
