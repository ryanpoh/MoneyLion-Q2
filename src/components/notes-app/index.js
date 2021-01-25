import React from "react";
import "./index.css";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [
        { title: "YAY1", status: "COMPLETED" },
        { title: "YAY2", status: "ACTIVE" },
      ],
      title: "",
      status: "",
      mode: "modeAll",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleChangeMode = (event) => {
    const target = event.target;
    const name = target.getAttribute("name");

    this.setState({
      ...this.state,
      mode: name,
    });
  };

  handleSubmit = () => {
    let { title, status } = this.state;
    status = status.toUpperCase();
    let acceptedStatus = ["COMPLETED", "ACTIVE"];

    let newTodo = {
      title,
      status,
    };

    if (acceptedStatus.includes(status) && title.length > 0) {
      this.setState({
        todolist: [...this.state.todolist, newTodo],
        title: "",
        status: "",
        mode: "modeAll",
      });
    } else {
      alert("Please enter a valid title or status ('COMPLETED' or 'ACTIVE')");
    }
  };

  render() {
    let { todolist, mode } = this.state;

    const getList = () => {
      let currentList = null;
      if (mode === "modeAll") currentList = todolist;
      else if (mode === "modeActive")
        currentList = todolist.filter((todo) => todo.status === "ACTIVE");
      else currentList = todolist.filter((todo) => todo.status === "COMPLETED");

      return currentList.map((obj) => {
        return (
          <tr>
            <td>{obj.title}</td>
            <td>{obj.status}</td>
          </tr>
        );
      });
    };

    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input
            data-testid="input-note-name"
            type="text"
            className="large mx-8"
            placeholder="Note Title"
            name="title"
            onChange={this.handleChange}
          />
          <input
            data-testid="input-note-status"
            type="text"
            className="large mx-8"
            placeholder="Note Status"
            name="status"
            onChange={this.handleChange}
          />
          <button
            className=""
            data-testid="submit-button"
            onClick={this.handleSubmit}
          >
            Add Note
          </button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li
              className="tab-item slide-up-fade-in"
              data-testid="allButton"
              name="modeAll"
              onClick={this.handleChangeMode}
            >
              All
            </li>
            <li
              className="tab-item slide-up-fade-in"
              data-testid="activeButton"
              name="modeActive"
              onClick={this.handleChangeMode}
            >
              Active
            </li>
            <li
              className="tab-item slide-up-fade-in"
              data-testid="completedButton"
              name="modeCompleted"
              onClick={this.handleChangeMode}
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">{getList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default NotesApp;
