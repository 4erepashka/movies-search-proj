import React, { Component } from "react";
import Movies from "../components/Movies";
import { SearchLine } from "../components/Search";
export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: [],
      query: "",
      countMovies: "",
      currentPage: 1,
      moreData: false,
      type: "",
      searchStatus: true,
    };
  }

  onSearch = (query, type) => {
    console.log("комопнент Main принял запрос ", query, type);
    this.setState({
      type: type,
      query: query,
    });
  };

  componentDidMount() {
    document.querySelector(".loading").style.display = "none";
  }

  getMoreMovies = () => {
    if (this.state.moviesData.length < this.state.countMovies) {
      this.setState({
        moreData: true,
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  componentDidUpdate(_, prevState) {

    if (prevState.type !== this.state.type) {
      this.setState({
        currentPage: 1,
      });
    }
    if (prevState.query === this.state.query && this.state.moreData === true) {
      fetch(
        `http://www.omdbapi.com/?apikey=1a328256&s=${this.state.query.trim()}&page=${
          this.state.currentPage
        }${
          this.state.type == "All"
            ? ""
            : `&type=${this.state.type.toLowerCase()}`
        }`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (let [key, value] of Object.entries(data.Search)) {
            if (value.Type === "game") {
              delete data.Search[key];
            }
          }
          this.setState({
            moviesData: this.state.moviesData.concat(data.Search),
            moreData: false,
          });
        });
    } else if (
      this.state.query !== "" &&
      (prevState.query !== this.state.query ||
        prevState.type !== this.state.type)
    ) {
      fetch(
        `http://www.omdbapi.com/?apikey=1a328256&s=${this.state.query.trim()}&page=${
          this.state.currentPage
        }${
          this.state.type == "All"
            ? ""
            : `&type=${this.state.type.toLowerCase()}`
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          for (let [key, value] of Object.entries(data.Search)) {
            if (value.Type === "game") {
              delete data.Search[key];
            }
          }
          this.setState({
            moviesData: data.Search,
            countMovies: data.totalResults,
            moreData: false,
            searchStatus: true,
          });
        })
        .catch((err) => {
          this.setState({
            searchStatus: false,
          });
        });
    }
  }

  render() {
    const movies = this.state.moviesData;
    return (
      <main className="content container">
        <SearchLine onSearch={this.onSearch} />
        {movies.length && this.state.searchStatus ? (
          <>
            <Movies movies={this.state.moviesData} />
            {this.state.moviesData.length < this.state.countMovies ? (
              <div onClick={this.getMoreMovies} className="btn-more">
                more
              </div>
            ) : null}
          </>
        ) : !this.state.searchStatus ? null : (
          <h5 className="loading">loading...</h5>
        )}
        {this.state.searchStatus ? null : <h5>not found...( try again )</h5>}
      </main>
    );
  }
}
