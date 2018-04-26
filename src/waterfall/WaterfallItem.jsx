// @flow

import React from 'react';
import { Component } from '../../libs'

type Props = {
  style?: Object
};

class WaterfallItem extends Component<Props> {

  render() {
    let {style,...otherProps} = this.props
    let classname = this.classNames('el-waterfall__item');
    return ( 
      <div className={this.className(classname)} style={this.style()} {...otherProps}>
        {this.props.children}
      </div>
    );
  }
}

export default WaterfallItem;
