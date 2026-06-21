Playback Speed Controller — Testing Instructions
=============================================

Quick steps to load and test the extension in Chrome (Windows):

1. Open Chrome and go to chrome://extensions/
2. Enable Developer mode (toggle in top-right).
3. Click "Load unpacked" and select the extension folder:

   d:\Projects\MachineCoding\ChromeExtensions\video-playback-rate-mod

4. Open the test page included with this repo:

   - Open file: d:\Projects\MachineCoding\ChromeExtensions\video-playback-rate-mod\test_video.html
   - In Chrome, press Ctrl+O and choose that file, or drag it into the browser.
   - Note: Chrome may block content scripts on local file:// pages by default. In chrome://extensions/ enable "Allow access to file URLs" for the loaded extension to test the local file.

5. Play one of the videos, open the extension popup, choose a rate and click "Set" (or use +/- / Reset).

6. Verify behavior:
   - The videos' playback speeds should change immediately.
   - Open DevTools (F12) on the page and check the Console — you should see lines like:
     [playback-rate] set rate=1.5 on 2 video(s)

7. To test on other sites (YouTube, Vimeo, etc.):
   - Some sites use custom players; the content script will still find native <video> elements in many cases.
   - If a site uses an iframe or obfuscated player, the extension may not affect cross-origin frames.

Troubleshooting
---------------
- If nothing happens when you click Set:
  - Ensure the content script is injected: in chrome://extensions/ click "Service worker" under the extension to see background logs.
  - Check the page DevTools Console for errors and the [playback-rate] log.
- If the popup throws an error about chrome.runtime:
  - Make sure you're testing in Chrome and the extension is loaded (not just opening the popup.html file directly from disk).
 - To inspect the popup UI console: open the popup, then right-click inside it and choose "Inspect" (or use the Extensions page and click the popup view's Inspect link).
 - To view the background/service worker console: visit chrome://extensions/, find the extension and click the "service worker" link (Inspect) to open its DevTools.

- If you see an error when loading unpacked like "could not load icons/icon16.jpg" or similar:
  - This project doesn't include an icons/ folder by default. Chrome reports that error when the manifest references icon files that don't exist.
  - Fix options:
    1) Add an `icons/` folder with the referenced images (e.g. icon16.png, icon48.png, icon128.png).
    2) Or remove the `icons` and `default_icon` entries from `manifest.json` (already removed in this repo) so Chrome won't look for them.
  - If you want to add icons, place PNG files at:
    - d:\Projects\MachineCoding\ChromeExtensions\video-playback-rate-mod\icons\icon16.png
    - d:\Projects\MachineCoding\ChromeExtensions\video-playback-rate-mod\icons\icon48.png
    - d:\Projects\MachineCoding\ChromeExtensions\video-playback-rate-mod\icons\icon128.png
    After adding them, reload the extension on chrome://extensions/.

Next improvements (optional):
- Persist last-used rate in chrome.storage and restore it when the popup opens.
- Auto-apply a saved rate when a page loads (content script reads storage).
- Add keyboard shortcuts (manifest commands) to quickly adjust speed.

---

## License

This extension is licensed under the **MIT License**. See the [LICENSE](../LICENSE) file in the parent directory for details.

You are free to use, modify, and distribute this extension for any purpose (personal or commercial). Just give credit to the original developers.

