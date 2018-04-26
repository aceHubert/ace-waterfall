// @flow

import React from 'react'
import { Component } from '../../libs'

type Props ={
  column: number,
  columnWidth?: number,
  gutter: number
};

class Waterfall extends Component<Props> {

  static defaultProps ={
    colunm: 4,
    getter: 0
  }

  container: ?HTMLDivElement;

  componentDidMount(){
    this.setPosition();
    window.addEventListener('resize',this.resize);
  }

  componentDidUpdate(){
    this.setPosition();
  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize);
  }

  resize = ()=>this.setPosition()

  setPosition=()=>{
    let { column, columnWidth, gutter } = this.props;
   
    if(this.container)
    {
      let containerWidth = this.container.offsetWidth;   
      let children = this.container.children; 
      let newColumn = columnWidth ? Math.floor(containerWidth/(columnWidth+gutter)):column;
      let newColumnWidth=columnWidth ? columnWidth : Math.floor((containerWidth-gutter*(column+1))/column); 
      let columnHeights=Array.from({ length: newColumn }, () => gutter);

      for(let i= 0;i< children.length;i++){
        const child = children[i];
        const minValue = Math.min(...columnHeights);
        const shortestColumnIndex = columnHeights.indexOf(minValue);
        const left = ( newColumnWidth + gutter ) * shortestColumnIndex + gutter;
        const top = columnHeights[shortestColumnIndex] ;        
        columnHeights[shortestColumnIndex] +=child.offsetHeight + gutter;
        child.style.position = 'absolute';
        child.style.left = `${left}px`;
        child.style.top = `${top}px`;
        child.style.width = `${newColumnWidth}px`;
      }
    }
  }

  render() {
    let classname = this.classNames('el-waterfall');
    let style = {
      position: 'relative'
    }
    return ( 
      <div className={this.className(classname)} style={this.style(style)} ref={(el: ?HTMLDivElement)=>this.container = el}>
        {this.props.children}
      </div>
    );
  }
}

export default Waterfall;
