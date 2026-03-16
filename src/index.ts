#!/usr/bin/env node
import { Command } from "commander";
import { registerAccountCommands } from "./commands/accounts.js";
import { registerCampaignCommands } from "./commands/campaigns.js";
import { registerAdgroupCommands } from "./commands/adgroups.js";
import { registerAdCommands } from "./commands/ads.js";
import { registerKeywordCommands } from "./commands/keywords.js";
import { registerAudienceCommands } from "./commands/audiences.js";
import { registerConversionTagCommands } from "./commands/conversion-tags.js";
import { registerBillingCommands } from "./commands/billing.js";
import { registerLeadFormCommands } from "./commands/lead-forms.js";
import { registerCatalogCommands } from "./commands/catalogs.js";
import { registerTrendCommands } from "./commands/trends.js";
import { registerAnalyticsCommands } from "./commands/analytics.js";

const program = new Command();

program
  .name("pinterest-ads-cli")
  .description("Pinterest Ads CLI for AI agents")
  .version("1.0.0")
  .option("--format <format>", "Output format", "json")
  .option("--credentials <path>", "Path to credentials JSON file")
  .addHelpText(
    "after",
    "\nDocs: https://github.com/Bin-Huang/pinterest-ads-cli"
  );

program.configureOutput({
  writeErr: (str: string) => {
    const msg = str.replace(/^error: /i, "").trim();
    if (msg) process.stderr.write(JSON.stringify({ error: msg }) + "\n");
  },
  writeOut: (str: string) => {
    process.stdout.write(str);
  },
});

program.showHelpAfterError(false);

program.hook("preAction", () => {
  const format = program.opts().format;
  if (format !== "json" && format !== "compact") {
    process.stderr.write(
      JSON.stringify({ error: "Format must be 'json' or 'compact'." }) + "\n"
    );
    process.exit(1);
  }
});

registerAccountCommands(program);
registerCampaignCommands(program);
registerAdgroupCommands(program);
registerAdCommands(program);
registerKeywordCommands(program);
registerAudienceCommands(program);
registerConversionTagCommands(program);
registerBillingCommands(program);
registerLeadFormCommands(program);
registerCatalogCommands(program);
registerTrendCommands(program);
registerAnalyticsCommands(program);

program.on("command:*", (operands) => {
  process.stderr.write(
    JSON.stringify({ error: `Unknown command: ${operands[0]}. Run --help for available commands.` }) + "\n"
  );
  process.exit(1);
});
if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse();
