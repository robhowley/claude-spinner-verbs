# Claude Spinner Verbs

> "Thinking..." is the most boring thing a genius could say.

Customize the text that appears while Claude is working. Replace the default spinner verbs with something that has a little more personality.

**Before**: "Thinking...", "Processing...", "Working..." 🥱

**After**: "Paying the iron price...", "With fire and blood..." ⚔️🐉

All availble themes can be viewed in [/spinner-verbs](https://github.com/robhowley/claude-spinner-verbs/tree/main/spinner-verbs)

---

## Pi Integration

If you use [pi](https://pi.dev), install this as a pi package directly from GitHub:

```shell
pi install npm:@robhowley/claude-spinner-verbs
```

Or directly from GitHub:

```shell
pi install git:github.com/robhowley/claude-spinner-verbs
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

The path supports three forms and is resolved relative to the `settings.json` file that contains it — not relative to your working directory:

| Form | Example | Resolved as |
|------|---------|-------------|
| `~/...` | `~/my-verbs.json` | Expanded from your home directory |
| `/absolute/...` | `/etc/my-verbs.json` | Used as-is |
| `relative/...` | `../my-verbs.json` | Relative to the `settings.json` file's directory |

So if your `.pi/settings.json` contains `"spinnerVerbsFile": "../my-verbs.json"`, it resolves to `my-verbs.json` in the project root — not wherever you launched pi from.

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
