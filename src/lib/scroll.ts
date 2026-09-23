/**
 * Utility to smoothly scroll down to the contact consultation form.
 * Works seamlessly whether already on the current page with #contact or navigating from another route.
 */
export function scrollToContactForm() {
  const target = document.getElementById("contact");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    const nameInput = target.querySelector<HTMLInputElement>("input[name='name']");
    if (nameInput) {
      setTimeout(() => {
        nameInput.focus({ preventScroll: true });
      }, 450);
    }
    return true;
  }
  return false;
}
