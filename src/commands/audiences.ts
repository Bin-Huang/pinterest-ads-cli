import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerAudienceCommands(program: Command): void {
  program
    .command("audiences <ad-account-id>")
    .description("List audiences for an ad account")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--order <order>", "Sort order: ASCENDING or DESCENDING")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.order) params.order = opts.order;
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/audiences`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("customer-lists <ad-account-id>")
    .description("List customer lists for an ad account")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--order <order>", "Sort order: ASCENDING or DESCENDING")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.order) params.order = opts.order;
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/customer_lists`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
