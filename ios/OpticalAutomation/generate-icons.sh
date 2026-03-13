#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 /path/to/1024x1024-source.png"
  exit 1
fi

SRC="$1"
if [ ! -f "$SRC" ]; then
  echo "Source file not found: $SRC"
  exit 1
fi

DST_DIR="Assets.xcassets/AppIcon.appiconset"
if [ ! -d "$DST_DIR" ]; then
  echo "Destination appiconset not found: $DST_DIR"
  exit 1
fi

# Ensure the source is at least 1024x1024
width=$(sips -g pixelWidth "$SRC" | awk '/pixelWidth/ {print $2}')
height=$(sips -g pixelHeight "$SRC" | awk '/pixelHeight/ {print $2}')
if [ "$width" -lt 1024 ] || [ "$height" -lt 1024 ]; then
  echo "Source must be at least 1024x1024. Got ${width}x${height}."
  exit 1
fi

echo "Generating icons from: $SRC"
cd "$DST_DIR"

gen() {
  local size="$1"
  local name="$2"
  echo " - $name (${size}x${size})"
  /usr/bin/sips -Z "$size" "$SRC" --out "$name" >/dev/null
}

# iPhone
gen 40  "Icon-20@2x.png"
gen 60  "Icon-20@3x.png"

gen 58  "Icon-29@2x.png"
gen 87  "Icon-29@3x.png"

gen 80  "Icon-40@2x.png"
gen 120 "Icon-40@3x.png"

gen 120 "Icon-60@2x.png"
gen 180 "Icon-60@3x.png"

# iPad
gen 20  "Icon-20~ipad.png"
gen 40  "Icon-20@2x~ipad.png"

gen 29  "Icon-29~ipad.png"
gen 58  "Icon-29@2x~ipad.png"

gen 40  "Icon-40~ipad.png"
gen 80  "Icon-40@2x~ipad.png"

gen 76  "Icon-76~ipad.png"
gen 152 "Icon-76@2x~ipad.png"

gen 167 "Icon-83.5@2x~ipad.png"

# Marketing (ensure exact 1024x1024)
echo " - AppIcon.png (1024x1024)"
/usr/bin/sips -Z 1024 "$SRC" --out "AppIcon.png" >/dev/null

echo "Done. Remove any invalid JPG (e.g., AppIcon.jpg) from this folder, then Clean Build."
