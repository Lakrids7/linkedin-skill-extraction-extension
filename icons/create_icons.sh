#!/bin/bash
# Simple script to create placeholder icon files
# These are minimal valid PNG files that browsers will accept
# Create a minimal PNG (1x1 blue pixel) and resize using base64
create_icon() {
    size=$1
    # This is a base64 encoded 16x16 blue PNG
    echo "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKklEQVR42mNgYGD4TwQGlEOSYWCgHIwqGB5g1AZqBqM2UDMYtYGaAQCKBAH/thB+xAAAAABJRU5ErkJggg==" | base64 -d > icon${size}.png
}
create_icon 16
create_icon 48  
create_icon 128
echo "Placeholder icons created. For better icons, open generate-icons.html in a browser."
