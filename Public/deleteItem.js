import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showItems } from "./items.js";

export const deleteItem = async (itemId) => {
  if (!itemId) {
    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/wishlist/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        message.textContent = "The item entry was successfully deleted";
        showItems();

      } else {
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
