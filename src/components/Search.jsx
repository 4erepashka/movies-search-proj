import React, { Component } from "react";
export class SearchLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      querySearch: "",
      typeValue: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      "отравлен запрос ",
      this.state.querySearch,
      "тип ",
      this.state.typeValue
    );
    this.props.onSearch(this.state.querySearch, this.state.typeValue);
  };

  componentDidUpdate() {
    console.log("search-form was updated ");
    console.log("текущее значение querySearch", this.state.querySearch);
    console.log("текущее значение typeValue", this.state.typeValue);
  }
  componentDidMount() {
    document.querySelector(".search-form").group1[0].checked = true;
  }
  render() {
    return (
      <form
        action="#"
        className="search-form"
        role="search-form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="search"
          name="search"
          id="search-input"
          placeholder="Matrix"
          className="search-field"
          onChange={(event) =>
            this.setState({
              querySearch: event.target.value.trimStart(),
            })
          }
          value={this.state.querySearch}
        />
        <button
          className="search-btn btn waves-effect waves-light"
          type="submit"
        >
          <span className="material-icons">search</span>
        </button>
        <div className="search-options">
          <label>
            <input
              name="group1"
              type="radio"
              onChange={() => {
                const form = document.querySelector(".search-form");
                const type_value = Array.from(form.group1).filter(
                  (item) => item.checked
                )[0].nextSibling.innerText;
                this.setState({
                  typeValue: type_value,
                });
              }}
            />
            <span>All</span>
          </label>
          <label>
            <input
              name="group1"
              type="radio"
              onChange={() => {
                const form = document.querySelector(".search-form");
                const type_value = Array.from(form.group1).filter(
                  (item) => item.checked
                )[0].nextSibling.innerText;
                this.setState({
                  typeValue: type_value,
                });
              }}
            />
            <span>Movie</span>
          </label>
          <label>
            <input
              name="group1"
              type="radio"
              onChange={() => {
                const form = document.querySelector(".search-form");
                const type_value = Array.from(form.group1).filter(
                  (item) => item.checked
                )[0].nextSibling.innerText;
                this.setState({
                  typeValue: type_value,
                });
              }}
            />
            <span>Series</span>
          </label>
        </div>
      </form>
    );
  }
}
