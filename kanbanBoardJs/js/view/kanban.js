import Column from "./column.js";

export default class Kanban {
  constructor(root) {
    this.root = root;

    // console.log(root);
    Kanban.columns().forEach((column) => {
      const columnView = new Column(column.id, column.title);
      // console.log(columnView.elements.root);
      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1,
        title: "Not Started",
      },
      {
        id: 2,
        title: "In Progress",
      },
      {
        id: 3,
        title: "Completed",
      },
    ];
  }
}
