import * as React from "react";
import "./ErrorUI.css";
class ErrorUI extends React.Component {
  render() {
    return (
      <main className="main_err">
        <section className="sec_err">
          <h2>Something went wrong!</h2>
          <h2>We are working on fixing it</h2>
        </section>
        <button
          className="err_button"
          onClick={() => {
            window.location.reload();
          }}
          type="submit"
        >
          Try again
        </button>
      </main>
    );
  }
}
export default ErrorUI;
