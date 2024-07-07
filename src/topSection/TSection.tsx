import * as React from "react";
import "./TSection.css";
import { State, ElementType } from "../All_Interface/TopSection";
import Load from "../Load/Load";
class TSection extends React.PureComponent {
  state: State = {
    err: false,
    totalPerson: 0,
    counterPage: 0,
    arrayAllLinks: [],
    allPeopleInfo: [],
    isLoad: true,
  };
  constructor(props: State) {
    super(props);
    this.state = {
      err: false,
      totalPerson: 0,
      counterPage: 0,
      arrayAllLinks: [],
      allPeopleInfo: [],
      isLoad: true,
    };
    this.button_err = this.button_err.bind(this);
    this.button_click = this.button_click.bind(this);
  }

  componentDidUpdate(prevProps: State, prevState: State) {
    if (prevState.err != this.state.err)
      throw new Error("This mistake is for task");
  }
  async componentDidMount() {
    document.getElementsByTagName("input")[0].value =
      localStorage.getItem("input_value") || "";
    await this.allFunction();
  }

  async allFunction() {
    const totalPerson = await this.searchElem();
    const counterPage = this.counterPages(totalPerson);
    const arrayAllLinks = this.getArrayLinks(counterPage);
    const allPeopleInfo = await this.getAllPeople(arrayAllLinks);
    const allPeopleInfo_step2 = allPeopleInfo.reduceRight((buf, el) => {
      buf.push(...el);
      return buf;
    }, []);
    localStorage.setItem("allPeople", JSON.stringify(allPeopleInfo_step2));

    this.setState({
      totalPerson: totalPerson,
      counterPage: counterPage,
      arrayAllLinks: arrayAllLinks,
      allPeopleInfo: allPeopleInfo_step2,
      isLoad: false,
    });
    console.log(this.state.isLoad);
  }

  getArrayLinks(count: number) {
    const allPeople = [];
    while (count != 0) {
      allPeople.push(`https://swapi.dev/api/people/?page=${count}`);
      count--;
    }
    return allPeople;
  }
  async searchElem() {
    const totalPerson = await fetch("https://swapi.dev/api/people/")
      .then((el) => el.json())
      .then((el) => el.count);
    return Number(totalPerson);
  }
  counterPages(totalPerson: number) {
    return Math.floor(
      totalPerson % 10 == 0 ? totalPerson / 10 : totalPerson / 10 + 1,
    );
  }
  async getAllPeople(arrayLinks: string[]) {
    const listPeople = await Promise.all(
      arrayLinks.map(async (el) => {
        const step1 = await fetch(el);

        const step2 = await step1.json();

        const step3 = await step2.results;
        return step3;
      }),
    );
    return listPeople;
  }
  button_err() {
    this.setState((st: State) => ({
      err: !st.err,
    }));
  }
  button_click() {
    const input_val: string = document
      .getElementsByTagName("input")[0]
      .value.trim();
    localStorage.setItem("input_value", input_val);

    const all_people_info: ElementType[] = JSON.parse(
      localStorage.getItem("allPeople") || "[]",
    );

    const filter_array = Array.from(all_people_info).filter(
      (el: ElementType) => {
        if (input_val.length == 0) return true;
        if (
          String(el.name)
            .toLocaleLowerCase()
            .includes(input_val.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      },
    );
    localStorage.setItem("filter_array", JSON.stringify(filter_array));
  }

  render() {
    return (
      <>
        <header className="main_header">
          <div className="header_container">
            <button className="error" onClick={this.button_err}>
              test
            </button>
            <h1 className="header_h1">Search Information</h1>
            <form>
              <input id="input1" type="text" placeholder="Search" />

              <button
                className="search"
                type="submit"
                onClick={this.button_click}
              >
                Search
              </button>
            </form>
          </div>
        </header>
        {this.state.isLoad && <Load />}
      </>
    );
  }
}

export default TSection;
