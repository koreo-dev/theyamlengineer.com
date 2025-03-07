function copyPermalink(button) {
  const postId = document.querySelector(".post.active").id;
  const url = `${window.location.origin}${window.location.pathname}?tab=${postId}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      const buttonText = button.querySelector(".button-text");
      buttonText.textContent = "Copied!";
      button.classList.add("copy-confirmation");
    })
    .catch((err) => console.error("Failed to copy link:", err));
}

function resetCopiedState() {
  document
    .querySelectorAll(".button-text")
    .forEach((text) => (text.textContent = "Copy Link"));
  document
    .querySelectorAll(".permalink button")
    .forEach((button) => button.classList.remove("copy-confirmation"));
}

function showPost(postId) {
  document.querySelectorAll(".post").forEach((post) => {
    post.classList.remove("active");
  });
  document.querySelectorAll(".tabButton").forEach((tab) => {
    tab.classList.remove("active");
  });

  const defaultPost = "yaml-post";
  document.getElementById(postId || defaultPost).classList.add("active");
  document
    .querySelector(`[onclick="showPost('${postId || defaultPost}')"]`)
    .classList.add("active");

  if (postId) {
    const url = new URL(window.location);
    url.searchParams.set("tab", postId);
    window.history.pushState({}, "", url);
  }

  resetCopiedState();
}

function loadTabFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get("tab");
  showPost(tabId);
}

window.onload = loadTabFromUrl;

window.addEventListener("popstate", loadTabFromUrl);

document.addEventListener("DOMContentLoaded", function () {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Create modal element
  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.innerHTML = `
        <span class="close-btn">&times;</span>
        <img src="" alt="Full Image">
    `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const closeButton = modal.querySelector(".close-btn");

  // Add click event only to images with the modal class if not on mobile
  document.querySelectorAll(".post img.modal").forEach((img) => {
    if (!isMobile()) {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        modalImg.src = this.src;
        modal.style.display = "flex";
      });
    }
  });

  closeButton.addEventListener("click", () => (modal.style.display = "none"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  window.addEventListener("resize", () => {
    if (isMobile()) {
      document
        .querySelectorAll(".post img.modal")
        .forEach((img) => (img.style.cursor = "default"));
    } else {
      document
        .querySelectorAll(".post img.modal")
        .forEach((img) => (img.style.cursor = "pointer"));
    }
  });
});
