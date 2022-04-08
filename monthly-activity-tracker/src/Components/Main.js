import React from "react";
import Activity from "./Activity";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      allActivity: [],
    };
  }

  componentDidMount() {
    if (localStorage.allActivity) {
      this.setState({
        allActivity: JSON.parse(localStorage.allActivity) || [],
      });
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    localStorage.setItem("allActivity", JSON.stringify(this.state.allActivity));
  };

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let activity;
    if (this.state.inputText !== "") {
      activity = {
        name: this.state.inputText,
        days: [],
      };
    }
    this.setState(
      (prevState) => ({
        allActivity: prevState.allActivity.concat(activity),
      }),
      this.setState({ inputText: "" })
    );
  };

  handleClick = (event) => {
    let { id, value } = event.target;
    let activities = this.state.allActivity;

    if (activities[id].days.includes(value)) {
      let index = activities[id].days.findIndex((a) => a === String(value));
      activities[id].days.splice(index, 1);
      let updatedDays = activities[id].days;
      this.setState((prevState) => {
        return {
          allActivity: prevState.allActivity.map((activity, i) => {
            if (i === Number(id)) {
              return { ...activity, days: updatedDays };
            } else {
              return activity;
            }
          }),
        };
      });
    } else {
      activities[id].days.push(value);
      let updatedDays = activities[id].days;
      this.setState((prevState) => {
        return {
          allActivity: prevState.allActivity.map((activity, i) => {
            if (i === Number(id)) {
              return { ...activity, days: updatedDays };
            } else {
              return activity;
            }
          }),
        };
      });
    }
  };

  handleDelete = (name) => {
    this.setState((prevState) => ({
      allActivity: prevState.allActivity.filter(
        (activity) => activity.name !== name
      ),
    }));
  };

  render() {
    return (
      <>
        <h1>Monthly Activity Tracker</h1>
        <form className="input" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="input"
            onChange={this.handleChange}
            value={this.state.inputText}
          />
          <button>Add Activity</button>
        </form>
        <Activity
          allActivity={this.state.allActivity}
          handleDelete={this.handleDelete}
          handleClick={this.handleClick}
        />
      </>
    );
  }
}

export default Main;
