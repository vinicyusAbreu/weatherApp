const getData = (timestamp) => {
  let today = new Date(timestamp * 1000);

  let dayName = today.toLocaleString("en-US", { weekday: "short" });
  dayName = dayName.substring(0, 3);
  let day = today.getDate();
  let month = today.toLocaleString("en-US", { month: "short" });

  return `${dayName}. ${day} ${month}`;
};

export default getData;
