// import kanbanAPI from "./view/kanban.js";

import kanbanAPI from "./api/kanbanAPI.js";
import Kanban from "./view/kanban.js";

// console.log(kanbanAPI.insertItem(1, "Edit Video"));
// console.log(kanbanAPI.insertItem(2, "Record Video!!!"));
// console.log(kanbanAPI.insertItem(3, "Planning"));
// console.log(kanbanAPI.insertItem(3, "Coding"));

// console.log(kanbanAPI.getItems(1));
// kanbanAPI.deleteItem(41676, {
//   columnId: 1,
//   position: 0,
//   content: "I've changed.",
// });

// kanbanAPI.deleteItem();

new Kanban(document.querySelector(".kanban"));
