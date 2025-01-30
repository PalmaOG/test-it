const modal = document.getElementById("myModal");
const btn = document.getElementById("creat");
const saveButtons = document.querySelectorAll(".save-btn");
const closeButtons = document.querySelectorAll(".close");
const modalContent = document.querySelector(".modal-content");

function saveFormData() {
  const modalInputs = document.querySelectorAll(
    ".modal-form input, .modal-form div[contenteditable='true']"
  );

  modalInputs.forEach((input) => {
    const mainInput = document.querySelector(
      `.form input[name="${input.getAttribute(
        "name"
      )}"], .form div[contenteditable='true'][name="${input.getAttribute(
        "name"
      )}"]`
    );

    if (mainInput) {
      if (input.tagName.toLowerCase() === "div") {
        mainInput.innerHTML = input.innerHTML;
      } else {
        mainInput.value = input.value;
      }
    }
  });
}

saveButtons.forEach((saveBtn) => {
  saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    saveFormData();
    modal.style.display = "none";
  });
});

btn.onclick = function () {
  modal.style.display = "block";

  document.getElementById("modalSubject").value = document.querySelector(
    '.form input[name="Тема"]'
  ).value;
  document.getElementById("modalStatus").value = document.querySelector(
    '.form input[name="Статус"]'
  ).value;
  document.getElementById("modalDescription").value = document.querySelector(
    '.form input[name="Описание"]'
  ).value;
  document.getElementById("modalProduct").value = document.querySelector(
    '.form input[name="Продукт"]'
  ).value;
  document.getElementById("modalWorkNotes").value = document.querySelector(
    '.form input[name="Рабочие заметки"]'
  ).value;
  document.getElementById("modalPriority").value = document.querySelector(
    '.form input[name="Приоритет"]'
  ).value;
  document.getElementById("modalResponsible").innerHTML =
    document.querySelector(
      '.form div[contenteditable="true"][name="Ответственный"]'
    ).innerHTML;
  document.getElementById("modalGroup").innerHTML = document.querySelector(
    '.form div[contenteditable="true"][name="Группа"]'
  ).innerHTML;
  document.getElementById("modalComments").value = document.querySelector(
    '.form input[name="Комментарии"]'
  ).value;
  document.getElementById("modalApprovers").innerHTML = document.querySelector(
    '.form div[contenteditable="true"][name="Согласующие"]'
  ).innerHTML;
  document.getElementById("modalOpenDate").value =
    document.getElementById("openDate").value;
  document.getElementById("modalOpenedBy").innerHTML = document.querySelector(
    '.form div[contenteditable="true"][name="Кем открыто"]'
  ).innerHTML;
  document.getElementById("modalCreatedDate").value = document.querySelector(
    '.form input[name="Когда создано"]'
  ).value;
  document.getElementById("modalCreatedBy").innerHTML = document.querySelector(
    '.form div[contenteditable="true"][name="Кем создано"]'
  ).innerHTML;
};

closeButtons.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

window.onclick = function (event) {
  if (event.target == modal && !modalContent.contains(event.target)) {
    modal.style.display = "none";
  }
};

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});

function showNamesList(inputField) {
  const namesList = document.createElement("ul");
  namesList.classList.add("names-list");

  const sourceArray = inputField.id === "modalGroup" ? companyGroups : names;

  sourceArray.forEach((name) => {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    listItem.addEventListener("click", () => {
      const nameSpan = document.createElement("span");
      nameSpan.textContent = name;
      nameSpan.style.border = "1px solid #99D5FF";
      nameSpan.style.borderRadius = "3px";
      nameSpan.style.backgroundColor = "#E5F4FF";
      nameSpan.style.color = "#000";
      nameSpan.style.margin = "4px 4px 4px 4px";
      nameSpan.style.display = "inline-block";

      const removeButton = document.createElement("button");
      removeButton.textContent = "✖";
      removeButton.style.marginLeft = "5px";
      removeButton.style.border = "none";
      removeButton.style.background = "transparent";
      removeButton.style.cursor = "pointer";
      removeButton.addEventListener("click", () => {
        inputField.removeChild(nameSpan);
      });

      nameSpan.appendChild(removeButton);

      if (inputField.id === "modalApprovers") {
        inputField.appendChild(nameSpan);
      } else if (
        inputField.id === "modalCreatedBy" ||
        inputField.id === "modalOpenedBy" ||
        inputField.id === "modalResponsible" ||
        inputField.id === "modalGroup"
      ) {
        inputField.innerHTML = "";
        inputField.appendChild(nameSpan);
      } else {
        inputField.value = name;
      }
      namesList.remove();
    });
    namesList.appendChild(listItem);
  });

  inputField.parentNode.insertBefore(namesList, inputField.nextSibling);
}

const magnifierButtons = document.querySelectorAll(".modal-form .inp-btn-plus");

magnifierButtons.forEach((button) => {
  const inputField = button.previousElementSibling;

  button.addEventListener("click", () => {
    showNamesList(inputField);
  });
});
