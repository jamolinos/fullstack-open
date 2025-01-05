import "./index.css";

const Notification = ({ notification }) => {
  if (notification.message == null) {
    return null;
  }

  const classes = `notification ${
    notification.isSuccess ? "success" : "error"
  }`;

  return <div className={classes}>{notification.message}</div>;
};

export default Notification;
