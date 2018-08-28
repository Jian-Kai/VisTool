import React, { Component } from 'react';
import { Col, Table } from 'react-bootstrap'

function Tablehead({ keyvalue }) {
    console.log(keyvalue)
    let key_haed = keyvalue.map((parm) => (<th>{parm}</th>))
    return (
        <thead>
            <tr>
                {key_haed}
            </tr>
        </thead>
    )
}

function Contentlist({ content, style }) {
    let speace = {
        height: '10px'
    }

    let line = content.split("\n")
   
    let row_key = line[0].split(",").slice(1);
    let col_key = [];
    let data_set = [];

    for (var i = 1; i < line.length; i++) {
        col_key.push(line[i].split(",")[0])
    }

    for (var i = 1; i < line.length; i++) {
        data_set[i - 1] = [];
        var temp = line[i].split(",")
        for (var j = 1; j < temp.length; j++) {
            data_set[i - 1][j - 1] = temp[j];
        }
    }
    console.log(row_key)
    console.log(col_key)
    console.log(data_set)

    return (
        <Col md={10} mdOffset={1} style={style}>
            <div style={speace}>
            </div>
            <Col md={10} mdOffset={1} style={{ background: 'white', borderRadius: '10px', overflow: "scroll" }}>
                <Table striped bordered condensed hover>
                    <Tablehead keyvalue={row_key} />
                </Table>
            </Col>
        </Col>
    )
}



export default Contentlist;