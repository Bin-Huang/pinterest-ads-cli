import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerCampaignCommands(program: Command): void {
  program
    .command("campaigns <ad-account-id>")
    .description("List campaigns for an ad account")
    .option("--campaign-ids <ids>", "Filter by campaign IDs (comma-separated)")
    .option("--entity-statuses <statuses>", "Filter by status (comma-separated, e.g. ACTIVE,PAUSED)")
    .option("--page-size <n>", "Results per page (default 25, max 250)", "25")
    .option("--order <order>", "Sort order: ASCENDING or DESCENDING")
    .option("--bookmark <cursor>", "Pagination cursor")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          page_size: opts.pageSize,
        };
        if (opts.campaignIds) params.campaign_ids = opts.campaignIds;
        if (opts.entityStatuses) params.entity_statuses = opts.entityStatuses;
        if (opts.order) params.order = opts.order;
        if (opts.bookmark) params.bookmark = opts.bookmark;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/campaigns`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
