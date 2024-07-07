import "./card.css";
import * as React from "react";
import { CardProps, CardState } from "../All_Interface/Card";
class Card extends React.Component<CardProps, CardState> {
  state: CardState = {
    names: "",
    homeworld: "",
    url: "",
  };
  constructor(props: CardProps) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      names: this.props.names,
      homeworld: this.props.homeworld,
      url: this.props.url,
    });
  }
  render() {
    return (
      <section className="cards">
        <div>{this.state.names}</div>
        <div>
          <h5>{this.state.homeworld}</h5>
          <p>{this.state.url}</p>
        </div>
      </section>
    );
  }
}

export default Card;
