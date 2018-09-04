import React, { Component } from 'react';
import { Col, } from 'react-bootstrap'
import * as d3 from "d3";
//import { select } from 'd3-selection'


class Contentlist extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        let { content } = this.props
        let line = content.split("\n")

        let row_key = line[0].split(",").slice(1);
        let col_key = [];
        let data_set = [];

        for (var i = 1; i < line.length; i++) {
            col_key.push(line[i].split(",")[0])
        }

        for (var i = 1; i < line.length - 1; i++) {
            data_set[i - 1] = [];
            var temp = line[i].split(",")
            for (var j = 0; j < temp.length - 1; j++) {
                data_set[i - 1][j] = temp[j];
            }
        }
        /*
        console.log(row_key)
        console.log(col_key)
        console.log(data_set)
        */
        this.state = {
            row_key: row_key,
            col_key: col_key,
            data_set: data_set
        }

    }

    componentDidMount() {
        const width = 60 * this.state.col_key.length,
            height = d3.select("#col").node().getBoundingClientRect().height * 0.9;
        console.log(d3.select("#col").node().getBoundingClientRect())

        var table = d3.select("#col").append("svg");
        table.attr('width', width)
            .attr('height', height)
        //d3 create table head
        table.selectAll('rect')
            .data(this.state.col_key)
            .enter()
            .append('rect')
            .attr('width', 60)
            .attr('height', 20)
            .attr('y', 10)
            .attr('x', (d, i) => (60 * i))
            .attr('fill', 'white')
            .style("stroke", 'black')
            .style("stroke-width", '1px')

        table.selectAll('text')
            .data(this.state.col_key)
            .enter()
            .append('text')
            .attr('y', 25)
            .attr('x', (d, i) => (60 * i) + 2)
            .text((d) => d)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("text-align", "center")
            .attr("fill", "black");


    }

    render() {
        let { style } = this.props

        return (
            <Col md={10} mdOffset={1} style={style}>
                <Col id={"col"} md={10} mdOffset={1} style={{ background: 'white', height: "700px", overflow: 'auto' }}>

                </Col>
            </Col>
        )
    }

}



export default Contentlist;