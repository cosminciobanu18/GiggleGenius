import View from "./views/View.js";
import sideMenuView from "./views/sideMenuView.js";
import homeView from "./views/homeView.js";
import * as model from "./model.js";
import { responseToObject } from "./helpers.js";
import { prompt1, prompt2 } from "./config.js";

const controlRenderHome = async function () {
  try {
    //1. render page with spinner
    homeView.renderPage();
    // 2. check if conversation/ prompt already exists
    if (!model.state.AIPrompt)
      model.state.AIPrompt = await model.geminiAI(prompt1);
    else homeView.updateAIPrompt(model.state.AIPrompt);
    homeView.addRefreshListener(controlRefreshPrompt);
    // 3. render Bot prompt in chat
    if (!model.state.userPrompt) {
      homeView.updateAIPrompt(model.state.AIPrompt);
      // 4. add event listener to submit button
      homeView.addHandlerSubmit(controlSubmitPrompt);
    } else {
      homeView.loadFetchUserPrompt(model.state.userPrompt);
      homeView.loadAIResponse(model.state.joke);
    }
  } catch (err) {
    console.warn(err);
  }
};
const controlRefreshPrompt = async function () {
  try {
    model.state.joke = {};
    model.state.userPrompt = "";
    model.state.AIPrompt = "";
    await controlRenderHome();
  } catch (err) {
    console.warn(err);
  }
};
const controlSubmitPrompt = async function () {
  try {
    // 1. render user message in chat
    model.state.userPrompt = document.querySelector("textarea").value;
    console.log(model.state.userPrompt);
    homeView.loadFetchUserPrompt(model.state.userPrompt);
    // 2. fetch AI response
    const response = responseToObject(
      await model.geminiAI(
        prompt2,
        model.state.AIPrompt + model.state.userPrompt
      )
    );
    console.log(response);
    // 3. render AI response on page
    model.state.joke = model.createJokeObject(response);
    console.log(model.state.joke);
    homeView.loadAIResponse(model.state.joke);
  } catch (err) {
    console.warn(err);
  }
};
document.addEventListener("DOMContentLoaded", () => controlRenderHome());
