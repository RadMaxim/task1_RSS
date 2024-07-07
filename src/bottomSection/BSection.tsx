import * as React from 'react';
import Card from '../Card/Card';
import './BSection.css';
import { State, ElementType } from '../All_Interface/BottomSection';
class BSection extends React.PureComponent {
  state: State = {
    all_elem: [],
    filter: [],
    input_value: ' ',
  };
  constructor(props: State) {
    super(props);
  }
  componentDidMount() {
    const all_elem: ElementType[] = JSON.parse(
      localStorage.getItem('allPeople') || '[]'
    );
    const filter = JSON.parse(localStorage.getItem('filter_array') || '[]');
    const input_value = localStorage.getItem('input_value') || '[]';
    this.setState({
      all_elem: all_elem,
      filter: filter,
      input_value: input_value,
    });
  }

  render() {
    return (
      <>
        <main className="main_content">
          <div className="main_container">
            {this.state.input_value == null
              ? this.state.all_elem.map((el: ElementType) => {
                  return (
                    <Card
                      key={el.name}
                      names={el.name}
                      homeworld={el.homeworld}
                      url={el.url}
                    />
                  );
                })
              : this.state.filter.map((el: ElementType) => {
                  return (
                    <Card
                      key={el.name}
                      names={el.name}
                      homeworld={el.homeworld}
                      url={el.url}
                    />
                  );
                })}
          </div>
        </main>
      </>
    );
  }
}

export default BSection;
