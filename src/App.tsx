import "./App.css";
import * as React from "react";
import BSection from "./bottomSection/BSection";
import TSection from "./topSection/TSection";
import { State } from "./All_Interface/TopSection";
class App extends React.PureComponent<State> {
  constructor(props: State) {
    super(props);
  }
  render() {
    return (
      <>
        <TSection />
        <BSection />
      </>
    );
  }
}

export default App;
