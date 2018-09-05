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

        let row_key = line[0].split(",");
        let col_key = [];
        let data_set = [];

        row_key[0] = '#';

        for (var i = 1; i < line.length; i++) {
            col_key.push(line[i].split(",")[0])
        }

        for (var i = 1; i < line.length - 1; i++) {
            data_set[i - 1] = [];
            var temp = line[i].split(",")
            for (var j = 0; j < temp.length; j++) {
                data_set[i - 1][j] = temp[j];
            }
        }

        //console.log(row_key)
        //console.log(col_key)
        console.log(data_set)

        this.state = {
            row_key: row_key,
            col_key: col_key,
            data_set: data_set,
        }

    }

    componentDidMount() {
        const width = 60 * this.state.col_key.length,
            height = d3.select("#col").node().getBoundingClientRect().height;
        console.log(d3.select("#col").node().getBoundingClientRect())

        var table = d3.select("#col").append("table").attr('height', height * 0.9).style('top', height * 0.05 + 'px').style('position','absolute');

        var start_line = 0, end_line = 15
        //scroll event
        var scrollEvent = d3.zoom()
            .on('zoom', function (e) {
                var scrollDirection = (d3.event.sourceEvent.deltaY > 0) ? 1 : -1;
                console.log(scrollDirection)

                start_line += scrollDirection;
                end_line += scrollDirection;
                if (start_line >= 0 && end_line <= 31) {
                    d3.select('tbody').selectAll('tr')
                        .attr('hidden', (d, i) => { if (i >= end_line || i < start_line) return true })
                } else {
                    start_line -= scrollDirection;
                    end_line -= scrollDirection;
                }

            });

        //d3 create table head&body
        var headers = table.append('thead')
            .append('tr')
            .selectAll('th')
            .data(this.state.row_key)
            .enter()
            .append('th')
            .style('padding', '6px')
            .style('border', '1px solid #000')
            .style('background', 'lightgray')
            .style('text-align', 'center')
            .text((d) => d)

        var body = table.append('tbody').call(scrollEvent)
            .selectAll('tr')
            .data(this.state.data_set)
            .enter()
            .append('tr')
            .attr('hidden', (d, i) => { if (i >= end_line || i < start_line) return true })
            .selectAll('td')
            .data((d, i) => (this.state.data_set[i]))
            .enter()
            .append('td')
            .style('padding', '6px')
            .style('border', '1px solid #000')
            .style('text-align', 'center')
            .text((d) => d)

    }

    render() {
        let { style } = this.props

        return (
            <Col md={10} mdOffset={1} style={style}>
                <Col  id={"col"} md={10} mdOffset={1} style={{ background: 'white', height: "700px", overflow: 'auto' }}>
                </Col>
            </Col>
        )
    }

}



export default Contentlist;