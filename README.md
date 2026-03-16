# pinterest-ads-cli

A Pinterest Ads CLI designed for AI agents. Wraps the official Pinterest API (v5) with simple, agent-friendly commands.

**Works with:** OpenClaw, Claude Code, Cursor, Codex, and any agent that can run shell commands.

## Installation

```bash
npm install -g pinterest-ads-cli
```

Or run directly with npx:

```bash
npx pinterest-ads-cli --help
```

## How it works

This CLI is a thin wrapper around the official [Pinterest REST API v5](https://developers.pinterest.com/docs/api/v5/). It uses OAuth2 Bearer token authentication and returns all API responses as JSON. No transformation or aggregation.

Core endpoints covered:

- **[Ad Accounts](https://developers.pinterest.com/docs/api/v5/#tag/ad_accounts)** -- list and inspect ad accounts
- **[Campaigns](https://developers.pinterest.com/docs/api/v5/#tag/campaigns)** -- list campaigns under an account
- **[Ad Groups](https://developers.pinterest.com/docs/api/v5/#tag/ad_groups)** -- list ad groups under an account
- **[Ads](https://developers.pinterest.com/docs/api/v5/#tag/ads)** -- list ads under an account
- **Analytics** -- account-level and campaign-level performance metrics

## Setup

### Step 1: Create a Pinterest app

1. Go to [Pinterest Developer Apps](https://developers.pinterest.com/apps/) and sign in.
2. Create a new app. You need a Pinterest Business account.
3. Note your **App ID** and **App Secret**.

### Step 2: Get an OAuth2 access token

Use the Pinterest OAuth2 flow to get an access token with the `ads:read` scope. See [Pinterest OAuth docs](https://developers.pinterest.com/docs/getting-started/authentication/).

For testing, you can generate a token from the [Pinterest API Explorer](https://developers.pinterest.com/tools/api-explorer/).

### Step 3: Place the credentials file

Choose one of these options:

```bash
# Option A: Default path (recommended)
mkdir -p ~/.config/pinterest-ads-cli
cat > ~/.config/pinterest-ads-cli/credentials.json << EOF
{
  "access_token": "YOUR_ACCESS_TOKEN"
}
EOF

# Option B: Environment variable
export PINTEREST_ADS_ACCESS_TOKEN=your_access_token

# Option C: Pass per command
pinterest-ads-cli --credentials /path/to/credentials.json accounts
```

Credentials are resolved in this order:
1. `--credentials <path>` flag
2. `PINTEREST_ADS_ACCESS_TOKEN` env var
3. `~/.config/pinterest-ads-cli/credentials.json` (auto-detected)

### Step 4: Find your Ad Account ID

```bash
pinterest-ads-cli accounts
```

## Usage

All commands output pretty-printed JSON by default. Use `--format compact` for compact single-line JSON.

Pagination uses cursor-based `--bookmark` values returned in the response.

### accounts

List ad accounts the user has access to.

```bash
pinterest-ads-cli accounts
pinterest-ads-cli accounts --page-size 50
```

### account

Get details of a specific ad account.

```bash
pinterest-ads-cli account 123456789
```

### campaigns

List campaigns for an ad account.

```bash
pinterest-ads-cli campaigns 123456789
pinterest-ads-cli campaigns 123456789 --entity-statuses ACTIVE,PAUSED
pinterest-ads-cli campaigns 123456789 --order DESCENDING --page-size 100
```

Options:
- `--campaign-ids <ids>` -- filter by campaign IDs (comma-separated, max 250)
- `--entity-statuses <statuses>` -- filter by status (comma-separated)
- `--page-size <n>` -- results per page (default 25, max 250)
- `--order <order>` -- sort order: ASCENDING or DESCENDING
- `--bookmark <cursor>` -- pagination cursor

### adgroups

List ad groups for an ad account.

```bash
pinterest-ads-cli adgroups 123456789
pinterest-ads-cli adgroups 123456789 --campaign-ids campaign_1,campaign_2
```

Options:
- `--campaign-ids <ids>` -- filter by campaign IDs
- `--ad-group-ids <ids>` -- filter by ad group IDs
- `--entity-statuses <statuses>` -- filter by status
- `--page-size <n>` -- results per page (default 25, max 250)
- `--order <order>` -- sort order
- `--bookmark <cursor>` -- pagination cursor

### ads

List ads for an ad account.

```bash
pinterest-ads-cli ads 123456789
pinterest-ads-cli ads 123456789 --campaign-ids campaign_1 --entity-statuses ACTIVE
```

Options:
- `--campaign-ids <ids>` -- filter by campaign IDs
- `--ad-group-ids <ids>` -- filter by ad group IDs
- `--ad-ids <ids>` -- filter by ad IDs
- `--entity-statuses <statuses>` -- filter by status
- `--page-size <n>` -- results per page (default 25, max 250)
- `--order <order>` -- sort order
- `--bookmark <cursor>` -- pagination cursor

### analytics

Get ad account-level analytics.

```bash
pinterest-ads-cli analytics 123456789 \
  --start-date 2026-03-01 \
  --end-date 2026-03-15 \
  --columns SPEND_IN_MICRO_DOLLAR,IMPRESSION_1,CLICKTHROUGH_1 \
  --granularity DAY
```

Options:
- `--start-date <date>` -- start date, YYYY-MM-DD (required)
- `--end-date <date>` -- end date, YYYY-MM-DD (required)
- `--columns <cols>` -- metrics, comma-separated (required)
- `--granularity <gran>` -- TOTAL, DAY, HOUR, WEEK, MONTH (default DAY)
- `--click-window-days <n>` -- click attribution window (0, 1, 7, 14, 30, 60)
- `--view-window-days <n>` -- view attribution window (0, 1, 7, 14, 30, 60)

### campaign-analytics

Get campaign-level analytics.

```bash
pinterest-ads-cli campaign-analytics 123456789 \
  --campaign-ids campaign_1,campaign_2 \
  --start-date 2026-03-01 \
  --end-date 2026-03-15 \
  --columns SPEND_IN_MICRO_DOLLAR,IMPRESSION_1,CLICKTHROUGH_1
```

## Error output

Errors are written to stderr as JSON with an `error` field and a non-zero exit code:

```json
{"error": "Not authorized to access the requested resource"}
```

## API Reference

- Official docs: https://developers.pinterest.com/docs/api/v5/
- Authentication: https://developers.pinterest.com/docs/getting-started/authentication/

## Related

- [google-analytics-cli](https://github.com/Bin-Huang/google-analytics-cli) -- Google Analytics CLI for AI agents
- [google-search-console-cli](https://github.com/Bin-Huang/google-search-console-cli) -- Google Search Console CLI for AI agents
- [tiktok-ads-cli](https://github.com/Bin-Huang/tiktok-ads-cli) -- TikTok Ads CLI for AI agents
- [x-ads-cli](https://github.com/Bin-Huang/x-ads-cli) -- X Ads CLI for AI agents
- [reddit-ads-cli](https://github.com/Bin-Huang/reddit-ads-cli) -- Reddit Ads CLI for AI agents
- [apple-ads-cli](https://github.com/Bin-Huang/apple-ads-cli) -- Apple Ads CLI for AI agents

## License

Apache-2.0
