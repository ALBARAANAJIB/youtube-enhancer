chrome.runtime.onInstalled.addListener(() => {
  console.log("YouTube Enhancer installed.");
});

// This listens for messages from your popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "auth_and_fetch") {
    // First, try to get the token
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error("Failed to get token:", chrome.runtime.lastError?.message || chrome.runtime.lastError);

        // Remove the cached token if it exists
        chrome.identity.removeCachedAuthToken({ token: token }, () => {
          // Try again to force the authentication flow
          chrome.identity.getAuthToken({ interactive: true }, (newToken) => {
            if (chrome.runtime.lastError || !newToken) {
              console.error("Failed to re-authenticate:", chrome.runtime.lastError?.message || chrome.runtime.lastError);
              sendResponse({ error: "Auth failed" });
              return;
            }

            console.log("New token acquired:", newToken);

            // Fetch liked videos after re-authentication
            fetchLikedVideos(newToken, sendResponse);
          });
        });

        // Return true to indicate asynchronous response
        return true;
      }

      console.log("Token acquired:", token);

      // Proceed with fetching liked videos if the token is valid
      fetchLikedVideos(token, sendResponse);
    });

    // Return true to indicate asynchronous response
    return true;
  }
});

// Helper function to fetch liked videos
function fetchLikedVideos(token, sendResponse) {
  fetch("https://www.googleapis.com/youtube/v3/videos?myRating=like&part=snippet&maxResults=5", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log("Fetched liked videos:", data);
    sendResponse({ success: true, data });
  })
  .catch(err => {
    console.error("API request failed:", err);
    sendResponse({ error: "API failed" });
  });
}
