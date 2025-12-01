s# LinkedIn Skills Importer

A simple browser extension that extracts skills from LinkedIn profiles with one click.

![Chrome Web Store](https://img.shields.io/badge/Chrome-Available-green)
![Firefox](https://img.shields.io/badge/Firefox-Available-green)

## Features

- 🚀 Extract all skills from any LinkedIn profile instantly
- 📋 Automatically copy to clipboard
- 💾 Download skills as JSON file
- 🔒 100% local - no data sent to external servers
- ✨ Clean, simple interface

## Installation

### Chrome Web Store
(https://chromewebstore.google.com/detail/linkedin-skills-importer/lkhjbkpanpolhijihjjkbjjiamjgddlf?authuser=0&hl=da)

### Firefox Add-ons
(https://addons.mozilla.org/en-US/firefox/addon/linkedin-skills-importer/)

### Manual Installation

**Chrome:**
1. Download or clone this repository
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

**Firefox:**
1. Download or clone this repository
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file

## Usage

1. Navigate to a LinkedIn profile's skills section:
   - URL should look like: `linkedin.com/in/[username]/details/skills/`
2. Click the extension icon
3. Click "Import Skills"
4. Skills are copied to your clipboard and displayed in the popup
5. Optionally download as JSON file

**Tip:** Scroll down on the LinkedIn page to load all skills before extracting.

## Privacy

This extension does **NOT**:
- Collect any personal data
- Store data persistently
- Send data to external servers
- Track your browsing activity

All processing happens locally in your browser. [Read full privacy policy](privacy-policy.html)

## Permissions

- **activeTab**: Access current LinkedIn page when you click the extension
- **scripting**: Read skill names from the page
- **linkedin.com**: Function on LinkedIn profile pages only

## Development

Built with vanilla JavaScript using Manifest V3.

To modify:
1. Edit the source files
2. Reload the extension in `chrome://extensions/` or `about:debugging`
3. Test on a LinkedIn skills page

## File Structure

```
├── manifest.json       # Extension config
├── content.js         # Skills extraction logic
├── popup.html/js      # Extension popup UI
├── icons/             # Extension icons
└── privacy-policy.html
```

## License

MIT License - Free to use and modify

## Support

Having issues? [Open an issue](https://github.com/yourusername/linkedin-skill-extraction-extension/issues)
