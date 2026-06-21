
// Content script: receives messages and sets playbackRate on all <video> elements
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== 'setRate') return;
  const rate = Number(message.rate) || 1;
  const videos = document.getElementsByTagName('video');
  for (let i = 0; i < videos.length; i++) {
    try {
      videos[i].playbackRate = rate;
    } catch (e) {
      // ignore errors for cross-origin or unavailable videos
      console.error('Failed to set playbackRate on video', e);
    }
  }
  console.log(`[playback-rate] set rate=${rate} on ${videos.length} video(s)`);
  sendResponse({ updated: true, count: videos.length });
  // return true to indicate we'll send a response asynchronously (not needed here)
});