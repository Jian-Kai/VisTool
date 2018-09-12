// src/components/About/index.js
import React, { Component } from 'react';
import * as d3 from 'd3'
import classnames from 'classnames';

import { Col } from 'react-bootstrap'

import './style.css';


class Volume extends Component {

  componentDidMount() {
    const width = d3.select("#MainArea").node().getBoundingClientRect().width,
      height = d3.select("#MainArea").node().getBoundingClientRect().height;
    console.log(width);

    var main = d3.select('#MainArea').append('svg').attr('left', '0px').attr('top', '0px').attr('width', width).attr('height', height);

    var map = main.append('rect')
      .attr('id', 'MapArea')
      .attr("rx", 5)
      .attr("ry", 5)
      .attr('x', width * 0.025)
      .attr('y', height * 0.025)
      .attr('width', width * 0.45)
      .attr('height', height * 0.45)
      .attr('fill', 'white')
      .style("stroke", 'black')
      .style('storke-width', '1px')

  }

  render() {
    const { data_set , onLoadMetroMap} = this.props;
    console.log(this.props)
    onLoadMetroMap();
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Wellcome to Metro Volume Visualization
        </h1>
        <div id={'MainArea'} style={{ background: 'lightgray', border: '1px solid #000', height: '820px' }}></div>
      </div>
    );
  }
}

export default Volume;