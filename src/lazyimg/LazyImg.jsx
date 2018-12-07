import React from 'react';
import { Component, PropTypes } from '../../libs';
import withStyles from '../../libs/utils/withStyles';
import { elementOffset } from '../../libs/utils/dom'

const styels=({
  img:{
    width: '100%',
    display: 'block'
  },
  loading:{
    width: '100%',
    height: 100
  }
})


// <style type="text/css">
// @keyframes lds-ellipsis3 {
//   0%, 25% {
//     left: 32px;
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
//   50% {
//     left: 32px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   75% {
//     left: 100px;
//   }
//   100% {
//     left: 168px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
// }
// @-webkit-keyframes lds-ellipsis3 {
//   0%, 25% {
//     left: 32px;
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
//   50% {
//     left: 32px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   75% {
//     left: 100px;
//   }
//   100% {
//     left: 168px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
// }
// @keyframes lds-ellipsis2 {
//   0% {
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   25%, 100% {
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
// }
// @-webkit-keyframes lds-ellipsis2 {
//   0% {
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   25%, 100% {
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
// }
// @keyframes lds-ellipsis {
//   0% {
//     left: 32px;
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
//   25% {
//     left: 32px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   50% {
//     left: 100px;
//   }
//   75% {
//     left: 168px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   100% {
//     left: 168px;
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
// }
// @-webkit-keyframes lds-ellipsis {
//   0% {
//     left: 32px;
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
//   25% {
//     left: 32px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   50% {
//     left: 100px;
//   }
//   75% {
//     left: 168px;
//     -webkit-transform: scale(1);
//     transform: scale(1);
//   }
//   100% {
//     left: 168px;
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   }
// }
// .lds-ellipsis {
//   position: relative;
// }
// .lds-ellipsis > div {
//   position: absolute;
//   -webkit-transform: translate(-50%, -50%);
//   transform: translate(-50%, -50%);
//   width: 40px;
//   height: 40px;
// }
// .lds-ellipsis div > div {
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: #f00;
//   position: absolute;
//   top: 100px;
//   left: 32px;
//   -webkit-animation: lds-ellipsis 1.8s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
//   animation: lds-ellipsis 1.8s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
// }
// .lds-ellipsis div:nth-child(1) div {
//   -webkit-animation: lds-ellipsis2 1.8s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
//   animation: lds-ellipsis2 1.8s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
//   background: #3b4368;
// }
// .lds-ellipsis div:nth-child(2) div {
//   -webkit-animation-delay: -0.9s;
//   animation-delay: -0.9s;
//   background: #5e6fa3;
// }
// .lds-ellipsis div:nth-child(3) div {
//   -webkit-animation-delay: -0.45s;
//   animation-delay: -0.45s;
//   background: #689cc5;
// }
// .lds-ellipsis div:nth-child(4) div {
//   -webkit-animation-delay: 0s;
//   animation-delay: 0s;
//   background: #93dbe9;
// }
// .lds-ellipsis div:nth-child(5) div {
//   -webkit-animation: lds-ellipsis3 1.8s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
//   animation: lds-ellipsis3 1.8s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
//   background: #3b4368;
// }
// .lds-ellipsis {
//   width: 72px !important;
//   height: 72px !important;
//   -webkit-transform: translate(-36px, -36px) scale(0.36) translate(36px, 36px);
//   transform: translate(-36px, -36px) scale(0.36) translate(36px, 36px);
// }
// </style>

class LazyImg extends Component{

  constructor(props){
    super(props)

    this.state = {
      src: props.placeholder,
      onLoad: this.handleLoadImg
    }
  }

  componentDidMount(){
    window.addEventListener('scroll',this.handleLoadImg);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleLoadImg);
  }

  handleLoadImg = ()=>{   
    if(this.elImg && !this.isLoad)
    {
      const body=document.body,
            docElem=document.documentElement;
      const clientHeight = window.innerHeight || docElem.clientHeight || body.clientHeight,
            clientWidth = window.innerWidth || docElem.clientWidth || body.clientWidth; 
      const scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop,
            scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft;
      let {top, left} = elementOffset(this.elImg);
      top = top - scrollTop;
      left =left - scrollLeft;
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
    const { classes } = this.props;
    const { src, onLoad } = this.state
    return (<div>
      <img className={ classes.img } src={src} alt={this.props.alt || this.props.src} onLoad={onLoad} ref={(el)=> this.elImg = el} />
      <div class={classes.loading}>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
      </div>
    </div>
    );
  }
}

LazyImg.propTypes={
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  alt:  PropTypes.string,
  onLoad:  PropTypes.func
}

LazyImg.defaultProps ={
  placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
}

export default withStyles(styels)(LazyImg);