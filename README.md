# Claude spinner verbs

Customize the text that appears when Claude Code is thinking.

**Default**: "Thinking...", "Processing...", "Working..." 🥱

**With Game of Thrones**: "Paying the iron price...", "With fire and blood..." ⚔️🐉

## Available Themes

### Game of Thrones

Claude has taken the black. Less "Thinking...", more "Guarding the realms of men."

### Doc Emrick

Legendary hockey play-by-play announcer with an impressive collection of synonyms for "pass". The source material for his linguistic prowess:

<img width="630" height="500" alt="image" src="https://github.com/user-attachments/assets/fc8aa08f-68a1-4a4f-a9c3-5828ef699621" />

Can be `fired` into Claude spinner verbs when it's "thinking":

<img width="191" height="64" alt="image" src="https://github.com/user-attachments/assets/40146d06-3189-44f6-af50-1a01c3433988" />

## Quick Start

Install a theme with one command:

```shell
curl -sL https://raw.githubusercontent.com/robhowley/claude-spinner-verbs/main/update-spinner-verbs.sh | bash -s <filename>
```

where `<filename>` is a filename from /spinner-verbs, e.g. game-of-thrones.

Example:
```shell
curl -sL https://raw.githubusercontent.com/robhowley/claude-spinner-verbs/main/update-spinner-verbs.sh | bash -s game-of-thrones
```

## Installation

### Prerequisites

Install the [Claude CLI](https://code.claude.com/docs/en/overview) if you haven't already:

```shell
brew install --cask claude-code
```

### Automated Installation (Recommended)

Use the installation script to automatically update your settings:

```shell
curl -sL https://raw.githubusercontent.com/robhowley/claude-spinner-verbs/main/update-spinner-verbs.sh | bash -s <filename>
```

The script will
- Download the specified theme
- Create `.claude/settings.json` if it doesn't exist
- Merge the spinner verbs into your existing settings

### Manual Installation

Edit your settings file

```
# Global settings
~/.claude/settings.json

# Project-specific settings
[project-root]/.claude/settings.json
```

Add the spinner verbs configuration

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "verb 1",
      "verb 2"
    ]
  }
}
```

**Modes**:
- `"replace"`: Replace default verbs entirely with your custom list
- `"append"`: Add your verbs to the default list
