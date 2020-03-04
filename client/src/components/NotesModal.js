import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { addNote } from "../actions/noteActions";

class NotesModal extends Component {
  state = {
    modal: false,
    title: "",
    description: {},
    author: "",
    priority: ""
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

  handleEditorChange = (content, editor) => {
    let doc = new DOMParser().parseFromString(content, "text/html");
    const string = doc.body.textContent || "" ;
    this.setState({ description: string });
  };

  onSubmit = e => {
    e.preventDefault();

    const newNote = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      priority: this.state.priority,
      completed: false
    };

    // Add note via addNote action
    this.props.addNote(newNote);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="success"
          style={{ marginBottom: "2rem", borderRadius: "50%" }}
          onClick={this.toggle}
        >
          +
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create new note</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChange}
                />
                <Editor
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount"
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help"
                  }}
                  onEditorChange={this.handleEditorChange}
                />
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Author"
                  onChange={this.onChange}
                />
              </FormGroup>
              <div className="form-group">
                <label>Priority:</label>
                {"  "}
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
                  <label className="form-check-label">Medium</label>{" "}
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
