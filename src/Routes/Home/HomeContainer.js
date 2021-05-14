import { movieApi } from "api";
import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    topRated: null,
    popular: null,
    upcoming: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: topRated },
      } = await movieApi.topRated();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      this.setState({
        nowPlaying,
        topRated,
        popular,
        upcoming,
      });
    } catch {
      this.setState({
        error: "Can't find any movies information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {
      nowPlaying,
      topRated,
      popular,
      upcoming,
      error,
      loading,
    } = this.state;
    // console.log(this.state);
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        topRated={topRated}
        popular={popular}
        upcoming={upcoming}
        error={error}
        loading={loading}
      />
    );
  }
}
