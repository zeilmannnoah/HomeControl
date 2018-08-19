import React from 'react';
import { Redirect } from 'react-router-dom';
import { Panel, Col, Row} from 'react-bootstrap';
import './Panel3.css'

export default class LighPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel className='panel3-panel'>
                <Panel.Heading className='panel3-panel-heading'>
                </Panel.Heading>
                <Panel.Body></Panel.Body>
            </Panel>
        );
    }
}