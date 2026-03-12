import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

export default function (pi: ExtensionAPI) {
  const dir = dirname(fileURLToPath(import.meta.url));
  const verbsDir = join(dir, "..", "spinner-verbs");

  const available = readdirSync(verbsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => basename(f, ".json"));

  function loadVerbs(name: string): string[] {
    return JSON.parse(readFileSync(join(verbsDir, `${name}.json`), "utf-8"));
  }

  pi.registerFlag("verbs", {
    description: `Spinner verb list (${available.join(", ")})`,
    type: "string",
    default: "",
  });

  let interval: ReturnType<typeof setInterval> | undefined;

  function activate(verbs: string[], ctx: { ui: { setWorkingMessage(m?: string): void } }) {
    clearInterval(interval);
    const pick = () => verbs[Math.floor(Math.random() * verbs.length)];
    ctx.ui.setWorkingMessage(`${pick()}...`);
    interval = setInterval(() => ctx.ui.setWorkingMessage(`${pick()}...`), 3000);
  }

  pi.on("session_start", async (_event, ctx) => {
    const flag = pi.getFlag("--verbs") as string;
    if (flag && available.includes(flag)) {
      activate(loadVerbs(flag), ctx);
    }
  });

  pi.registerCommand("verbs", {
    description: "Choose spinner verb list",
    getArgumentCompletions: (prefix: string) => {
      const items = [...available, "(default)"].map((v) => ({ value: v, label: v }));
      const filtered = items.filter((i) => i.value.startsWith(prefix));
      return filtered.length > 0 ? filtered : null;
    },
    handler: async (_args, ctx) => {
      const choice = await ctx.ui.select("Spinner verbs:", [...available, "(default)"]);
      if (!choice) return;
      if (choice === "(default)") {
        clearInterval(interval);
        ctx.ui.setWorkingMessage();
        ctx.ui.notify("Restored default spinner", "info");
      } else {
        activate(loadVerbs(choice), ctx);
        ctx.ui.notify(`Spinner: ${choice}`, "info");
      }
    },
  });

  pi.on("session_shutdown", async () => {
    clearInterval(interval);
  });
}
