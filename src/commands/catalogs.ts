import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerCatalogCommands(program: Command): void {
  program
    .command("catalogs")
    .description("List catalogs")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi("/catalogs", { creds, params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("feeds")
    .description("List catalog feeds")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi("/catalogs/feeds", { creds, params });
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("product-groups <ad-account-id>")
    .description("List product groups for an ad account")
    .option("--feed-id <id>", "Filter by feed ID")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.feedId) params.feed_id = opts.feedId;
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/product_groups/analytics`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
