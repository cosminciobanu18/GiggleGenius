import View from "./View.js";
class sideMenuView extends View {
  _parentElement = document.querySelector("nav");

  addHandlerChangePage(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const page = e.target.dataset.page;
      if (!page) return;
      handler(page);
    });
  }
}
export default new sideMenuView();
