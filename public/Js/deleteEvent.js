const openDeleteEventButtons = document.querySelectorAll(".delete-event-button");
const deleteModals = document.querySelectorAll(".delete-event-modal");

// Function to open the delete confirmation modal
function openDeleteModal(id) {
  deleteModals.forEach((modal) => {
    if (modal.getAttribute("id") === id) {
      modal.classList.remove("hidden");
    }
  });
}

// Function to close the delete confirmation modal
function closeDeleteModal(id) {
  deleteModals.forEach((deletemodal) => {
    if (deletemodal.getAttribute("id") === id) {
        deletemodal.classList.add("hidden");
    }
  });
}

openDeleteEventButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (event) => {
    const id = event.target.getAttribute("id");
    openDeleteModal(id);
  });
});

// Add event listeners to close modals when "Cancel" button is clicked
deleteModals.forEach((deletemodal) => {
  const cancelButton = deletemodal.querySelector("button[type='button']");
  const id = deletemodal.getAttribute("id").replace("deleteModal", "");
  
  cancelButton.addEventListener("click", () => {
    closeDeleteModal(id);
  });
});