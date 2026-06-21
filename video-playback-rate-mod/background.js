
// Background service worker: forwards requests from the popup to the active tab's content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) return;

  if (message.type === 'setRate') {
	const rate = Number(message.rate) || 1;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  const tab = tabs && tabs[0];
	  if (!tab || !tab.id) return;
	  chrome.tabs.sendMessage(tab.id, { type: 'setRate', rate }, (response) => {
		// optional: could handle response
	  });
	});
  }
});