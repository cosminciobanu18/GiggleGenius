import View from "./View.js";
import { getColor } from "./../helpers.js";
class homeView extends View {
  _message = "";
  _generateMarkup() {
    return `
    ${this._generateHeaderMarkup()}
    ${this._generateMainMarkup()}
    `;
  }
  addHandlerSubmit(handler) {
    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  updateAIPrompt(prompt) {
    const spinner = document.querySelector(".spinner");
    if (!spinner) return;
    this._message = prompt;
    this._parentElement = spinner.parentElement;
    spinner.remove();
    this.insertFront(this._generateBotMessageMarkup());
  }
  loadFetchUserPrompt(prompt) {
    const form = document.querySelector("form");
    this._parentElement = form;
    const textarea = form.querySelector("textarea");
    const submitBtn = form.querySelector("input");
    textarea.remove();
    submitBtn.remove();
    this._message = prompt;
    this.insertBack(this._generateUserMessageMarkup());
    const aiResponse = document.getElementById("ai--response");
    this._parentElement = aiResponse;
    this._parentElement.innerHTML = this._generateSpinnerMarkup();
  }
  loadAIResponse(data) {
    const aiResponse = document.getElementById("ai--response");
    this._parentElement = aiResponse;
    const spinner = aiResponse.querySelector(".spinner");
    if (spinner) spinner.remove();
    this.insertBack(this._generateAIResponseMarkup(data));
    aiResponse.addEventListener("click", function (e) {
      const id = e.target.closest("button")?.id;
      if (!id) return;
      const [section, type] = id.split("--");
      const closeBtn = document.getElementById(`${section}--close`);
      const messageDiv = closeBtn.previousElementSibling;
      const openBtn = document.getElementById(`${section}--open`);
      [closeBtn, messageDiv, openBtn].forEach((el) =>
        el.classList.toggle("hidden")
      );
    });
  }
  addRefreshListener(handler) {
    document.getElementById("refresh").addEventListener("click", handler);
  }
  updateHeader(curJokes, target) {
    this._parentElement = document.querySelector("header");
    this._parentElement.querySelectorAll("span").forEach((el) => el.remove());
    this.insertBack(this._generateHeaderStatsMarkup(curJokes, target));
  }
  _generateHeaderMarkup() {
    return `
    <header class="relative flex justify-center h-24 px-4 bg-gray-300">
      <button class="absolute left-4 text-4xl self-center" id="toggle--menu">
        ☰
      </button>
       ${this._generateHeaderStatsMarkup()}
    </header>`;
  }
  _generateHeaderStatsMarkup(curJokes = 0, target = 1) {
    return `
      <span class="inline-block self-center text-5xl">
        GiggleGenius
      </span>`;
  }
  _generateMainMarkup() {
    return `
    <div class="flex flex-col px-8 lg:px-20 bg-blue-400 w-full flex-grow">
      ${this._generateChatMarkup()}
      ${this._generateAIResponseMarkup()}
    </div>
    `;
  }
  _generateChatMarkup() {
    return `
    <div
    id="chat"
    class="relative  w-4/6 bg-gray-600 rounded-xl p-8 lg:p-12 self-center mt-20"
  >
    <button id="refresh" class="absolute top-12 right-12 text-5xl z-30 text-gray-900">
      &circlearrowleft;
    </button>
    <form
      class="w-full rounded-xl text-sm md:text-lg lg:px-8 xl:px-12 2xl:px-16 lg:text-xl xl:text-2xl 2xl:text-3xl self-center items-center flex flex-col"
    >
      ${this._generateSpinnerMarkup()}
      <textarea
        placeholder="Type your funny response..."
        class="placeholder-gray-700 rounded-2xl resize-none self-center border-4 font-semibold border-yellow-500 w-10/12 p-4 bg-gray-400 text-black h-32 text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl"
      ></textarea>
      <input
        type="submit"
        value="AI Test"
        class="cursor-pointer self-center mt-8 px-8 p-3 bg-green-200 text-md font-semibold rounded-xl border-8 border-green-300"
      />
    </form>
  </div>`;
  }
  _generateBotMessageMarkup() {
    return `<div
        class="self-start rounded-2xl w-3/6 bg-gray-400 border-4 border-blue-500 p-5 lg:p-7 mb-14"
      >
        <span
          >${this._message}</span
        >
      </div>`;
  }
  _generateUserMessageMarkup() {
    return `<div
        class="self-end rounded-2xl w-3/6 bg-gray-400 border-4 border-red-500 p-5 lg:p-7 mb-14"
      >
        <span
          >${this._message}</span
        >
      </div>`;
  }
  _generateAIResponseMarkup(data = "") {
    if (!data)
      return `<div class="flex flex-col px-20" id="ai--response"></div>`;
    return `
  <div class="flex flex-col px-20 mb-40" id="ai--response">
    <span class="inline-block block text-5xl self-center pt-12"
      >AI's Analysis:</span
    >
    <div
      class="mb-20 grid grid-rows-6 lg:grid-rows-3 2xl:grid-rows-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-16 justify-center justify-items-center gap-12"
    >
      <div
        class="rounded-xl flex flex-col p-5 w-60 text-3xl h-40 text-3xl bg-${getColor(
          data.funny
        )}-500 border-4 border-black items-center lg:justify-self-start"
      >
        <span class="flex-1 flex items-start"> Funny:</span>
        <span class="flex-1 flex items-end nota">${data.funny}/10</span>
      </div>
      <div
        class="rounded-xl flex flex-col p-5 w-60 text-3xl h-40 text-3xl bg-${getColor(
          data.twist
        )}-500 border-4 border-black items-center lg:justify-self-end xl:justify-self-center"
      >
        <span class="flex-1 flex items-start"> Twist:</span>
        <span class="flex-1 flex items-end nota">${data.twist}/10</span>
      </div>
      <div
        class="rounded-xl flex flex-col p-5 w-60 text-3xl h-40 text-3xl bg-${getColor(
          data.easyToCatch
        )}-500 border-4 border-black items-center lg:justify-self-start xl:justify-self-end"
      >
        <span class="flex-1 flex items-start"> Ease to understand:</span>
        <span class="flex-1 flex items-end nota">${data.easyToCatch}/10</span>
      </div>
      <div
        class="rounded-xl flex flex-col p-5 w-60 text-3xl h-40 text-3xl bg-${getColor(
          data.relatable
        )}-500 border-4 border-black items-center lg:justify-self-end xl:justify-self-start"
      >
        <span class="flex-1 flex items-start"> Relatable:</span>
        <span class="flex-1 flex items-end nota">${data.relatable}/10</span>
      </div>
      <div
        class="rounded-xl flex flex-col p-5 w-60 text-3xl h-40 text-3xl bg-${getColor(
          data.clever
        )}-500 border-4 border-black items-center lg:justify-self-start xl:justify-self-center"
      >
        <span class="flex-1 flex items-start"> Cleverness:</span>
        <span class="flex-1 flex items-end nota">${data.clever}/10</span>
      </div>
      <div
        class="rounded-xl flex flex-col p-5 w-60 text-3xl h-40 text-3xl bg-${getColor(
          10 - data.offensive
        )}-500 border-4 border-black lg:justify-self-end items-center"
      >
        <span class="flex-1 flex items-start"> Offensiveness:</span>
        <span class="flex-1 flex items-end nota">${data.offensive}/10</span>
      </div>
    </div>
    <button
      id="feedback--open"
      class="row-span-1 col-span-2 mt-20 mb-8 self-center text-3xl underline transition-all duration-300"
      >See feedback [Expermiental]</button
    >
    ${this._generateFeedbackMarkup(data)}
    ${this._generateImprovementsMarkup(data)}
    <button
      id="improvements--open"
      class="row-span-1 col-span-2 text-3xl mt-20 mb-8 self-center underline transition-all duration-300"
      >See improvements [Experimental]</button
    >
  </div>`;
  }
  _generateFeedbackMarkup(data) {
    return `
    <div
      class="rounded-xl flex flex-1 mt-16 p-8 text-3xl self-center h-60 text-3xl bg-blue-600 border-4 border-black inline row-span-1 col-span-2 hidden transition-all duration-300"
    >
      ${data.feedback}
    </div>
    <button
      id="feedback--close"
      class="row-span-1 col-span-2 mt-4 self-center text-3xl underline hidden transition-all duration-300"
      >Close feedback</button
    >`;
  }
  _generateImprovementsMarkup(data) {
    return `
    <div
      class="rounded-xl flex flex-1 mt-8 p-8 text-3xl self-center h-60 text-3xl bg-blue-600 border-4 border-black inline row-span-1 col-span-2 hidden transition-all duration-300"
    >
      <ul class="list-disc">
        ${data.improvements
          .map(
            (el) => `<li>
          ${el}
        </li>`
          )
          .join(" ")}
       
      </ul>
    </div>
    <button
      id="improvements--close"
      class="row-span-1 col-span-2 mt-4 self-center text-3xl underline hidden transition-all duration-300"
      >Close improvements
    </button>`;
  }
}
export default new homeView();
