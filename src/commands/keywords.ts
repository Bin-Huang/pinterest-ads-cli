import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerKeywordCommands(program: Command): void {
  program
    .command("keywords <ad-account-id>")
    .description("List keywords for an ad account")
    .option("--ad-group-id <id>", "Filter by ad group ID")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.adGroupId) params.ad_group_id = opts.adGroupId;
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/keywords`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
