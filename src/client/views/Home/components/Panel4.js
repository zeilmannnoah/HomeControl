import React from 'react';
import { Redirect } from 'react-router-dom';
import { Panel, Col, Row} from 'react-bootstrap';
import './Panel4.css'

export default class Panel4 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel className='panel4-panel'>
                <Panel.Heading className='panel4-panel-heading'>
                </Panel.Heading>
                <Panel.Body></Panel.Body>
            </Panel>
        );
    }
}