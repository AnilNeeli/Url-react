import { atom } from "recoil";

const loginstatus = window.localStorage.getItem("loginstatus")
  ? JSON.parse(window.localStorage.getItem("loginstatus"))
  : false;
export const loginState = atom({
  key: "login", //key should be unique
  default: loginstatus
});
