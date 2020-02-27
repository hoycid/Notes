import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addNote } from "../actions/noteActions";

class NotesModal extends Component {
  state = {
    modal: false,
    title: "",
    description:  "",
    author:  "",
    priority:  "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onPriorityChange = e => {
    this.setState({ priority: e.target.value });
  };


  onSubmit = e => {
    e.preventDefault();

    const newNote = {
        title: this.state.title,
        description: this.state.description,
        author: this.state.author,
        priority: this.state.priority,
        completed:  false
    };

    // Add note via addNote action
    this.props.addNote(newNote);

    // Close modal
    this.toggle();
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          New note
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create new note</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder=""
                  onChange={this.onChange}
                />
                <Label for="desc">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="desc"
                  placeholder=""
                  onChange={this.onChange}
                />
                <Label for="author">Author</Label>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder=""
                  onChange={this.onChange}
                />
                <label>Priority</label>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityLow"
                        value="low"
                        checked={this.state.priority === "low"}
                        onChange={this.onPriorityChange}
                    />
                    <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityMedium"
                        value="medium"
                        checked={this.state.priority === "medium"}
                        onChange={this.onPriorityChange}
                    />
                    <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityHigh"
                        value="high"
                        checked={this.state.priority === "high"}
                        onChange={this.onPriorityChange}
                    />
                    <label className="form-check-label">High</label>
                    </div>
                </div>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add note
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  note: state.note
});

export default connect(mapStateToProps, { addNote })(NotesModal);
