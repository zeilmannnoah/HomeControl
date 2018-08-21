import React from 'react';
import { Redirect } from 'react-router-dom';
import { Panel, Col, Row, Glyphicon} from 'react-bootstrap';
import CalendarService from '../../../services/CalendarService.js';
import LoadingSvg from '../../../imgs/dotsLoading.svg';
import './CalendarPanel.css'

const dateMap = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Monday',
    'Thu': 'Thursday',
    'Fri': 'Monday',
    'Sat': 'Monday',
    'Sun': 'Monday',
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'June': 'Jun',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December'
    },
    dateArr = new Date().toDateString().split(" "),
    formattedDate = dateArr.map((i, idx) => idx !== 2 ? dateMap[i] : i+postFix(i));

function postFix(day) {
    if(day > 3 && day < 21) {
        return 'th';
    }

    switch (day % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
    }
};

export default class CalendarPanel extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            calendarData: null,
            nextStateDate: null,
            offline: false
        };

        this.getData = this.getData.bind(this);
        this.CalendarService = new CalendarService();

        this.getData();
        
        this.date = {
            name: formattedDate[0],
            month: formattedDate[1],
            day: formattedDate[2],
            year: formattedDate[3],
            min: {
                name: dateArr[0],
                month: dateArr[1],
            }
        }
    }

    getData() {
        this.CalendarService.getEvents()
        .then(data => {
            console.log(data);
            this.setState({
                calendarData: data,
                nextStateDate: new Date(data[0].start.dateTime)
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                offline: err
            });
        });
    }

    render() {
        if (this.state.offline) {
            return (
                <Panel className='calendar-panel'>
                    <Panel.Heading className='calendar-panel-heading'>
                        <Row>
                            <Col md={5}>
                                <div className='calendar-display center-vertically'>
                                    <div className='text-center month-display'>{this.date.min.month}</div>
                                    <div className='text-center date-display'>{this.date.day}</div>
                                </div>
                            </Col>
                            <Col md={7}>
                                <h1 className='pull-right date'>{this.date.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                        <Panel.Title componentClass="h3" className='pull-right'>{this.state.offline}</Panel.Title>
                            </Col>
                        </Row>
                    </Panel.Heading>
                    <Panel.Body><a>Access Calendar Settings</a><Glyphicon className='pull-right top-3' glyph='circle-arrow-right'/></Panel.Body>
                </Panel>
            );
        }

        if (!this.state.calendarData) {
            return (
                <Panel className='calendar-panel'>
                    <Panel.Heading className='calendar-panel-heading'>
                        <img className="loading center-block" src={LoadingSvg}/>
                    </Panel.Heading>
                </Panel>
            )
        }

        return (
            <Panel className='calendar-panel'>
                <Panel.Heading className='calendar-panel-heading'>
                    <Row>
                        <Col md={5}>
                            <div className='calendar-display center-vertically'>
                                <div className='text-center month-display'>{this.date.min.month}</div>
                                <div className='text-center date-display'>{this.date.day}</div>
                            </div>
                        </Col>
                        <Col md={7}>
                            <h1 className='pull-right date'>{this.date.name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Panel.Title componentClass="h3" className='pull-right'>{this.state.calendarData ? this.state.calendarData[0].summary.replace(/[A-Z]{3} [0-9]{3} - /g, "") : "..."}</Panel.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Panel.Title componentClass="h3" className='pull-right'>
                                on {this.state.calendarData ? this.state.nextStateDate.toDateString().substring(0, 3) : '...'} at&nbsp;
                                    {this.state.calendarData ? this.state.nextStateDate.toLocaleTimeString().replace(/(.+:.+):.+ /g, '$1 ') : '...'}
                            </Panel.Title>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body><a>Access Calendar<Glyphicon className='pull-right top-3' glyph='circle-arrow-right'/></a></Panel.Body>
            </Panel>
        );
    }
}