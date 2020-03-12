import React, { Component } from "react";
import {
  Container,
  Button,
  ButtonGroup,
  Badge,
  Toast,
  ToastHeader,
  ToastBody,
  Alert
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getNotes, deleteNote, setComplete } from "../actions/noteActions";
import PropTypes from "prop-types";
import Moment from "react-moment";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

class Notes extends Component {
  state = {
    hasComplete: this.props.hasComplete,
    visible: false,
    currentNote: null
  }
  componentDidMount() {
    this.props.getNotes();
  }

  onDeleteClick = id => {
    this.props.deleteNote(id);
  };

  onComplete = id => {
    const { notes } = this.props.note;
    const currentNote = notes.find(note => note._id === id)
    this.setState({hasComplete: true, currentNote: currentNote})
    this.props.setComplete(id);
    this.props.getNotes();
  };

  onDismiss = () => {
    this.setState({hasComplete: false})
  }
  render() {
    const { notes } = this.props.note;
    let count=0;
    let layout = notes.map(_id => {
      return { i: _id._id, x: count++, y: 0, w: 3, h: 3 };
    });
    console.log(this.state)
    return (
      <Container>
        {this.state.hasComplete ? (
          <Alert color="success" visible={this.setState.hasComplete} toggle={this.onDismiss}>{this.state.currentNote.title} has been completed!</Alert>
        ) : (
          ""
        )}

        <TransitionGroup className="notes">
          <GridLayout
            className="layout"
            layout={layout}
            cols={46}
            rowHeight={30}
            width={4600}
          >
            {notes.map(
              ({
                _id,
                title,
                description,
                author,
                priority,
                completed,
                dateCompleted,
                dateCreated
              }) => (
                <div key={_id}>
                  <CSSTransition key={_id} classNames="fade" timeout={500}>
                    <Toast>
                      <ToastHeader>
                        <ButtonGroup>
                          <Button
                            style={{ borderRadius: "0%" }}
                            color="none"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, _id)}
                          >
                            ×
                          </Button>
                          {!completed ? (
                            <Button
                              style={{ borderRadius: "0%" }}
                              color="none"
                              size="sm"
                              onClick={this.onComplete.bind(this, _id)}
                            >
                              ✓
                            </Button>
                          ) : (
                            ""
                          )}
                        </ButtonGroup>
                        <div>Author: {author}</div>
                        <div>
                          Priority:{" "}
                          <Badge
                            color={
                              priority === "low"
                                ? "info"
                                : priority === "medium"
                                ? "warning"
                                : "danger"
                            }
                            pill
                          >
                            {priority.toUpperCase()}
                          </Badge>
                        </div>
                        <div>
                          Date created:{" "}
                          <Moment format="LLL">{dateCreated}</Moment>{" "}
                          <Badge pill>
                            <Moment fromNow>{dateCreated}</Moment>
                          </Badge>
                        </div>
                        {completed && dateCompleted ? (
                          <div>
                            <div>
                              Date completed:{" "}
                              <Moment format="LLL">{dateCompleted}</Moment>{" "}
                              <Badge pill>
                                <Moment fromNow>{dateCompleted}</Moment>
                              </Badge>{" "}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </ToastHeader>
                      <ToastBody>
                        <div>
                          <h3>
                            {title}{" "}
                            {completed ? (
                              <Badge color="success" pill>
                                ✓
                              </Badge>
                            ) : (
                              ""
                            )}
                          </h3>
                        </div>
                        <div>{description}</div>
                      </ToastBody>
                    </Toast>
                  </CSSTransition>
                </div>
              )
            )}
          </GridLayout>
        </TransitionGroup>
      </Container>
    );
  }
}

Notes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  note: state.note
});

export default connect(mapStatetoProps, { getNotes, deleteNote, setComplete })(
  Notes
);