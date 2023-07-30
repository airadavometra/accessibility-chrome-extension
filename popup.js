async function toggleBlurredVisionOnPage() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const filterElementId = "blurred-filter";
      const filterElement = document.getElementById(filterElementId);

      if (filterElement) {
        filterElement.remove();
      } else {
        const newFilterElement = document.createElement("div");

        newFilterElement.id = filterElementId;

        newFilterElement.style.position = "fixed";
        newFilterElement.style.inset = "0";
        newFilterElement.style.pointerEvents = "none";
        newFilterElement.style.backdropFilter = "blur(3px)";
        newFilterElement.style.zIndex = "1000000";

        //TODO: add pulse animation

        newFilterElement.ariaHidden = "true";

        document.body.appendChild(newFilterElement);
      }
    },
  });
}
async function toggleTremorOnPage() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const filterElement = document.getElementById("blindness-filter");

      if (filterElement) {
        filterElement.remove();
      } else {
        const newFilterElement = document.createElement("div");

        newFilterElement.id = "blindness-filter";

        newFilterElement.style.position = "fixed";
        newFilterElement.style.inset = "0";
        newFilterElement.style.pointerEvents = "none";
        newFilterElement.style.backgroundColor = "#80808090";
        newFilterElement.style.backdropFilter = "blur(30px)";
        newFilterElement.style.zIndex = "1000000";

        newFilterElement.ariaHidden = "true";

        document.body.appendChild(newFilterElement);
      }
    },
  });
}
async function toggleBlindnessOnPage() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const filterElementId = "blindness-filter";

      const filterElement = document.getElementById(filterElementId);

      if (filterElement) {
        filterElement.remove();
      } else {
        const newFilterElement = document.createElement("div");

        newFilterElement.id = filterElementId;

        newFilterElement.style.position = "fixed";
        newFilterElement.style.inset = "0";
        newFilterElement.style.pointerEvents = "none";
        newFilterElement.style.backgroundColor = "#80808090";
        newFilterElement.style.backdropFilter = "blur(30px)";
        newFilterElement.style.zIndex = "1000000";

        newFilterElement.ariaHidden = "true";

        document.body.appendChild(newFilterElement);
      }
    },
  });
}

async function toggleDyslexiaOnPage() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      const collectTextNodes = () => {
        const textNodes = [];
        const treeWalker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT
        );
        let currentNode = treeWalker.nextNode();
        while (currentNode !== null) {
          if (!currentNode.parentNode?.id.includes("service-")) {
            textNodes.push(currentNode);
          }
          currentNode = treeWalker.nextNode();
        }
        return textNodes;
      };

      const messUpWords = (textNodes, wordsInTextNodes) => {
        for (let i = 0; i < textNodes.length; i++) {
          const node = textNodes[i];
          for (let j = 0; j < wordsInTextNodes[i].length; j++) {
            if (Math.random() > 1 / 10) {
              continue;
            }
            const wordMeta = wordsInTextNodes[i][j];
            if (node.nodeValue) {
              const word = node.nodeValue.slice(
                wordMeta.position,
                wordMeta.position + wordMeta.length
              );
              const before = node.nodeValue.slice(0, wordMeta.position);
              const after = node.nodeValue.slice(
                wordMeta.position + wordMeta.length
              );
              node.nodeValue = before + messUpWord(word) + after;
            }
          }
        }
      };

      const messUpWord = (word) => {
        if (word.length < 3) {
          return word;
        }
        return (
          word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1]
        );
      };

      const messUpMessyPart = (messyPart) => {
        if (messyPart.length < 2) {
          return messyPart;
        }
        let a = 0;
        let b = 0;
        while (!(a < b)) {
          a = getRandomInt(0, messyPart.length - 1);
          b = getRandomInt(0, messyPart.length - 1);
        }
        return (
          messyPart.slice(0, a) +
          messyPart[b] +
          messyPart.slice(a + 1, b) +
          messyPart[a] +
          messyPart.slice(b + 1)
        );
      };

      let intervalId;

      if (intervalId) {
        // TODO: doesn't work
        clearInterval(intervalId);
        intervalId = undefined;
      } else {
        intervalId = setInterval(() => {
          const textNodes = collectTextNodes();

          const wordsInTextNodes = [];

          for (const node of textNodes) {
            const words = [];
            const re = /\w+/g;
            let match;
            while ((match = re.exec(node.nodeValue || "")) != null) {
              const word = match[0];
              const position = match.index;
              words.push({
                length: word.length,
                position: position,
              });
            }
            wordsInTextNodes.push(words);
          }
          messUpWords(textNodes, wordsInTextNodes);
        }, 100);
      }
    },
  });
}

async function toggleColorBlindnessOnPage() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const filterElementId = "color-blindness-filter";

      const filterElement = document.getElementById(filterElementId);

      if (filterElement) {
        filterElement.remove();
        document.body.style.filter = "unset";
      } else {
        const svgMarkup = `<svg id=${filterElementId} style="width: 0; height: 0; position: absolute">
              <defs>
                <filter id="protanopia">
                  <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.567, 0.433, 0,     0, 0
                0.558, 0.442, 0,     0, 0
                0,     0.242, 0.758, 0, 0
                0,     0,     0,     1, 0"
                  />
                </filter>
                <filter id="deuteranopia">
                  <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.625, 0.375, 0,   0, 0
                0.7,   0.3,   0,   0, 0
                0,     0.3,   0.7, 0, 0
                0,     0,     0,   1, 0"
                  />
                </filter>
                <filter id="tritanopia">
                  <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.95, 0.05,  0,     0, 0
                0,    0.433, 0.567, 0, 0
                0,    0.475, 0.525, 0, 0
                0,    0,     0,     1, 0"
                  />
                </filter>
                <filter id="achromatopsia">
                  <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0.299, 0.587, 0.114, 0, 0
                0.299, 0.587, 0.114, 0, 0
                0.299, 0.587, 0.114, 0, 0
                0,     0,     0,     1, 0"
                  />
                </filter>
              </defs>
            </svg>
      `;
        document.body.insertAdjacentHTML("beforeend", svgMarkup);
        // TODO: turn on different modes
        document.body.style.filter = "url(#protanopia)";
      }
    },
  });
}

document
  .getElementById("toggleBlurredVision")
  .addEventListener("click", toggleBlurredVisionOnPage);
document
  .getElementById("toggleTremor")
  .addEventListener("click", toggleTremorOnPage);
document
  .getElementById("toggleBlindness")
  .addEventListener("click", toggleBlindnessOnPage);
document
  .getElementById("toggleDyslexia")
  .addEventListener("click", toggleDyslexiaOnPage);
document
  .getElementById("toggleColorBlindness")
  .addEventListener("click", toggleColorBlindnessOnPage);
