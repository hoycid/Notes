import React, { Component } from "react";

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteTitle: "",
      noteDescription: "",
      noteAuthor: "",
      notePriority: "",
      noteCompleted: false
    };
  }

  handleOnChange = e => {
    if (e.target.name === "title") {
      this.setState({ noteTitle: e.target.value });
    }
    if (e.target.name === "description") {
      this.setState({ noteDescription: e.target.value });
    }
    if (e.target.name === "author") {
      this.setState({ noteAuthor: e.target.value });
    }
    if (e.target.name === "priority") {
      this.setState({ noteAuthor: e.target.value });
    }
  };

  onChangeTodoPriority = e => {
    this.setState({ notePriority: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    console.log(this.state.noteTitle);
    console.log(this.state.noteDescription);
    console.log(this.state.noteAuthor);
    console.log(this.state.notePriority);

    this.setState({
      noteTitle: "",
      noteDescription: "",
      noteAuthor: "",
      notePriority: ""
    });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create note</h3>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              value={this.state.noteTitle}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>

            <input
              name="description"
              type="text"
              className="form-control"
              value={this.state.noteDescription}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              name="author"
              type="text"
              className="form-control"
              value={this.state.noteAuthor}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="low"
                checked={this.state.notePriority === "low"}
                onChange={this.onChangeTodoPriority}
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
                checked={this.state.notePriority === "medium"}
                onChange={this.onChangeTodoPriority}
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
                checked={this.state.notePriority === "high"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
