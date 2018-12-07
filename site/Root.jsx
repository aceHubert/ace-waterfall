import React from 'react';
import { Component } from '../libs';
import withStyles from '../libs/utils/withStyles';
import { Grid, Waterfall, LazyImg } from '../src';

import './styles/base.css';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomImgs = (num) => {
  return Array.from({ length: num }, () => 0).map(() => {
    return {
      image: `https://picsum.photos/${getRandomInt(200,600)}/${getRandomInt(200,600)}`,
    }
  })
}

const styles=({
  grid:{
    width: '100%',
    height: '100%',
    background: 'url(https://picsum.photos/1920/1080) center'
  }
})

class Root extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: getRandomImgs(50)
    }
  }

  componentDidMount() {    
    // window.addEventListener('resize', this.handleResize);
    // window.addEventListener('scroll', this.handleScrollBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScrollBottom);
  }

  handleResize = () => this.elWaterfall.resize()

  handleScrollBottom = () => {
    const doc = document;
    const docHeight = Math.max(
      doc.body.scrollHeight, doc.documentElement.scrollHeight,
      doc.body.offsetHeight, doc.documentElement.offsetHeight,
      doc.body.clientHeight, doc.documentElement.clientHeight
    );
    if ((window.scrollY || window.pageYOffset) + window.innerHeight * 2 >= docHeight) {
      setTimeout(() => {
        this.setState({
          items:this.state.items.concat(getRandomImgs(50))
        })
      }, 1000)
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.grid} container templateColumns="200px 1fr"  templateRows="60px 1fr 60px" templateAreas="'header header' 'sider main' 'sider footer'">
        <Grid item area="header" style={{backgroundColor: '#A62738'}}>Header</Grid>
        <Grid item area="sider" style={{backgroundColor: '#B14251'}}>Sider</Grid>
        <Grid item area="main" style={{backgroundColor: '#BC5D6A', overflow: 'auto'}}>  
          <Waterfall  columnWidth={ 198 }
            gutter={ [8,15] } 
            width={ 1120 }
            ref={(el: ?HTMLElement)=>this.elWaterfall = el}
            > 
            {
              this.state.items.map((item, index) => {
                return ( <Waterfall.Item key={ index } style={{background:'#ccc'}}>
                  <LazyImg src={ item.image }
                    placeholder={ require('./assets/empty.jpg') } 
                    onLoad={this.handleResize}> </LazyImg> 
                </Waterfall.Item>) 
              })
            } 
          </Waterfall> 
        </Grid>
        <Grid item area="footer" style={{backgroundColor: '#C77883'}}>Footer</Grid>
      </Grid>);
    }
  }

  export default withStyles(styles)(Root);


  
