import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "b9e13cf1b11e06f495e33e1a83617184",
    language: "en-US",
  },
});

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: `${term}`,
      },
    }),
};

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  topRated: () => api.get("movie/top_rated"),
  popular: () => api.get("movie/popular"),
  upcoming: () => api.get("movie/upcoming"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: `${term}`,
      },
    }),
};
