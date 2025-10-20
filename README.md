# LinkedIn Skills Extractor Browser Extension

A cross-browser extension for Chrome and Firefox that allows you to extract LinkedIn skills from any profile with one click.

## Features

- ✅ **Cross-browser compatible**: Works on both Chrome and Firefox
- 🚀 **One-click extraction**: Extract all skills from any LinkedIn profile
- 📋 **Auto-copy to clipboard**: Skills are automatically copied for easy pasting
- 📊 **Preview extracted skills**: See all extracted skills in the popup
- 💾 **Download as JSON**: Option to download skills in JSON format
- 🎯 **Smart extraction**: Filters out endorsement counts and invalid data
- 🔒 **No backend required**: Works completely client-side with your existing LinkedIn login

## Installation

### For Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select the `linkedin-skill-extraction-extension` folder
5. The extension icon should appear in your toolbar

### For Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Navigate to the `linkedin-skill-extraction-extension` folder
4. Select the `manifest.json` file
5. The extension will be loaded temporarily (for permanent installation, you need to sign it through Mozilla)

**Note for Firefox**: For permanent installation, you'll need to:
- Package the extension as a `.zip` file
- Submit it to [addons.mozilla.org](https://addons.mozilla.org) for review and signing
- Or use Firefox Developer Edition with `xpinstall.signatures.required` set to `false` in `about:config`

## Usage

1. **Login to LinkedIn**: Make sure you're logged into your LinkedIn account in your browser

2. **Navigate to a Profile's Skills Page**: 
   - Go to any LinkedIn profile
   - Click on their "Skills" section
   - URL format: `https://www.linkedin.com/in/[username]/details/skills/`
   - Scroll down to ensure all skills are loaded

3. **Open the Extension**: Click the extension icon in your browser toolbar

4. **Extract Skills**: 
   - Click the "Import Skills" button
   - The extension will extract all visible skills from the page
   - Skills are automatically copied to your clipboard (one per line)
   - A preview of the extracted skills appears in the popup

5. **Use the Skills**: 
   - Paste the skills anywhere you need them (Ctrl+V / Cmd+V)
   - Or click "Download as JSON" to save them as a file
   - The skills are ready to be manually copied into your website

## What Gets Extracted

The extension extracts:
- Skill names from the LinkedIn profile
- Filters out endorsement counts and numbers
- Removes duplicate entries
- Provides clean, text-based output

## Output Formats

**Clipboard (Plain Text)**:
```
JavaScript
Python
React
Node.js
...
```

**JSON Download**:
```json
{
  "skills": ["JavaScript", "Python", "React", "Node.js"],
  "extractedAt": "2025-10-20T...",
  "source": "LinkedIn Skills Importer Extension"
}
```

## File Structure

```
linkedin-skill-extraction-extension/
├── manifest.json          # Extension configuration (MV3)
├── content.js            # Content script for extracting skills from LinkedIn
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic and skill extraction
├── generate-icons.html   # Tool to generate custom icons
├── README.md            # This file
└── icons/
    ├── icon16.png       # 16x16 icon
    ├── icon48.png       # 48x48 icon
    ├── icon128.png      # 128x128 icon
    └── create_icons.sh  # Script to regenerate icons
```

## Customizing Icons

The extension includes basic placeholder icons. To create custom icons:

**Option 1: Use the HTML Generator**
1. Open `generate-icons.html` in your browser
2. Click "Download All Icons"
3. Move the downloaded files to the `icons/` folder

**Option 2: Create Your Own**
- Create PNG files in sizes: 16x16, 48x48, and 128x128 pixels
- Name them `icon16.png`, `icon48.png`, `icon128.png`
- Place them in the `icons/` folder
- Reload the extension

## Troubleshooting

**No skills found**:
- Make sure you're on the skills page (URL contains `/details/skills/`)
- Scroll down to load all skills before clicking "Import Skills"
- LinkedIn may have updated their HTML structure - check the browser console for errors

**Clipboard copy failed**:
- Grant clipboard permissions when prompted
- Try the "Download as JSON" option instead

**Extension not working**:
- Reload the extension in your browser's extension manager
- Make sure you're logged into LinkedIn
- Check that the URL matches the pattern: `https://www.linkedin.com/in/*/details/skills/*`

## Privacy & Permissions

This extension requires:
- **activeTab**: To read the current LinkedIn page
- **scripting**: To extract skills from the page DOM
- **storage**: To remember your preferences (not used for authentication)
- **clipboardWrite**: To copy skills to your clipboard
- **host_permissions** (linkedin.com): To run on LinkedIn pages only

**No data is sent to any external servers**. Everything runs locally in your browser.

## Development

To modify the extension:

1. Make changes to the source files
2. Reload the extension in your browser:
   - **Chrome**: Go to `chrome://extensions/` and click the refresh icon
   - **Firefox**: Go to `about:debugging` and click "Reload"
3. Test on a LinkedIn skills page

## License

MIT License - feel free to modify and distribute as needed.
