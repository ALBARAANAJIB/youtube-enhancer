document.getElementById("authBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "auth_and_fetch" }, (response) => {
    if (response?.error) {
      alert("Error: " + response.error);
    } else {
      console.log("Success:", response.data);
      alert("Check console for liked videos.");
      document.getElementById("userEmail").textContent = "Logged in as: " + response.data.email;
      document.getElementById("authBtn").style.display = "none";
      document.getElementById("fetchBtn").style.display = "inline-block";
      document.getElementById("logoutBtn").style.display = "inline-block";
    }
  });
});

// Handle logout button click
document.getElementById("logoutBtn").addEventListener("click", () => {
  chrome.identity.removeCachedAuthToken({}, () => {
    console.log("Logged out successfully.");
    document.getElementById("userEmail").textContent = "Not logged in";
    document.getElementById("authBtn").style.display = "inline-block";
    document.getElementById("fetchBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
  });
});
