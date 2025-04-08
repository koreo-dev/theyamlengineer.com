function copyPermalink(button) {
  const postId = document.querySelector(".post.active").id;
  let url;

  // Use path-based URL format for the two specific posts
  if (postId === "yaml-post") {
    url = `${window.location.origin}/stop-treating-yaml-like-a-string`;
  } else if (postId === "iac-post") {
    url = `${window.location.origin}/controller-driven-iac`;
  } else {
    // Fallback to query param approach for any other posts
    url = `${window.location.origin}${window.location.pathname}?tab=${postId}`;
  }

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

function showPost(postId, updateUrl = true) {
  document.querySelectorAll(".post").forEach((post) => {
    post.classList.remove("active");
  });
  document.querySelectorAll(".tabButton").forEach((tab) => {
    tab.classList.remove("active");
  });

  const defaultPost = "yaml-post";
  const activePostId = postId || defaultPost;

  document.getElementById(activePostId).classList.add("active");
  document
    .querySelector(`[onclick="showPost('${activePostId}')"]`)
    .classList.add("active");

  // Only update URL if explicitly requested and not running from file system
  if (updateUrl && window.location.protocol !== "file:") {
    if (activePostId === "yaml-post") {
      window.history.pushState({}, "", "/stop-treating-yaml-like-a-string");
    } else if (activePostId === "iac-post") {
      window.history.pushState({}, "", "/controller-driven-iac");
    } else {
      // Fallback to query param approach for any other posts
      const url = new URL(window.location);
      url.searchParams.set("tab", activePostId);
      window.history.pushState({}, "", url);
    }
  }

  resetCopiedState();
}

function loadFromUrl() {
  const path = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get("tab");

  if (path === "/stop-treating-yaml-like-a-string") {
    showPost("yaml-post", false);
  } else if (path === "/controller-driven-iac") {
    showPost("iac-post", false);
  } else if (tabId) {
    // Fall back to query parameter approach
    showPost(tabId, false);
  } else if (path === "/" || path === "") {
    // Default to yaml-post for homepage without changing URL
    showPost("yaml-post", false);
  } else {
    // Any other path, default without changing URL
    showPost("yaml-post", false);
  }
}

window.onload = loadFromUrl;
window.addEventListener("popstate", loadFromUrl);

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

  // Initial load from URL without changing URL
  loadFromUrl();
});
