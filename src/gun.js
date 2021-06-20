import Gun from "gun";


const serverPiers = ['https://mvp-gun.herokuapp.com/gun'];
const todoList = Gun(serverPiers).get("todoList");

export default todoList