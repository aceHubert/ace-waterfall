import React, { Component } from 'react';
import { Waterfall, LazyImg } from '../src';
import { addClass, toggleClass } from '../libs/utils/dom'

class App extends Component {

  displayBanner: boolean = true;
  constructor(props) {
    super(props)
    this.state = {
      items: this.getRandomImgs(50, false),
      boxStyle: {
        marginTop: '0',
        transition: 'initial'
      },
      bannerStyle: {
        background: 'url(https://picsum.photos/1920/1080) center'
      }
    }
  }

  componentDidMount() {    
    addClass(document.body,'banner-overflow');
    window.addEventListener('scroll', this.handleScrollBottom);
    window.addEventListener('mousewheel', this.handleMouseWill)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollBottom);
    window.removeEventListener('mousewheel', this.handleMouseWill)
  }

  handleMouseWill = (event) => {
    if (event.deltaY > 100 && this.displayBanner) //up
    {
      this.setState({
        boxStyle: {
          marginTop: `-${window.innerHeight}px`,
          transition: 'all 2s ease-in-out'
        }
      })
      toggleClass(document.body,'banner-overflow--auto');
      this.displayBanner = false
    } else if ((window.scrollY || window.pageYOffset) === 0 && event.deltaY < -100 && !this.displayBanner) {
      this.setState({
        boxStyle: {
          marginTop: 0,
          transition: 'all 2s ease-in-out'
        }
      })
      toggleClass(document.body,'banner-overflow--auto');
      this.displayBanner = true;
    }
  }

  handleScrollBottom = () => {
    if (!this.displayBanner) {
      const doc = document;
      const docHeight = Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
      );
      if ((window.scrollY || window.pageYOffset) + window.innerHeight * 2 >= docHeight) {
        setTimeout(() => {
          this.setState({
            items:this.state.items.concat(this.getRandomImgs(50))
          })
        }, 1000)
      }
    }
  }

  handleResize = () => this.elWaterfall.resize();

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomImgs = (num, lazy = true) => {
    return Array.from({ length: num }, () => 0).map(() => {
      return {
        lazy: lazy,
        image: `https://picsum.photos/${this.getRandomInt(200,600)}/${this.getRandomInt(200,600)}`,
      }
    })
  }

  render() {
    return ( <div className="app" style={ this.state.boxStyle } >
      <div className="app-banner" style={ this.state.bannerStyle } ></div> 
      <div className="app-container">
        <Waterfall column={ 5 }
          columnWidth={ 198 }
          gutter={ 10 }
          ref={ el => this.elWaterfall = el } > 
          {
            this.state.items.map((item, index) => {
              return ( <Waterfall.Item key={ index } >
                <LazyImg src={ item.image }
                  lazy={ item.lazy }
                  placeholder={ require('./assets/empty.jpg') }
                  onLoad={ this.handleResize } > </LazyImg> 
              </Waterfall.Item>) 
            })
          } 
        </Waterfall> 
      </div>
    </div>
      );
    }
  }

  export default App;
