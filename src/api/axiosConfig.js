import axios from "axios";

export default axios.create({
  baseURL:"https://6369-73-37-241-204.ngrok-free.app",
  headers: {"ngrok-skip-browser-warning": "true"}
});