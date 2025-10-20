#!/bin/bash
# Script to package the extension for Chrome and Firefox

echo "📦 Packaging LinkedIn Skills Importer Extension..."

# Create a timestamp for the package
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="linkedin-skills-importer-${TIMESTAMP}"

# Files to include in the package
FILES=(
    "manifest.json"
    "content.js"
    "popup.html"
    "popup.js"
    "README.md"
    "icons/icon16.png"
    "icons/icon48.png"
    "icons/icon128.png"
)

# Check if all required files exist
echo "🔍 Checking required files..."
MISSING_FILES=0
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing: $file"
        MISSING_FILES=$((MISSING_FILES + 1))
    else
        echo "✅ Found: $file"
    fi
done

if [ $MISSING_FILES -gt 0 ]; then
    echo ""
    echo "⚠️  Warning: $MISSING_FILES file(s) missing!"
    echo "Please ensure all files are present before packaging."
    exit 1
fi

# Create packages directory if it doesn't exist
mkdir -p packages

# Package for Chrome/Edge (zip format)
echo ""
echo "📦 Creating Chrome/Edge package..."
zip -r "packages/${PACKAGE_NAME}-chrome.zip" "${FILES[@]}" -x "*.DS_Store" "*.git*"
echo "✅ Chrome package created: packages/${PACKAGE_NAME}-chrome.zip"

# Package for Firefox (zip format with same content)
echo ""
echo "📦 Creating Firefox package..."
zip -r "packages/${PACKAGE_NAME}-firefox.zip" "${FILES[@]}" -x "*.DS_Store" "*.git*"
echo "✅ Firefox package created: packages/${PACKAGE_NAME}-firefox.zip"

# Calculate sizes
CHROME_SIZE=$(du -h "packages/${PACKAGE_NAME}-chrome.zip" | cut -f1)
FIREFOX_SIZE=$(du -h "packages/${PACKAGE_NAME}-firefox.zip" | cut -f1)

echo ""
echo "🎉 Packaging complete!"
echo ""
echo "📊 Package Summary:"
echo "   Chrome/Edge: packages/${PACKAGE_NAME}-chrome.zip ($CHROME_SIZE)"
echo "   Firefox:     packages/${PACKAGE_NAME}-firefox.zip ($FIREFOX_SIZE)"
echo ""
echo "📝 Next Steps:"
echo ""
echo "   For Chrome Web Store:"
echo "   1. Go to: https://chrome.google.com/webstore/devconsole"
echo "   2. Upload: packages/${PACKAGE_NAME}-chrome.zip"
echo ""
echo "   For Firefox Add-ons:"
echo "   1. Go to: https://addons.mozilla.org/developers/"
echo "   2. Upload: packages/${PACKAGE_NAME}-firefox.zip"
echo ""
echo "   For testing locally:"
echo "   - Chrome: Load unpacked extension from this folder"
echo "   - Firefox: Load temporary add-on using manifest.json"
echo ""

