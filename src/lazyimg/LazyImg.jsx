// @flow

import React from 'react'
import { Component } from '../../libs'

type Porps ={
  src: string,
  placeholder: string,
  alt?: string,
  lazy: boolean,
  onLoad?: Function
};

type States ={
  src: string,
  onLoad: Function
};

class LazyImg extends Component<Porps,States>{

  static defaultProps ={
    placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    lazy: true
  }

  elImg: ?HTMLImageElement;
  isLoad: boolean;
  constructor(props: any){
    super(props)

    this.isLoad = !props.lazy;
    this.state = {
      src: props.lazy?props.placeholder:props.src,
      onLoad:props.lazy? this.handleLoadImg:props.onLoad
    }
  }

  componentDidMount(){
    this.props.lazy && window.addEventListener('scroll',this.handleLoadImg);
  }

  componentWillUnmount(){
    this.props.lazy && window.removeEventListener('scroll',this.handleLoadImg);
  }

  handleLoadImg = ()=>{   
    if(this.elImg && !this.isLoad)
    {
      const clientHeight = window.innerHeight || (document.documentElement&&document.documentElement.clientHeight) || 0;
      const clientWidth = window.innerWidth || (document.documentElement&&document.documentElement.clientWidth) || 0;
      const { left, top } = this.elImg.getBoundingClientRect();
      if(top > 0 && left > 0 && left <= clientWidth && top <= clientHeight){  //判断图片  
        this.isLoad = true;
        this.setState({
          src:this.props.src,
          onLoad:this.props.onLoad
        }) 
      }
    }  
  } 

  render(){
    const { src, onLoad } = this.state
    return (
      <img src={src} alt={this.props.alt || this.props.src} onLoad={onLoad} ref={(el: ?HTMLImageElement)=> this.elImg = el} />
    );
  }
}

export default LazyImg