let tags = [];
const inputTagContainer = document.querySelector("#input-tag");
const tagsContainer = document.createElement("div");
const inputTag = document.createElement("span");

inputTagContainer.addEventListener("click", (e) => {
  if (
    e.target.id === "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus();
  }
});

inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTag.textContent !== "") {
    e.preventDefault();
    if (!existTag(inputTag.textContent)) {
      tags.push(inputTag.textContent);
      inputTag.textContent = "";
      renderTags();
    }
  } else if (
    e.key === "Backspace" &&
    inputTag.textContent === "" &&
    tags.length > 0
  ) {
    tags.pop();
    renderTags();
  }
});

function renderTags() {
  tagsContainer.innerHTML = "";
  const html = tags.map((tag) => {
    const tagElement = document.createElement("div");
    const tagButton = document.createElement("button");
    tagElement.classList.add("tag-item");
    tagButton.textContent = "X";
    tagButton.addEventListener("click", (e) => {
      removeTag(tag);
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagButton);
    return tagElement;
  });

  html.forEach((element) => {
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag);
  inputTag.focus();
}

function existTag(value) {
  return tags.includes(value);
}

function removeTag(value) {
  const tagElement = Array.from(tagsContainer.querySelectorAll('.tag-item')).find(
    el => el.textContent.trim().startsWith(value)
  );
  if (tagElement) {
    tagElement.classList.add('removing');
    setTimeout(() => {
      tags = tags.filter((tag) => tag != value);
      renderTags();
    }, 300);
  }
}
