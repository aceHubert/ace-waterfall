import React from 'react'
import { Component, PropTypes } from '../../libs'
import { setStyle } from '../../libs/utils/dom'

class Waterfall extends Component {
  constructor(props) {
    super(props)

    if(Array.isArray(props.gutter)){
      this.gutter={
        h: props.gutter[0],
        v: props.gutter[1]
      }
    } else{
      this.gutter={
        h:props.gutter,
        v:props.gutter
      }
    }
    this.columns = props.columnWidth ? Math.floor(props.width/(props.columnWidth+this.gutter.h)):props.columns;
    this.columnWidth=props.columnWidth ? props.columnWidth : Math.floor((props.width-this.gutter.h*(props.columns+1))/props.columns); 
  }
  componentDidMount(){
    this._setLayout()
  }

  componentDidUpdate(){
      this._setLayout()    
  }

  resize = ()=> this._setLayout();

  _setLayout =()=>{ 
    let columnHeights=Array.from({ length: this.columns }, () => this.gutter.v);
    this.childrenRefs.forEach((child)=>{
      if(child && child.node)
      {
        const minValue = Math.min(...columnHeights);
        const shortestColumnIndex = columnHeights.indexOf(minValue);
        const left = ( this.columnWidth + this.gutter.h ) * shortestColumnIndex + this.gutter.h;        
        const top = columnHeights[shortestColumnIndex] ;        
        columnHeights[shortestColumnIndex] += child.node.offsetHeight + this.gutter.v;
        let calculatedStyle = Object.assign({},this.props.useCSSTransforms?{
          transform: `translate(${left}px, ${top}px)`,
          transitionProperty: 'transform'
        }:{
          left: `${left}px`,
          top: `${top}px`,
          transitionProperty: 'left, top'
        });
        setStyle(child.node,calculatedStyle)
      }
    })
  }

  _renderItemDom(){
    this.childrenRefs= Array.from({length:this.props.children.length},()=> null);
    return React.Children.map(this.props.children,(child,index)=>{   
      return React.cloneElement(child, {
        ref:(item)=> this.childrenRefs[index]= item,
        style: Object.assign({}, child.props.style, {
          width: `${this.columnWidth}px`,
          position:'absolute',    
          overflow: 'hidden',
          touchAction: 'none',
          transition: 'all 500ms ease'  
        })
      });
    })
  }

  render() {
    let classname = this.classNames('el-waterfall');
    let style = {
      position: 'relative'
    }
    return ( 
      <div className={this.className(classname)} style={this.style(style)}>
        {this._renderItemDom()}
      </div>
    );   
  }
}

Waterfall.propTypes={
  columns: PropTypes.positiveInteger,
  columnWidth: PropTypes.positiveInteger,
  gutter: PropTypes.oneOfType([PropTypes.positiveInteger,PropTypes.arrayOf(PropTypes.positiveInteger)]),
  width: PropTypes.positiveInteger,
  useCSSTransforms: PropTypes.bool
}

Waterfall.defaultProps ={
  cols: 5,
  getter: 10,
  useCSSTransforms: true
}


export default Waterfall
