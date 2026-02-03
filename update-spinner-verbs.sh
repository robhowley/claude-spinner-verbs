#!/bin/bash

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <filename>"
    echo "Example: $0 game-of-thrones"
    exit 1
fi

FILENAME="$1"
GITHUB_URL="https://raw.githubusercontent.com/robhowley/claude-spinner-verbs/main/${FILENAME}.json"
SETTINGS_FILE=".claude/settings.json"
TEMP_FILE=$(mktemp)

echo "Downloading ${FILENAME}.json..."
curl -sL "$GITHUB_URL" -o "$TEMP_FILE"

if [ ! -f "$SETTINGS_FILE" ]; then
    echo "Creating new settings.json..."
    echo "{}" > "$SETTINGS_FILE"
fi

echo "Merging spinnerVerbs into $SETTINGS_FILE..."
jq -s '.[0] * {spinnerVerbs: .[1].spinnerVerbs}' "$SETTINGS_FILE" "$TEMP_FILE" > "$SETTINGS_FILE.tmp"
mv "$SETTINGS_FILE.tmp" "$SETTINGS_FILE"

rm "$TEMP_FILE"

echo "Done! spinnerVerbs added to $SETTINGS_FILE"
