export const AVATAR_URL =
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_READ_ACCESS_TOKEN,
  },
}
