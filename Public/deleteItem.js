import { message, token } from "./index.js";
import { showItems } from "./items.js";

export const deleteItem = async (itemId) => {
  if (!itemId) return;

  try {
    const response = await fetch(`/api/v1/wishlist/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    message.textContent =
      response.status === 200
        ? "The item entry was successfully deleted"
        : "The item entry was not found";
    showItems();
  } catch (err) {
    console.log(err);
    message.textContent = "A communications error has occurred.";
    showItems();
  }
};
