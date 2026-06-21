# Chrome Extensions Repository

A collection of useful Chrome extensions for daily productivity and browser enhancements.

## Repository Structure

```
ChromeExtensions/
├── README.md (this file)
├── video-playback-rate-mod/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup/
│   ├── README.md (extension-specific guide)
│   └── ...
├── [future-extension-name]/
│   ├── manifest.json
│   ├── background.js
│   ├── ...
│   └── README.md
└── ...
```

Each extension is in its own folder with a `manifest.json` and extension-specific `README.md`.

---

## Generic Setup Instructions for Any Extension

Follow these steps to load and test any extension from this repository:

### Prerequisites

- Google Chrome browser installed
- Developer mode access in Chrome

### Loading an Extension

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your browser

2. **Enable Developer Mode**
   - Look for the **"Developer mode"** toggle in the top-right corner
   - Click to enable it

3. **Load the Extension**
   - Click the **"Load unpacked"** button
   - Navigate to the extension folder you want to test (e.g., `video-playback-rate-mod/`)
   - Select the folder and click "Open"

4. **Verify the Extension Loaded**
   - The extension should appear in your extensions list
   - You should see the extension ID, version, and status

### Troubleshooting Common Issues

#### "Could not load icons or resources" error

- **Issue**: Chrome is looking for icon files that don't exist
- **Solution**:
  - Option A: Ignore the warning (the extension will still work)
  - Option B: Add an `icons/` folder with PNG files:
    ```
    icons/
    ├── icon16.png (16x16 pixels)
    ├── icon48.png (48x48 pixels)
    └── icon128.png (128x128 pixels)
    ```
  - Option C: Update `manifest.json` to remove `icons` entries if not needed

#### Extension won't work on local files

- **Issue**: Chrome blocks content scripts on `file://` URLs by default
- **Solution**:
  1. Go to `chrome://extensions/`
  2. Find your extension
  3. Enable **"Allow access to file URLs"**

#### Changes not reflected after editing code

- **Solution**:
  1. Go to `chrome://extensions/`
  2. Find your extension
  3. Click the **Reload** button (circular arrow icon)

#### Can't see popup or console errors

- **Solution**:
  1. Open the extension popup
  2. Right-click inside it
  3. Select **"Inspect"** to open DevTools
  4. Check the Console tab for errors

#### View Service Worker / Background Script logs

- Go to `chrome://extensions/`
- Find your extension
- Click on **"service worker"** or **"Inspect views"** link
- This opens DevTools for the background process

---

## Available Extensions

### 1. **Video Playback Rate Modifier**

- **Folder**: `video-playback-rate-mod/`
- **Description**: Control playback speed of HTML5 `<video>` elements
- **Features**:
  - Adjust playback speed (0.5x to 2x)
  - Keyboard shortcuts (+/- / Reset)
  - Works on most video sites (YouTube, Vimeo, etc.)
- **Setup**: See `video-playback-rate-mod/README.md` for detailed instructions
- **Test Page**: Included (`test_video.html`)

### 2. [More extensions coming soon...]

---

## Development Workflow

### Adding a New Extension

1. **Create a new folder** in this directory:

   ```
   ChromeExtensions/new-extension-name/
   ```

2. **Create required files**:
   - `manifest.json` (required - defines extension properties)
   - `background.js` (optional - background service worker)
   - `content.js` (optional - scripts injected into web pages)
   - `popup/popup.html`, `popup/popup.js`, `popup/popup.css` (optional - popup UI)
   - `README.md` (recommended - extension-specific instructions)

3. **Test the extension** using the steps above

4. **Document in base README** (this file) with an entry in the "Available Extensions" section

### Essential Files

#### `manifest.json`

Required file that describes your extension:

```json
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0.0",
  "permissions": ["scripting", "activeTab"],
  "action": {
    "default_popup": "popup/popup.html",
    "default_title": "Extension Title"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

#### `background.js`

Service worker for background tasks and communication:

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle messages from content scripts or popup
});
```

#### `content.js`

Script injected into web pages:

```javascript
console.log("[extension-name] Loaded on", window.location.href);
// Interact with page DOM
```

#### `popup/popup.html`

UI for the extension popup:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="popup.css" />
  </head>
  <body>
    <button id="actionBtn">Do Something</button>
    <script src="popup.js"></script>
  </body>
</html>
```

---

## Tips & Best Practices

1. **Always use Manifest V3** - V2 is deprecated in modern Chrome
2. **Test on multiple sites** - Some sites use custom players or iframes
3. **Check permissions** - Only request permissions you need
4. **Handle CORS** - Content scripts can't make cross-origin requests directly
5. **Use Chrome Storage API** - To persist settings across sessions:
   ```javascript
   chrome.storage.sync.set({ key: value });
   chrome.storage.sync.get(["key"], (result) => console.log(result.key));
   ```
6. **Reload during development** - Always reload after code changes

---

## Resources

- [Chrome Extension Official Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Reference](https://developer.chrome.com/docs/extensions/mv3/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

---

## License

Individual extension licenses may vary. Check each extension's README for details.

---

## Contributing

To add a new extension:

1. Create a new folder following the structure above
2. Include comprehensive `README.md` with setup and usage instructions
3. Update this main README with your extension details
4. Test thoroughly across different websites
