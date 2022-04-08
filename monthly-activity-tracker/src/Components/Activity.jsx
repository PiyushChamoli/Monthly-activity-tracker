function Activity(props) {
  let date = new Date();
  let month = date.getMonth();
  let year = date.getYear();

  function getDays(y, m) {
    let days = new Date(y, m, 0).getDate();
    let allDays = [];
    for (let i = 1; i <= days; i++) {
      allDays.push(i);
    }
    return allDays;
  }

  let totalDays = getDays(year, month);

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return props.allActivity.map((activity, i) => (
    <div key={i} className="flex box">
      <div className="flex-20 right">
        <h2>{activity.name}</h2>
        <p>{months[month]}</p>
      </div>
      <div className="flex-70 middle">
        {totalDays.map((day) => (
          <button
            key={day}
            className={activity.days.includes(String(day)) ? "active" : ""}
            value={day}
            onClick={props.handleClick}
            id={i}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="flex-5 left">
        <span onClick={() => props.handleDelete(activity.name)}>X</span>
      </div>
    </div>
  ));
}

export default Activity;
