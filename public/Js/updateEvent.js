const openUpdateEventButtons = document.querySelectorAll(".edit-event-button");
const updateModals = document.querySelectorAll(".edit-event-modal");

// Function to open the update form modal
function openUpdateModal(id) {
  updateModals.forEach((update) => {
    if (update.getAttribute("id") === id) {
      update.classList.remove("hidden");
    }
  });
}

// Function to close the update form modal
function closeUpdateModal(id) {
  updateModals.forEach((update) => {
    if (update.getAttribute("id") === id) {
      update.classList.add("hidden");
    }
  });
}

openUpdateEventButtons.forEach((updateForm) => {
  updateForm.addEventListener("click", (event) => {
    const id = event.target.getAttribute("id");
    console.log(openUpdateModal);
    openUpdateModal(id);
  });
});

// Add event listeners to close modals when "Cancel" button is clicked
updateModals.forEach((update) => {
  const cancelButton = update.querySelector("button[type='button']");
  const id = update.getAttribute("id").replace("editModal", "");
  
  cancelButton.addEventListener("click", () => {
    closeUpdateModal(id);
  });
});

