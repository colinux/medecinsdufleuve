const hLinks = document.querySelector(".hidden-links");

function handleDropdownHidden(node) {
  node.classList.toggle("d-none", true);

  const nodes = Array.from(node.querySelectorAll(".dropdown li")).reverse();
  for (const li of nodes) {
    const clone = li.cloneNode(true);
    clone.querySelector("a").text = li.dataset.asItemText;
    clone.dataset.fromDropdown = true;

    node.after(clone);
  }
}

function handleDropdownVisible(node) {
  node.classList.toggle("d-none", false);

  const nodes = hLinks.querySelectorAll("li[data-from-dropdown]");

  for (const li of nodes) {
    li.remove();
  }
}

// Select the node that will be observed for mutations

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: false };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        if (node.dataset.withDropdown) {
          // Dropdown item trigger is hidden
          handleDropdownHidden(node);
        }
      }

      for (const node of mutation.removedNodes) {
        if (node.dataset.withDropdown) {
          // Dropdown item trigger is visible
          handleDropdownVisible(node);
        }
      }
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(hLinks, config);
