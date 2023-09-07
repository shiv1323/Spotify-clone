export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  playing: false,
  item: null,
  following: [],
  repeat: false,
  shuffe: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_RPEAT":
      return {
        ...state,
        repeat: action.repeat,
      };
    case "SET_SUFFLE":
      return {
        ...state,
        shuffe: action.shuffle,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_FOLLOWED":
      return {
        ...state,
        following: action.following,
      };
    default:
      return state;
  }
};

export default reducer;
