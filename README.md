# Claude spinner verbs

## Get claude

Get the [claude cli](https://code.claude.com/docs/en/overview)

```
brew install --cask claude-code
```

## Update settings

### Manually

To update spinner verbs edit settings ... 

```
# globally
~/.claude/settings.json
```

```
# or for a single project
[project-root]/.claude/settings.json
```

and include

```
{
  "spinnerVerbs": {
    "mode": "replace",  # or append
    "verbs": [
      "the verbs"
    ]
  }
}
```

### Via script

```shell
curl -sL https://raw.githubusercontent.com/robhowley/claude-spinner-verbs/main/update-spinner-verbs.sh | bash -s <filename>
```

where `<filename>` is the basename of any spinner verb json file, e.g. `game-of-thrones`

## Game of Thrones

Claude has taken the black. Less "Thinking...", more "Paying the iron price."

## Doc Emrick

Legendary hockey play by play announcer with an impressive collection of synonyms for "pass". The source material for his linguistic prowess

<img width="630" height="500" alt="image" src="https://github.com/user-attachments/assets/fc8aa08f-68a1-4a4f-a9c3-5828ef699621" />

Can be `fired` into claude spinner verbs when it's "thinking"

<img width="191" height="64" alt="image" src="https://github.com/user-attachments/assets/40146d06-3189-44f6-af50-1a01c3433988" />
