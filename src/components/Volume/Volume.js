// src/components/About/index.js
import React, { Component } from 'react';
import * as d3 from 'd3'
import classnames from 'classnames';

import { Col } from 'react-bootstrap'

import './style.css';


class Volume extends Component {

  constructor(props) {
    super(props);
    const { station_info } = this.props;
    const R = station_info.filter(station => {
      for (var i = 0; i < station.color.length; i++) {
        if (station.color[i] == 'R' && station.id[i] != 'R22A')
          return true
      }
    }).sort((a, b) => {
      var aid, bid;
      for (var i = 0; i < a.color.length; i++) {
        if (a.color[i] == 'R')
          aid = a.id[i].slice(1, a.id[i].length)
      }
      for (var i = 0; i < b.color.length; i++) {
        if (b.color[i] == 'R')
          bid = b.id[i].slice(1, b.id[i].length)
      }

      return aid - bid
    })
    console.log(R)

    this.state = {
      "RLine": R
    }
  }

  componentDidMount() {
    const width = d3.select("#MainArea").node().getBoundingClientRect().width,
      height = d3.select("#MainArea").node().getBoundingClientRect().height;

    const { station_info } = this.props;
    //console.log(this.props);
    var main = d3.select('#MainArea').append('svg').attr('left', '0px').attr('top', '0px').attr('width', width).attr('height', height);
    let mapmax = [d3.max(station_info, (a) => (a.position[0])), d3.max(station_info, (a) => (a.position[1]))],
      mapmin = [d3.min(station_info, (a) => (a.position[0])), d3.min(station_info, (a) => (a.position[1]))];

    var MapArea = main.append('rect')
      .attr('id', 'MapArea')
      .attr("rx", 5)
      .attr("ry", 5)
      .attr('x', mapmin[0] - 10)
      .attr('y', mapmin[1] - 30 - 10)
      .attr('width', (mapmax[0] - mapmin[0]) + 20)
      .attr('height', (mapmax[1] - mapmin[1]) + 20)
      .attr('fill', 'white')
      .style("stroke", 'black')
      .style('storke-width', '1px');

    var line = d3.line()
      .x(d => d.position[0])
      .y(d => d.position[1] - 30)
      
    console.log(line(this.state.RLine))
    var MetroLine = main.append('path')
      //.data(this.state.RLine)
      .attr('d', line(this.state.RLine))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "none")

    var Station = main.selectAll('circle')
      .data(station_info)
      .enter()
      .append('circle')
      .attr('fill', d => {
        if (d.color[0] == 'BL')
          return 'blue'
        else if (d.id[0] == 'R22A')
          return 'pink'
        else if (d.color[0] == 'BR')
          return 'brown'
        else if (d.color[0] == 'R')
          return 'red'
        else if (d.color[0] == 'G')
          return 'green'
        else if (d.color[0] == 'O')
          return 'orange'

      })
      .attr('r', 4)
      .attr('cx', (d) => (d.position[0]))
      .attr('cy', (d) => (d.position[1] - 30))
      .on('click', (d) => { console.log(d.name); console.log(d.position) })

  }

  render() {
    const { } = this.props;
    const w = parseInt(window.innerWidth, 10);
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Wellcome to Metro Volume Visualization
        </h1>
        <div id={'MainArea'} style={{ background: 'lightgray', border: '1px solid #000', height: '850px', width: ((w * 0.95) + "px"), left: ((w * 0.025) + "px"), position: "absolute" }}></div>
      </div>
    );
  }
}

export default Volume;