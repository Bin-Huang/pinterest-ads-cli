import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerLeadFormCommands(program: Command): void {
  program
    .command("lead-forms <ad-account-id>")
    .description("List lead generation forms for an ad account")
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
          `/ad_accounts/${adAccountId}/lead_forms`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("lead-form <ad-account-id> <lead-form-id>")
    .description("Get a specific lead form")
    .action(async (adAccountId: string, leadFormId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi(
          `/ad_accounts/${adAccountId}/lead_forms/${leadFormId}`,
          { creds }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
