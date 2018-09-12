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

    const { station_info } = this.props;
    console.log(this.props);
    var main = d3.select('#MainArea').append('svg').attr('left', '0px').attr('top', '0px').attr('width', width).attr('height', height);

    var MapArea = main.append('rect')
      .attr('id', 'MapArea')
      .attr("rx", 5)
      .attr("ry", 5)
      .attr('x', width * 0.025)
      .attr('y', height * 0.025)
      .attr('width', width * 0.45)
      .attr('height', height * 0.45)
      .attr('fill', 'white')
      .style("stroke", 'black')
      .style('storke-width', '1px');

    var Station = main.selectAll('circle')
      .data(station_info)
      .enter()
      .append('circle')
      .attr('fill', d => {
        if (d.color[0] == 'BL')
          return 'blue'
        else if (d.color[0] == 'BR')
          return 'brown'
        else if (d.color[0] == 'R')
          return 'red'
        else if (d.color[0] == 'G')
          return 'green'
        else if (d.color[0] == 'O')
          return 'orange'
      })
      .attr('r', 5)
      .attr('cx', (d) => (d.position[0]))
      .attr('cy', (d) => (d.position[1]))
      .on('click', (d) => {console.log(d.name)})

  }

  render() {
    const { data_set, onLoadMetroMap } = this.props;

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