import React from 'react';
import { Component, PropTypes } from '../../libs'
import withStyles from '../../libs/utils/withStyles'

const styles =({
  container: props=>Object.assign({
    display: 'grid',
    gridTemplateColumns: props.templateColumns || `repeat(${props.columns}, 1fr)`,
  },
    props.templateRows && {gridTemplateRows: props.templateRows},
    props.templateAreas && {gridTemplateAreas: props.templateAreas},
    props.justifyItems && {justifyItems: props.justifyItems},
    props.alignItems && {alignItems: props.alignItems},
    props.justifyContent && {justifyContent: props.justifyContent},
    props.alignContent && {alignContent: props.alignContent},
    props.gap && {gridGap: Array.isArray(props.gap)? props.gap.slice(0,2).map(g=>g +'px').join(' '): props.gap + 'px'},
    props.autoColumns &&{gridAutoColumns: props.autoColumns},
    props.autoRows &&{gridAutoRows: props.autoRows},
    props.autoFlow && {gridAutoFlow: props.autoFlow}
  ),
  item: props=>Object.assign({},
    props.column && {gridColumn: props.column},
    props.row && {gridRow: props.row},
    props.area && {gridArea: props.area},
    props.justifySelf && {justifySelf: props.justifySelf},
    props.alignSelf && {alignSelf: props.alignSelf}
  )
})

class Grid extends Component {

  render() {
    const { classes, container, item} = this.props;
    const classname = this.classNames(container && classes.container + ' el-grid', !container && item && classes.item + ' el-grid-item');
    return ( 
      <div className={this.className(classname)} style={this.style()}>
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes={
  columns: PropTypes.positiveInteger,

  //Grid
  container: PropTypes.bool,
  /**
   * grid-template-columns: <track-size> ... | <line-name> <track-size> ...
   * 定义列模板
   *  40px 50px auto 50px 40px | repeat(3, 20px [col-start]) 5% | 1fr 1fr 1fr
   */
  templateColumns:PropTypes.any,
  /**
   * grid-template-rows: <track-size> ... | <line-name> <track-size> ...
   * 定义行模板
   *  25% 100px auto 
   */
  templateRow:PropTypes.any,
  /**
   * grid-template-areas: "<grid-area-name> | . | none | ..." "..."
   * 定义区域模板
   *  "header header header header"   
      "main main . sidebar"   
      "header footer header footer";

      .item-a{
        area: header
      } 
   */
  templateAreas: PropTypes.any,  
  /**
   * grid-gap: <grid-row-gap> <grid-column-gap>
   * 定义间距
   *  10px | 10px 15px
   */
  gap: PropTypes.oneOfType([PropTypes.positiveInteger, PropTypes.arrayOf(PropTypes.positiveInteger)]),
  /**
   * justify-items: start | end | center | stretch
   * 定义子项列对齐方式
   */
  justifyItems : PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /**
   * align-items: start | end | center | stretch
   * 定义子项行对齐方式
   */
  alignItems : PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /**
   * justify-content: start | end | center | stretch | space-around | space-between | space-evenly 
   * 定义垂直对齐方式
   */
  justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),
  /**
   * justify-content: start | end | center | stretch | space-around | space-between | space-evenly 
   * 定义水平对齐方式
   */
  alignContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']),
  /**
   * grid-auto-columns: <track-size>
   * 定义一个设置大小尺寸的轨道
   * 60px | 20% | 2fr
   */
  autoColumns: PropTypes.any,
  /**
   * grid-auto-rows: <track-size>
   * 定义一个设置大小尺寸的轨道
   * 100px | minmax(100px, auto)
   */
  autoRows: PropTypes.any,
  /**
   * grid-auto-flow: row | column | row dense | column dense
   * 定义网格排列顺序
   */
  autoFlow: PropTypes.oneOf(['row', 'column', 'row dense', 'column dense']),

  //Item
  item: PropTypes.bool,
  /**
   * grid-column: <start-line> / <end-line> | <start-line> / span <value>
   * 定义列跨度
   * 1 / 3 | start-line / 5 | 1 / span 2
   */
  column: PropTypes.any,
  /**
   * grid-row: <start-line> / <end-line> | <start-line> / span <value>
   * 定义行跨度
   * 1 / 3 
   */
  row: PropTypes.any,
  /**
   * grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>
   * 定义区域
   * header | 1 / col4-start / last-line / 6  
   */
  area: PropTypes.any,
  /**
   * justify-self: start | end | center | stretch
   * 定义单一子项列对齐方式
   * 
   */
  justifySelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /**
   * align-self: start | end | center | stretch
   * 定义单一子项行对齐方式
   * 
   */
  alignSelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
}

Grid.defaultProps={
  columns: 2
}

export default withStyles(styles)(Grid)
