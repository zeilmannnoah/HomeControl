import React from 'react';
import { Redirect } from 'react-router-dom';
import { Panel, Col, Row} from 'react-bootstrap';
import CalendarService from '../../../services/CalendarService.js';
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
    formattedDate = dateArr.map((i, idx) => idx !== 2 ? dateMap[i] : i+nth(i));

function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
} 

export default class CalendarPanel extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
        };

        this.CalendarService = new CalendarService();

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

    getCurrentDateStr() {
        
        
        return dateStr
    }

    render() {
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
                            <Panel.Title componentClass="h3" className='pull-right'>{this.date.month} {this.date.day}</Panel.Title>
                            <Panel.Title componentClass="h3" className='pull-right'>Off work at 8:00am</Panel.Title>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body><a>Access Calendar</a></Panel.Body>
            </Panel>
        );
    }
}