// src/components/StartPage/index.js
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import logo from './logo.svg';
import './style.css';
import classnames from 'classnames';

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class StartPage extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        const { onLoadFile,filename } = this.props;
        onLoadFile(filename);
    }
    render() {
        const { className, onLoadFile, onChangeFileName, filename } = this.props;
        console.log("iii")
        console.log(this.props)
        let input_style = {
            backgroundColor: 'lightgray',
            textAlign: 'center',
            borderRadius: '10px',

        }
        let speace = {
            height: '50px'
        }

        return (
            <div>
                <div className={classnames('App', className)}>
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to Vis Tool</h2>
                    </div>
                </div>
                <div style={speace}>
                </div>
                <Col md={6} mdOffset={3}>
                    <div style={input_style} >
                        <FieldGroup
                            id="formControlsFile"
                            type="file"
                            label="Input File"
                            accept=".json"
                            onChange={onChangeFileName}
                        />
                        <Link to='/about'>
                            <Button bsStyle="primary" onClick={this.handleClick}>
                                Submit
                            </Button>
                        </Link>
                    </div>
                </Col>
            </div>
        );
    }
}

export default StartPage;