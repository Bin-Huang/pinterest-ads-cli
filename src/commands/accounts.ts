import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerAccountCommands(program: Command): void {
  program
    .command("accounts")
    .description("List ad accounts the user has access to")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi("/ad_accounts", { creds, params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("account <ad-account-id>")
    .description("Get details of a specific ad account")
    .action(async (adAccountId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi(`/ad_accounts/${adAccountId}`, { creds });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
