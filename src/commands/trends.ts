import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerTrendCommands(program: Command): void {
  program
    .command("trends <region>")
    .description("Get trending search terms for a region (e.g. US, GB, CA)")
    .requiredOption("--trend-type <type>", "Trend type: growing, monthly, yearly, seasonal")
    .option("--interests <interests>", "Filter by interests (comma-separated)")
    .option("--genders <genders>", "Filter by genders (comma-separated)")
    .option("--ages <ages>", "Filter by age groups (comma-separated)")
    .option("--limit <n>", "Number of results (default 50)", "50")
    .action(async (region: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const trendType = opts.trendType;
        const params: Record<string, string> = {
          limit: opts.limit,
        };
        if (opts.interests) params.interests = opts.interests;
        if (opts.genders) params.genders = opts.genders;
        if (opts.ages) params.ages = opts.ages;
        const data = await callApi(`/trends/keywords/${region}/top/${trendType}`, { creds, params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
