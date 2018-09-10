import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap'
import * as d3 from "d3";
import { Link } from 'react-router-dom'
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

        for (var i = 1; i < line.length - 1; i++) {
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
        //console.log(data_set)

        this.state = {
            station_key: row_key,
            date_key: col_key,
            quantity: data_set,
        }

        this.handleClick = this.handleClick.bind(this)

    }

    componentDidMount() {
        const width = d3.select("#col").node().getBoundingClientRect().width,
            height = d3.select("#col").node().getBoundingClientRect().height;
        console.log(d3.select("#col").node().getBoundingClientRect())

        var div = d3.select("#col").append('div').style('height', height * 0.9 + 'px').style('width', width * 0.95 + 'px').style('left', width * 0.025 + 'px').style('top', height * 0.05 + 'px').style('overflow', 'auto').style('position', 'absolute');
        var table = div.append("table");

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
            .data(this.state.station_key)
            .enter()
            .append('th')
            .style('padding', '6px')
            .style('border', '1px solid #000')
            .style('background', 'lightgray')
            .style('text-align', 'center')
            .text((d) => d)

        var body = table.append('tbody').call(scrollEvent)
            .selectAll('tr')
            .data(this.state.quantity)
            .enter()
            .append('tr')
            .attr('hidden', (d, i) => { if (i >= end_line || i < start_line) return true })
            .selectAll('td')
            .data((d, i) => (this.state.quantity[i]))
            .enter()
            .append('td')
            .style('padding', '6px')
            .style('border', '1px solid #000')
            .style('text-align', 'center')
            .text((d) => d)

    }

    handleClick() {
        const { onClickBtn } = this.props
        onClickBtn(this.state)
    }

    render() {
        let { style, onClickBtn } = this.props
        console.log(this.props)
        return (
            <Col md={10} mdOffset={1} style={style}>
                <Col id={"col"} md={10} mdOffset={1} style={{ background: 'white', height: "700px" }}>
                </Col>
                <Col md={1} style={{ height: "700px" }}>
                    <Link to="./Volume">
                        <Button bsStyle="primary" bsSize="large" style={{ top: '650px', position: 'absolute' }} onClick={this.handleClick}>
                            Next
                        </Button>
                    </Link>
                </Col>
            </Col>
        )
    }

}



export default Contentlist;