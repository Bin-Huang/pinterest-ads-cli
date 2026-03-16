import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerAnalyticsCommands(program: Command): void {
  program
    .command("analytics <ad-account-id>")
    .description("Get ad account analytics")
    .requiredOption("--start-date <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--end-date <date>", "End date (YYYY-MM-DD)")
    .requiredOption("--columns <cols>", "Metrics (comma-separated, e.g. SPEND_IN_MICRO_DOLLAR,IMPRESSION_1,CLICKTHROUGH_1)")
    .option("--granularity <gran>", "Granularity: TOTAL, DAY, HOUR, WEEK, MONTH (default DAY)", "DAY")
    .option("--click-window-days <n>", "Click attribution window: 0, 1, 7, 14, 30, 60")
    .option("--view-window-days <n>", "View attribution window: 0, 1, 7, 14, 30, 60")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          start_date: opts.startDate,
          end_date: opts.endDate,
          columns: opts.columns,
          granularity: opts.granularity,
        };
        if (opts.clickWindowDays) params.click_window_days = opts.clickWindowDays;
        if (opts.viewWindowDays) params.view_window_days = opts.viewWindowDays;
        const data = await callApi(
          `/ad_accounts/${adAccountId}/analytics`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("campaign-analytics <ad-account-id>")
    .description("Get campaign-level analytics")
    .requiredOption("--campaign-ids <ids>", "Campaign IDs (comma-separated)")
    .requiredOption("--start-date <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--end-date <date>", "End date (YYYY-MM-DD)")
    .requiredOption("--columns <cols>", "Metrics (comma-separated)")
    .option("--granularity <gran>", "Granularity: TOTAL, DAY, HOUR, WEEK, MONTH (default DAY)", "DAY")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          campaign_ids: opts.campaignIds,
          start_date: opts.startDate,
          end_date: opts.endDate,
          columns: opts.columns,
          granularity: opts.granularity,
        };
        const data = await callApi(
          `/ad_accounts/${adAccountId}/campaigns/analytics`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("adgroup-analytics <ad-account-id>")
    .description("Get ad group-level analytics")
    .requiredOption("--ad-group-ids <ids>", "Ad group IDs (comma-separated)")
    .requiredOption("--start-date <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--end-date <date>", "End date (YYYY-MM-DD)")
    .requiredOption("--columns <cols>", "Metrics (comma-separated)")
    .option("--granularity <gran>", "Granularity: TOTAL, DAY, HOUR, WEEK, MONTH (default DAY)", "DAY")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          ad_group_ids: opts.adGroupIds,
          start_date: opts.startDate,
          end_date: opts.endDate,
          columns: opts.columns,
          granularity: opts.granularity,
        };
        const data = await callApi(
          `/ad_accounts/${adAccountId}/ad_groups/analytics`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("ad-analytics <ad-account-id>")
    .description("Get ad-level analytics")
    .requiredOption("--ad-ids <ids>", "Ad IDs (comma-separated)")
    .requiredOption("--start-date <date>", "Start date (YYYY-MM-DD)")
    .requiredOption("--end-date <date>", "End date (YYYY-MM-DD)")
    .requiredOption("--columns <cols>", "Metrics (comma-separated)")
    .option("--granularity <gran>", "Granularity: TOTAL, DAY, HOUR, WEEK, MONTH (default DAY)", "DAY")
    .action(async (adAccountId: string, opts) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const params: Record<string, string> = {
          ad_ids: opts.adIds,
          start_date: opts.startDate,
          end_date: opts.endDate,
          columns: opts.columns,
          granularity: opts.granularity,
        };
        const data = await callApi(
          `/ad_accounts/${adAccountId}/ads/analytics`,
          { creds, params }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
