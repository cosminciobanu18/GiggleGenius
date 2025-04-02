class View {
  _data;
  _markup = "";
  _parentElement;
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
  }
  renderPage() {
    this._parentElement = document.querySelector("main");
    const pageMarkup = this._generateMarkup();
    this.render(pageMarkup);
    const button = document.getElementById("toggle--menu");
    button.addEventListener("click", this.toggleMenu);
  }
  render() {
    const markup =
      typeof this._generateMarkup === "function" ? this._generateMarkup() : "";
    this._parentElement.innerHTML = markup;
  }
  insertBack(markup) {
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
  insertFront(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  toggleMenu() {
    const sideMenu = document.querySelector("nav");
    sideMenu.classList.toggle("-translate-x-full");
    const main = document.querySelector("main");
    main.classList.toggle("ml-60");
  }
  _generateSpinnerMarkup() {
    return `
      <div
        class="spinner w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin m-20"
          ></div>`;
  }
}
export default View;
