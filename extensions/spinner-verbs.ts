import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

export default function (pi: ExtensionAPI) {
  const dir = dirname(fileURLToPath(import.meta.url));
  const verbsDir = join(dir, "..", "spinner-verbs");

  const available = readdirSync(verbsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => basename(f, ".json"));

  const DEFAULT = "(default)";
  const availableWithDefault = [...available, DEFAULT];

  function loadVerbs(name: string): string[] {
    const data = JSON.parse(readFileSync(join(verbsDir, `${name}.json`), "utf-8"));
    return data?.spinnerVerbs?.verbs ?? data;
  }

  pi.registerFlag("verbs", {
    description: `Spinner verb list (${available.join(", ")})`,
    type: "string",
    default: "(default)",
  });

  let interval: ReturnType<typeof setInterval> | undefined;

  function activate(verbs: string[], ctx: ExtensionContext) {
    clearInterval(interval);
    const pick = () => verbs[Math.floor(Math.random() * verbs.length)];
    ctx.ui.setWorkingMessage(`${pick()}...`);
    interval = setInterval(() => ctx.ui.setWorkingMessage(`${pick()}...`), 3000);
  }

  function getSettingsVerbs(settingsPath: string): string | undefined {
    if (!existsSync(settingsPath)) return undefined;
    try {
      const settings = JSON.parse(readFileSync(settingsPath, "utf-8"));
      const val = settings?.spinnerVerbs;
      return typeof val === "string" ? val : undefined;
    } catch {
      return undefined;
    }
  }

  pi.on("session_start", async (_event, ctx) => {
    const flag = pi.getFlag("--verbs") as string;
    const projectSettings = join(ctx.cwd, ".pi", "settings.json");
    const globalSettings = join(homedir(), ".pi", "agent", "settings.json");

    const verbChoice =
      (flag && flag !== "(default)" ? flag : undefined) ??
      getSettingsVerbs(projectSettings) ??
      getSettingsVerbs(globalSettings);

    if (verbChoice && available.includes(verbChoice)) {
      activate(loadVerbs(verbChoice), ctx);
    }
  });

  pi.registerCommand("verbs", {
    description: "Choose spinner verb list",
    getArgumentCompletions: (prefix: string) => {
      const matches = availableWithDefault
        .filter((v) => v.startsWith(prefix))
        .map((v) => ({ value: v, label: v }));
      return matches.length > 0 ? matches : null;
    },
    handler: async (args, ctx) => {
      const arg = args.trim();
      if (arg && arg !== DEFAULT && !available.includes(arg)) {
        ctx.ui.notify(`Unknown verb list: ${arg}. Available: ${availableWithDefault.join(", ")}`, "error");
        return;
      }
      const choice = arg || await ctx.ui.select("Spinner verbs:", availableWithDefault);
      if (!choice) return;
      if (choice === DEFAULT) {
        clearInterval(interval);
        ctx.ui.setWorkingMessage();
        ctx.ui.notify("Restored default spinner", "info");
      } else {
        activate(loadVerbs(choice), ctx);
        ctx.ui.notify(`Spinner: ${choice}`, "info");
      }
    },
  });

  pi.on("session_shutdown", () => {
    clearInterval(interval);
  });
}
