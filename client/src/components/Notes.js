import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNotes, deleteNote, setComplete } from '../actions/noteActions';
import PropTypes from 'prop-types';

class Notes extends Component {
    componentDidMount() {
        this.props.getNotes();
    }

    onDeleteClick = id => {
        this.props.deleteNote(id);
    }

    onComplete = id => {
        this.props.setComplete(id);
    }

    render() {
        const { notes } = this.props.note;
        
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="notes">
                        {notes.map(({ _id, title, description, author, priority, completed, dateCompleted, dateCreated}) => (
                            <CSSTransition key={_id} classNames="fade" timeout={500}>
                                <ListGroupItem>
                                    <div>Title: {title}</div>
                                    <div>Description: {description}</div>
                                    <div>Author: {author}</div>
                                    <div>Priority: {priority}</div>
                                    <div>Date created: {dateCreated}</div>
                                    {completed ? <div><div>Completed: {completed}</div> <div>Date completed: {dateCompleted}</div></div> : ""}
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        Remove
                                    </Button>
                                    <Button
                                        className="remove-btn"
                                        color="success"
                                        size="sm"
                                        onClick={e => {
                                            this.onComplete.bind(this, _id)
                                        }}
                                    >
                                        Complete
                                    </Button>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

Notes.propTypes = {
    getNotes: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
    note: state.note
});

export default connect(
    mapStatetoProps,
    { getNotes, deleteNote, setComplete}
)(Notes);