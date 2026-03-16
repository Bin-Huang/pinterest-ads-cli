import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerBillingCommands(program: Command): void {
  program
    .command("billing-profiles <ad-account-id>")
    .description("List billing profiles for an ad account")
    .option("--is-active", "Only return active profiles")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.isActive) params.is_active = "true";
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/billing_profiles`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("order-lines <ad-account-id>")
    .description("List order lines for an ad account")
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
          `/ad_accounts/${adAccountId}/order_lines`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("order-line <ad-account-id> <order-line-id>")
    .description("Get a specific order line")
    .action(async (adAccountId: string, orderLineId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi(
          `/ad_accounts/${adAccountId}/order_lines/${orderLineId}`,
          { creds }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
