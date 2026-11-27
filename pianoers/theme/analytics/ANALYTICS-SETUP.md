# Measuring what readers do: GA4 + Tag Manager setup

Your GA4 export (8–14 Nov 2026) shows **0 key events on every page**. Your Tag Manager container (`GTM-52XDQB4S`) loads the GA4 base tag (`G-4J8LKV62M8`) and your Google Ads tags, but it has no GA4 event tags. So GA4 never hears about affiliate clicks, quiz results or how far people read. A reader who taps "View on Amazon" and leaves can look like a bounce, even though that visit did its job.

Theme 1.7.0 sends these events to Tag Manager's data layer. The file `gtm-pianoers-events.json` passes them on to GA4.

| Event | When it fires | Details sent |
|---|---|---|
| `affiliate_click` | Any click on an affiliate link | `placement` (top_picks, table, sidebar, sticky_bar, pick_card or in_text), `product`, `link_url`, `link_text`, `page_path` |
| `read_next_click` | A click on "Keep reading" or the "Related guide" card | `placement` (after_article or mid_article), `link_url`, `page_path` |
| `article_read` | The reader gets 75% of the way through the article | `percent`, `page_path` |
| `quiz_complete` | The course quiz shows a result (already in the theme since 1.2.0) | `quiz_id`, `quiz_result` |
| `quiz_cta_click` | A click on the quiz result's button (already in the theme) | `quiz_id`, `quiz_result`, `cta_course` |

## 1. Import the tags into Tag Manager (5 minutes)

1. Open [tagmanager.google.com](https://tagmanager.google.com), then your **Pianoers.com** container (`GTM-52XDQB4S`).
2. **Admin → Import Container.**
3. Choose `gtm-pianoers-events.json`.
4. **Choose workspace:** Existing → Default Workspace.
5. **Import option: Merge → Rename conflicting tags, triggers and variables.** Don't choose "Overwrite": it would remove your existing tags.
6. Click **Confirm**. You'll see 5 tags (`GA4 - affiliate_click`, …), 5 triggers (`Event - …`) and 9 variables (`DLV - …`) added. Nothing existing is changed.
7. Click **Preview**, enter `https://pianoers.com/best-digital-piano/`, and click a "View on Amazon" button. In the Tag Assistant window, `GA4 - affiliate_click` should show under **Tags Fired**.
8. Click **Submit → Publish**.

If the import is refused, add the tags by hand. For each event:
- **Trigger:** Custom Event, with the event name exactly as in the table.
- **Tag:** Google Analytics: GA4 Event, measurement ID `G-4J8LKV62M8`, the same event name, and one event parameter per detail. Each parameter's value is a Data Layer Variable with the same name.

## 2. Tell GA4 what counts (5 minutes, the day after publishing)

1. GA4 → **Admin → Data display → Events.** The new events appear once they've fired, which can take up to 24 hours.
2. Mark **`affiliate_click`** as a key event (the star or toggle). Also mark **`quiz_cta_click`**, which is a course sign-up click.
3. **Admin → Data display → Custom definitions → Create custom dimension**, scope **Event**, once for each of these: `placement`, `product`, `quiz_result`. This lets reports show *which* button and *which* product.

Engagement rate and "engaged sessions" now count affiliate clicks. Visits that end on Amazon stop looking like failures.

## 3. Reports to check every week

- **Reports → Engagement → Pages and screens.** Add the **Key events** column: affiliate clicks per page. Pages with high views and low key events are the next ones to fix.
- **Explore → Free form:** rows `Page path`, columns `placement`, value **Event count**, filtered to `affiliate_click`. This shows which button earns the clicks: the top picks box, the table, the sticky bar or the cards.
- **`article_read` ÷ views** per page: the share of readers who reach 75%. Below about 20% means the page loses people early.
- **`read_next_click`** per page: whether "Keep reading" and the related guide are working.

Give each change about two weeks before judging it. One week of data on a site this size moves around a lot.
