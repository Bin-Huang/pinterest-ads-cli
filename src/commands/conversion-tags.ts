import { Command } from "commander";
import { loadCredentials } from "../auth.js";
import { callApi } from "../api.js";
import { output, fatal } from "../utils.js";

export function registerConversionTagCommands(program: Command): void {
  program
    .command("conversion-tags <ad-account-id>")
    .description("List conversion tags for an ad account")
    .action(async (adAccountId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi(
          `/ad_accounts/${adAccountId}/conversion_tags`,
          { creds }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });

  program
    .command("conversion-tag <ad-account-id> <tag-id>")
    .description("Get a specific conversion tag")
    .action(async (adAccountId: string, tagId: string) => {
      try {
        const creds = loadCredentials(program.opts().credentials);
        const data = await callApi(
          `/ad_accounts/${adAccountId}/conversion_tags/${tagId}`,
          { creds }
        );
        output(data, program.opts().format);
      } catch (err) {
        fatal((err as Error).message);
      }
    });
}
