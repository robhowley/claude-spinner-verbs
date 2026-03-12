# Claude Spinner Verbs

> "Thinking..." is the most boring thing a genius could say.

Customize the text that appears while Claude is working. Replace the default spinner verbs with something that has a little more personality.

**Before**: "Thinking...", "Processing...", "Working..." 🥱

**After**: "Paying the iron price...", "With fire and blood..." ⚔️🐉

---

## Available Themes

### ⚔️ Game of Thrones

Claude has taken the black. Less "Thinking...", more "Guarding the realms of men."

### 🏒 Doc Emrick

Legendary NHL play-by-play announcer with an almost supernatural collection of synonyms for "pass." The source material:

<img width="630" height="500" alt="image" src="https://github.com/user-attachments/assets/fc8aa08f-68a1-4a4f-a9c3-5828ef699621" />

Can be `fired` into Claude spinner verbs when it's "thinking":

<img width="191" height="64" alt="image" src="https://github.com/user-attachments/assets/40146d06-3189-44f6-af50-1a01c3433988" />

---

## Pi Integration

If you use [pi](https://pi.dev), install this as a pi package directly from GitHub:

```shell
pi install robhowley/claude-spinner-verbs
```

That's it. The extension registers automatically and picks up your configuration on the next session start.

### Switching Themes with `/verbs`

Change your verb list at any time during a session:

```
/verbs game-of-thrones
/verbs doc-emrick
/verbs (default)
```

Run `/verbs` with no argument to get an interactive picker. Use `(default)` to restore Claude's built-in spinner.

### Auto-configure via `settings.json`

Set your preferred theme once and forget about it. Pi checks both project-local (`.pi/settings.json`) and global (`~/.pi/agent/settings.json`) settings on session start.

**Use a built-in theme by name:**

```json
{
  "spinnerVerbs": "game-of-thrones"
}
```

**Point to your own custom verbs file:**

```json
{
  "spinnerVerbsFile": "~/my-verbs.json"
}
```

Your custom file can be a plain JSON array:

```json
["Brewing coffee...", "Asking the oracle...", "Consulting the void..."]
```

**Priority order**: `--verbs` CLI flag → project `.pi/settings.json` → global `~/.pi/agent/settings.json`

---

## Claude Code Integration

### Quick Start

Install any theme with a single command:

```shell
curl -sL https://raw.githubusercontent.com/robhowley/claude-spinner-verbs/main/update-spinner-verbs.sh | bash -s game-of-thrones
```

Replace `game-of-thrones` with any theme name from the [`/spinner-verbs`](./spinner-verbs) directory.

### How It Works

The script will:
- Download the specified theme
- Create `.claude/settings.json` if it doesn't exist
- Merge the spinner verbs into your existing settings

### Manual Installation

Edit your Claude settings file directly:

```
~/.claude/settings.json            # global
[project-root]/.claude/settings.json  # project-specific
```

Add the spinner verbs configuration:

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "Paying the iron price...",
      "What is dead may never die..."
    ]
  }
}
```

**Modes**:
- `"replace"` — swap out the defaults entirely
- `"append"` — add your verbs alongside the defaults
