# AI Search Readiness (GEO) — 90/100

## What works
- llms.txt is present at /llms.txt and well-structured: it summarizes the site's purpose and links out to homepage, about, and every review/guide by category — uncommon and genuinely useful for AI crawlers/citation systems
- robots.txt has no disallow rules targeting GPTBot, ClaudeBot, Google-Extended, PerplexityBot, or CCBot — the site is open to AI crawlers by default
- Article schema + verified author entities (sameAs) give LLM systems clear attribution and authority signals for citation
- Content is written in a first-person, opinionated review style ("I review its methods...") which tends to perform well for AI-citation passage extraction

## Findings

### [Info] No explicit AI-crawler allow rules
robots.txt uses a blanket 'User-agent: *' with no specific rules for AI bots, which is functionally open but doesn't explicitly signal intent.

**Recommendation:** Optional: add explicit 'User-agent: GPTBot / Allow: /' style entries if you want to make AI-crawler policy unambiguous, though this is not required since the blanket rule already allows them.
