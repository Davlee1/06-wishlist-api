import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showItems } from "./items.js";

let addEditDiv = null;
let item = null;
let imageURL = null;
let link = null;
let description = null;
let priority = null;
let addingItem = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-item");
  item = document.getElementById("item");
  imageURL = document.getElementById("imageURL");
  link = document.getElementById("link");
  description = document.getElementById("description");
  priority = document.getElementById("priority");
  addingItem = document.getElementById("adding-item");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingItem) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/wishlist";
        if (addingItem.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/wishlist/${addEditDiv.dataset.id}`;
        }
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              item: item.value,
              imageURL: imageURL.value,
              link: link.value,
              description: description.value,
              priority: priority.value,
            }),
          });

          const data = await response.json();
          if (response.status === 201) {
            // 201 indicates a successful create
            message.textContent = "The item entry was created.";

            item.value = "";
            imageURL.value = "";
            link.value = "";
            description.value = "";
            priority.value = "";

            showItems();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showItems();
      }

      enableInput(true);
    }
  });
};

export const showAddEdit = async (itemId) => {
  if (!itemId) {
    item.value = "";
    imageURL.value = "";
    link.value = "";
    description.value = "";
    priority.value = "";
    addingItem.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/wishlist/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        item.value = data.item.item;
        imageURL.value = data.item.imageURL;
        link.value = data.item.link;
        description.value = data.item.description;
        priority.value = data.item.priority;
        addingItem.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = itemId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The item entry was not found";
        showItems();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showItems();
    }

    enableInput(true);
  }
};
