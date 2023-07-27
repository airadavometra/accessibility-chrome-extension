import { simulateBlindness } from "web-accessibility-filters";

const doSomething = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: simulateBlindness,
  });
};

document.getElementById("toggleButton").addEventListener("click", doSomething);
