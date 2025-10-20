#!/bin/bash
# Script to create icon files from SVG using ImageMagick
# Converts icon.svg to PNG files at different sizes

create_icon() {
    size=$1
    echo "Creating icon${size}.png..."
    convert -background none -resize ${size}x${size} icon.svg icon${size}.png
}

create_icon 16
create_icon 48  
create_icon 128

echo "Icons created successfully from icon.svg"
