# Hand-written fix tasks for the Pianoers fix kit. Each task:
#   pri: 1 (this week) / 2 (weeks 2-3) / 3 (month 2)
#   kind: setting | text | heading | link | image | code | page
#   where: Ghost Admin location
#   title: what to do (one line)
#   note: optional extra explanation
#   copy: list of (label, text) values with copy buttons
#   find / replace: exact text to find in the editor, and what to replace it with
#   steps: optional numbered steps

AFF = "amzn.to, amazon.com, sjv.io, clickbank.net, /PFA, /pianoforall, /pbp"
PS = "Post settings (gear icon, top right)"
TAGS = PS + " → Tags"
META = PS + " → Meta data"
CI = PS + " → Code injection → Post header"
ED = "In the post editor"

def aff(extra=None):
    t = dict(pri=1, kind="setting", where=TAGS, title="Add the internal tag #affiliate",
             note="Type #affiliate in the Tags box (with the #). The theme then shows the affiliate disclosure under the title.",
             copy=[("Tag", "#affiliate")])
    if extra: t["note"] += " " + extra
    return t

def meta_title(v, why="The current one is longer than 60 characters, so Google cuts it off."):
    return dict(pri=2, kind="setting", where=META, title="Replace the meta title", note=why, copy=[("Meta title", v)])

def meta_desc(v, why="The current one is longer than 160 characters, so Google cuts it off."):
    return dict(pri=2, kind="setting", where=META, title="Replace the meta description", note=why, copy=[("Meta description", v)])

def h2(note):
    return dict(pri=2, kind="heading", where=ED, title="Make the main section headings H2", note=note + " Click in each heading and choose the big H in the toolbar; sub-points stay as the small H (H3).")

def rep(find, replace, title="Correct this sentence", note=None, pri=2):
    t = dict(pri=pri, kind="text", where=ED, title=title, find=find, replace=replace)
    if note: t["note"] = note
    return t

def todo(title, note=None, pri=2, kind="text", where=ED, copy=None):
    t = dict(pri=pri, kind=kind, where=where, title=title)
    if note: t["note"] = note
    if copy: t["copy"] = copy
    return t

SITE = [
    dict(pri=1, kind="page", where="Settings → Design & branding → Customize → Change theme → Upload theme",
         title="Upload theme 1.1.3 (pianoers.zip)",
         note="Ghost asks to overwrite the existing Pianoers theme: confirm. It goes live straight away and fixes the affiliate tags, the Continue reading pill, the list-page image loading and llms.txt.",
         steps=["Settings → Design & branding → Customize.", "Bottom left: Change theme → Upload theme.", "Choose pianoers.zip and confirm Overwrite.", "Make sure Pianoers shows as Active."]),
    dict(pri=1, kind="setting", where="Settings → Design & branding → Customize → Post tab → Affiliate domains",
         title="Paste the new Affiliate domains value",
         note="Ghost keeps your old saved value when a theme updates, so this has to be pasted once. It makes the 29 links that go through /PFA, /pianoforall and /pbp (on 9 posts) count as affiliate links.",
         copy=[("Affiliate domains", AFF)]),
    dict(pri=1, kind="setting", where="Each post → " + TAGS,
         title="Add #affiliate to the 12 posts with affiliate links",
         note="Open each post, add the tag, click Update; each post card below has its own tick too. Posts: yamaha-p-145-review, best-beginner-pianos, best-digital-piano, teach-yourself-piano, skoove-review, worship-music-academy-review, hdpiano-review, best-piano-lessons-online, simply-piano-review…, pianoforall-review, best-free-piano-learning-apps, synthesia-piano-review. (Posts that only link to your own Pianoforall review don't need it.) If the PIANOERS promo code on pianomarvel.com earns you money, also tag best-piano-lessons-online and best-free-piano-learning-apps for that, and add pianomarvel.com to Affiliate domains.",
         copy=[("Tag", "#affiliate")]),
    dict(pri=1, kind="page", where="Settings → Staff → Katarina",
         title="Fix Katarina's bio so it can be checked",
         note="Her bio says teaching since 2001 but a member \"since 1995\" of the \"National Association of Music Teachers\" (no US organisation has that name; the real one is MTNA, Music Teachers National Association). Several posts also call her a concert pianist. Write one accurate bio and add a surname if she's happy to. Then fix the posts flagged \"persona\" below.",
         copy=[("Bio template (edit the facts)", "Piano teacher since 2001 with a B.A. in Music from the University of Missouri. Member of the Music Teachers National Association (MTNA). Teaches adult beginners and returning players.")]),
    dict(pri=2, kind="page", where="Settings → Staff → Richard J. Abraham",
         title="Tidy Richard's bio and add profile links",
         note="Add his website or social profiles in the Staff profile (they feed the author's sameAs links). The meta description on his author page is 226 characters; Ghost uses the bio, so shorten the bio's first sentence.",
         copy=[("Shorter bio", "Pianist since age 8, gigging player and teacher of hundreds of kids and adults. I started Pianoers to give straight, tested advice on piano gear and lessons.")]),
    dict(pri=1, kind="page", where="Settings → Labs → Redirects (or wherever /pbp is set up)",
         title="Ask Piano by Pictures for a permanent affiliate link for /pbp",
         note="/pbp currently goes to a leftover funnel page (\"copy-of-sms-fake-bfcm-recovery…\") before a \"free gift\" page. Ask the program for an evergreen URL that keeps affiliate_id=4282845, then update the redirect."),
    dict(pri=2, kind="page", where="Settings → Labs → Redirects → Upload redirects file",
         title="Fix the /best-piano-courses-online/ redirect target",
         note="It points to /best-piano-lessons-online without the slash, causing two redirects. In your redirects file, change the target to /best-piano-lessons-online/ (with the slash)."),
    dict(pri=2, kind="page", where="Settings → Labs → Redirects",
         title="Bring back or redirect /how-hard-is-it-to-learn-piano-as-an-adult/",
         note="That old post still shows up in search but returns a 404. Either republish it with the same URL, or add a 301 redirect to /teach-yourself-piano/.",
         copy=[("redirects.yaml line", "301:\n  /how-hard-is-it-to-learn-piano-as-an-adult/: /teach-yourself-piano/")]),
    dict(pri=2, kind="setting", where="Settings → Tags → Books / Practice / Jazz Piano",
         title="Give the three thin tags a description, or delete them",
         note="Each has 1 post, no description and a default title. Suggested: move Bastien and 5-best-piano-methods into Books; add Open Studio and Piano With Jonny to Jazz Piano; merge Practice into Lessons.",
         copy=[("Books description", "Method books and piano books for adult beginners, reviewed by piano teachers: Faber, Alfred, Bastien, John Thompson and more."),
               ("Jazz Piano description", "Jazz piano courses and lessons reviewed: Open Studio, Piano With Jonny and other ways to learn chords, voicings and improvisation."),
               ("Practice description", "How to practise piano well: short routines, practice journals and tips that help adult beginners improve faster.")]),
    dict(pri=2, kind="setting", where="Settings → Tags → Care",
         title="Remove \"2025\" from the Care tag description",
         copy=[("Care description", "Piano care that works: humidity control, cleaning keys safely, tuning schedules, dehumidifiers vs humidifiers and simple fixes, from piano teachers.")]),
    dict(pri=2, kind="setting", where="Settings → Tags (each tag) → Meta data",
         title="Shorten the tag page descriptions to under 160 characters",
         note="All 7 described tag pages are 196–223 characters. Use these as the tag's meta description.",
         copy=[("Pianos", "Digital piano and keyboard reviews from piano teachers: Yamaha, Roland, Casio and Kawai models for beginners and home players, with specs checked."),
               ("Apps", "Piano learning apps reviewed by teachers: Simply Piano, Flowkey, Skoove, Synthesia, PianoVision and more, with real prices and who each suits."),
               ("Buying guides", "Piano and keyboard buying guides: the best beginner digital pianos, mid-range picks and what to avoid, with prices checked."),
               ("Pianists", "Biographies of great pianists, from Lang Lang and Ahmad Jamal to Cole Lam: their training, breakthroughs and recordings."),
               ("Courses", "Online piano courses reviewed: Pianoforall, Pianote, Open Studio, Piano With Jonny and more, with prices, pros and cons."),
               ("Lessons", "Learn piano: online lessons ranked, how to teach yourself, practice tips and method books for adult beginners.")]),
    dict(pri=1, kind="page", where="Pages → Privacy Policy and Cookie Policy",
         title="Update the privacy and cookie policies",
         note="Both are 2024 templates. Name who runs the site (person or company) and a contact address; list Google Tag Manager / Google Analytics, Claspo, Ghost members and analytics, and the Amazon Associates and course affiliate programs; remove the popupsmart and Flash cookie sections; fill in the blank postal address; and don't claim a consent banner unless one is set up. Also delete the duplicate \"Privacy Policy\" heading at the top of the privacy page body."),
    dict(pri=2, kind="page", where="Pages → New page",
         title="Add an Affiliate disclosure page and link it in the footer",
         note="Then add it to Settings → Navigation → Secondary navigation.",
         copy=[("Page text", "Pianoers.com is reader-supported. Some links on this site are affiliate links: if you buy through one, we may earn a commission at no extra cost to you. We are a participant in the Amazon Services LLC Associates Program, and we also work with some online piano course providers (for example Pianoforall and Simply Piano). Commissions never decide what we recommend or how we rate a product, and we point out downsides even for products we earn from.")]),
    dict(pri=3, kind="page", where="Pages → New page",
         title="Add a \"How we test\" page",
         note="Explain what you actually do: how long you use a piano or course, what you check (key action, sound through speakers and headphones, app connection, price), who does the testing, and how you correct mistakes. Link it from the About page and the author bios."),
    dict(pri=2, kind="page", where="Pages → Contact",
         title="Fix the contact page",
         note="On phones the form is 4px wider than the screen (the Send button is cut off): remove any fixed width in its HTML card. Add a real email address, who answers, and a typical reply time.",
         copy=[("Meta description", "Contact Pianoers.com: questions about a piano, keyboard or online course, corrections and partnership requests. We usually reply within a few days.")]),
    dict(pri=3, kind="page", where="Settings → Code injection → Site header",
         title="Speed up phones: load Google Analytics once and review Claspo",
         note="GA4 loads twice (inside GTM and as its own gtag script). Keep it in GTM and delete the separate gtag snippet. Remove Claspo if its pop-ups don't earn money: together these cost 0.5–1 s of phone processing on every page."),
    dict(pri=3, kind="page", where="Your server (Caddy) and DNS",
         title="Add security headers and fix www.pianoers.com",
         note="For whoever runs the server: add X-Content-Type-Options, Referrer-Policy, Permissions-Policy and X-Frame-Options headers in Caddy (and a Content-Security-Policy in report-only mode first). Point www.pianoers.com to the server and redirect it to pianoers.com.",
         copy=[("Caddy header block", "header {\n  X-Content-Type-Options \"nosniff\"\n  Referrer-Policy \"strict-origin-when-cross-origin\"\n  Permissions-Policy \"camera=(), microphone=(), geolocation=()\"\n  X-Frame-Options \"SAMEORIGIN\"\n}")]),
    dict(pri=3, kind="page", where="Google Search Console and Bing Webmaster Tools",
         title="Connect Search Console and submit the sitemap",
         note="Then rankings, indexing and real-visitor speed can be measured. Sitemap address below.",
         copy=[("Sitemap", "https://pianoers.com/sitemap.xml")]),
]

PAGES = {
"/yamaha-p-145-review/": [
    aff(),
    meta_title("Yamaha P-145BT Review 2026: Still My #1 Beginner Piano"),
    meta_desc("I've played the Yamaha P-145 since 2023 and bought the P-145BT. Honest pros, cons, specs and how it compares with the P-45 for beginners.", "The current one says \"2 years\" and is 215 characters."),
    dict(pri=1, kind="code", where=CI, title="Delete the old FAQ script",
         note="The corrected FAQ is now inside the post. The old <script type=\"application/ld+json\"> FAQPage block in the post header has a 2025 question and one that's not on the page; delete that whole block."),
],
"/best-beginner-pianos/": [
    aff("Then delete the \"Heads-up: some links on this page are Amazon affiliate links\" line so it isn't shown twice."),
    dict(pri=1, kind="setting", where=META, title="Fix the meta title (it's missing a \")\")", copy=[("Meta title", "7 Best Beginner Keyboards & Digital Pianos (2026, Tested)")]),
    dict(pri=1, kind="setting", where=META, title="Replace the meta description (it still says $350)", copy=[("Meta description", "A piano teacher's 7 best beginner keyboards and digital pianos for 2026, from about $220 to $700, with verified specs and a quick piano finder.")]),
    dict(pri=1, kind="image", where=PS + " → Facebook card and X card", title="Upload the landscape share image",
         note="The current one is portrait, so the headline gets cropped when shared. The ready file is best-beginner-keyboard-piano-social.jpg in pianoers/best-beginner-pianos/images/."),
],
"/best-digital-piano/": [
    aff("Then move the Amazon Associates sentence from the bottom of the post to the top, or delete it."),
    rep("CFX-sampled", "CFIIIS-sampled", "Fix the Yamaha P-145BT sound name", pri=1),
    rep("24 instrument voices", "10 instrument voices", "Fix the Yamaha P-145BT voice count", pri=1),
    rep("The GrandTouch-S keyboard has long, wooden keys", "The GrandTouch-S keyboard has synthetic ebony and ivory keytops with escapement", "CLP-835: no wooden keys (that's the CLP-845 and up)"),
    rep("88 keys with GrandTouch-S action (wooden keys)", "88 keys with GrandTouch-S action (synthetic ebony and ivory keytops)", "CLP-835 spec line"),
    rep("Powerful 2-way speaker system (30W + 30W)", "30 W × 2 speakers, one 16 cm speaker with diffuser per side", "CLP-835 speakers"),
    rep("6-speaker system with diffusers (300W total)", "6-speaker system with diffusers ((45 W + 30 W + 40 W) × 2 = 230 W)", "CLP-885 power"),
    rep("it weighs around 168 lbs", "it weighs about 191 lbs (87 kg; polished finish 198 lbs)", "CLP-885 weight"),
    rep("You're looking at $5,000+", "You're looking at about $7,500 (polished finishes up to about $9,000)", "CLP-885 price"),
    todo("CLP-885: remove \"plus a collection of historical pianos and fortepianos\"", "It isn't in Yamaha's spec table."),
    todo("Kawai KDP120: rewrite the Downsides line", "The post says \"No Bluetooth… no recorder, no split/layer modes\". Kawai lists Bluetooth MIDI, a 3-song recorder, Dual mode and Four Hands mode.", copy=[("New downsides line", "The feature set is simple: Bluetooth MIDI for apps, a 3-song recorder, Dual and Four Hands modes, but no Bluetooth audio and only a few voices.")]),
    rep("You're getting that sound in a $499 piano", "You're getting that sound in a piano that lists at $599 and often sells for less", "Kawai ES60 price"),
    rep("typically around $1,950", "listed at $1,799 (often less on sale)", "Kawai ES920 price"),
    rep("around $695", "around $650", "Roland FP-30X price"),
    todo("Fix the budget mismatch", "The heading says \"Under $500\" but the intro says \"under $600\". Use one, and add \"Prices checked October 2026\" near the top."),
    todo("Remove or review the Yamaha P-225 and Kawai ES120", "The intro and Intermediate summary recommend them, but the page has no section on either."),
    todo("Delete the Sweetwater \"no tax in most states\" claim", "Sweetwater has collected sales tax in most states since 2018."),
    rep("Bluetooth MIDI (via Roland Piano Partner app)", "Bluetooth MIDI (works with the Roland Piano App)", "Roland FP-10 app name", pri=3),
    todo("Kawai ES60: delete \"sounds like a $250,000 concert grand\"", "The price figure has no source.", pri=3),
],
"/acoustic-vs-digital-piano/": [
    dict(pri=1, kind="setting", where=META, title="Add a meta description (there is none)", copy=[("Meta description", "Acoustic or digital piano for a beginner? A piano teacher compares touch, sound, cost, upkeep, space and volume, and says which to buy first.")]),
    meta_title("Acoustic vs Digital Piano: Which Is Better for Beginners?", "The current one is 66 characters."),
    h2("All 7 sections are H3 and there is no H2."),
    rep("are indistinguishable from most uprights in blind tests", "feel close to many uprights", "Remove the unsourced \"blind tests\" claim"),
    rep("samples acoustic pianos", "samples or models acoustic pianos", "Fix the definition (Roland models its sound)"),
    rep("61 semi-weighted keys", "usually 61 unweighted keys", "Fix the keyboard definition"),
    todo("Expand the article", "It's 681 words; the top Google results are 1,000–1,700. Add a cost-over-10-years comparison, what to check in a used acoustic, and links to /best-digital-piano/ and /best-beginner-pianos/.", pri=3),
],
"/loog-piano/": [
    dict(pri=2, kind="heading", where=ED, title="Make \"Loog Piano review scores\" an H2", note="It's an H3 before the first H2."),
    todo("Say whether you handled a Loog yourself", "Add one sentence on hands-on time, or say plainly it wasn't tested.", pri=3),
],
"/climate-control-and-your-piano/": [
    meta_title("Piano Humidity and Temperature: Ideal Range & How to Keep It", "The current one is 62 characters."),
    rep("Steinway recommends two to four tunings a year for a piano played about an hour a day", "Steinway recommends tuning at least three or four times a year", "Match Steinway's own wording"),
    todo("Link the sources", "Link Steinway's care page and PTG (ptg.org) where they are cited; the post has no outbound source links yet.", pri=3),
],
"/piano-dehumidifier-101-why-it-is-important/": [
    meta_title("Piano Dehumidifier: Why You Need One and How to Choose", "The current one is 78 characters."),
    meta_desc("What a piano dehumidifier does, when an acoustic piano needs one, the main types (room units, rods, in-piano systems) and how to use them safely.", "The current one is 189 characters."),
    dict(pri=2, kind="heading", where=ED, title="Delete the 3 empty headings and turn the \"✅ If using…\" headings into bold text"),
    rep("Pianos are 80-90% wood", "Most of a piano's working parts are wood and felt", "Remove the unsourced percentage"),
    todo("Give separate price ranges", "\"$50-$400 on a proper dehumidifier\" conflicts with the climate post's $650–$900 for an installed in-piano system. Give one range for room units, one for rods, one for in-piano systems."),
    todo("Soften the digital-piano claim", "\"Whether you've got a grand, upright, or digital piano… a piano dehumidifier isn't optional. It's essential\" overstates it for digital pianos. Say it's for acoustic pianos."),
    todo("Replace the \"Best Beginner Pianos🎹 in 2025\" bookmark card", "Delete the card and add an inline link instead: \"humidity matters much less for a digital piano\" linking to /best-digital-piano/.", kind="link"),
],
"/piano-humidifier/": [
    todo("Best option: merge this post into /climate-control-and-your-piano/ and redirect it", "The two pages compete for the same searches. Move any unique tip (your 45% store experience) into the climate post, then unpublish this one and add a 301 redirect.", pri=2, kind="page",
         copy=[("redirects.yaml line", "301:\n  /piano-humidifier/: /climate-control-and-your-piano/")]),
    todo("If you keep it: delete the asthma and allergy paragraph", "\"Humidifiers can be useful for people who have asthma…\": allergy specialists (AAAAI) warn humidifiers can make indoor allergies worse. Replace with the EPA advice: use distilled water and clean the unit every third day.", pri=1),
    todo("If you keep it: delete the duplicated paragraph", "\"The type of humidifier you use will depend on the severity of dry air…\" appears twice."),
    rep("that's half of what's recommended", "that's less than half of what's recommended", "Fix the maths (20% is less than half of 45%)"),
    rep("pinboard", "pinblock", "Correct the term"),
    todo("Fix the link to /best-piano-courses-online/", "Change it to /best-piano-lessons-online/ (the old address goes through two redirects).", kind="link", pri=1),
    meta_title("Piano Humidifiers: When You Need One and Which Type", "The current one is 61 characters."),
],
"/piano-tuning-when-and-why-its-needed/": [
    todo("Remove the Rachmaninoff intermission story", "\"performing Rachmaninoff's Piano Concerto No. 2 at Bridges Hall… during intermission… the second half of the concerto\": a concerto has no mid-piece intermission, and it conflicts with the author bio.", pri=1),
    rep("as the temperature drops, the frame contracts, potentially causing the pitch to rise", "seasonal changes in humidity make the soundboard swell and shrink, which pushes the pitch up in humid months and down in dry ones", "Fix the main cause of pitch drift"),
    rep("If the tuning pins… appear loose", "If a note won't stay in tune after tuning, or a string breaks", "Replace a sign owners can't see"),
    todo("Cut the filler and add cost and time", "Trim \"A Symphony of Clarity\" and the conclusion by about 40%, and add what a tuning typically costs and how long it takes.", pri=3),
    todo("Fix the meta description", "It says \"explained by an accomplished concert pianist\", which doesn't match the author bio.", kind="setting", where=META,
         copy=[("Meta description", "How often to tune a piano, why pitch drifts with the seasons, signs it needs a tuner and what to expect at a tuning, from a piano teacher.")]),
],
"/how-to-tune-a-piano-a-simple-guide/": [
    todo("Unpublish this post or rewrite it (it gives wrong instructions)", "It says to turn the tuning pin counterclockwise to tighten a string, which is reversed, and describes tools and \"camps\" that don't exist. Safest: unpublish and redirect to /piano-tuning-when-and-why-its-needed/.", pri=1, kind="page",
         copy=[("redirects.yaml line", "301:\n  /how-to-tune-a-piano-a-simple-guide/: /piano-tuning-when-and-why-its-needed/")]),
    todo("If you rewrite: delete the string-cutter and \"demagnetized tuning lever\" passages", "Tuners don't cut strings to tune. The real tools are a tuning lever, mutes, and a tuning fork or electronic tuner."),
    todo("If you rewrite: remove \"How to Tune a Piano without Tools\" and the $10 / $5 rental claim"),
    rep("consists of a pick, a pair of electronic ears, a speaker, and a computer", "is usually a tuning app or strobe tuner that shows how far each note is from pitch", "If you rewrite: fix the electronic tuner description"),
    dict(pri=2, kind="setting", where=META, title="If you keep it: add a meta description (there is none)", copy=[("Meta description", "What piano tuning involves, the tools tuners use, why DIY tuning is risky for beginners and when to call a technician.")]),
],
"/piano-diy-repair-guide/": [
    todo("Delete \"gently tilt the piano and try to dislodge it\"", "Tilting a piano can crush someone.", pri=1),
    rep("Gently remove the keytop (if possible) and use compressed air", "Remove the fallboard and key slip, then use compressed air", "Keytops are glued on"),
    todo("Delete the graphite-powder tip for key pins", "\"A tiny bit of graphite powder (pencil lead works in a pinch) applied to the key pins\": sticking keys from swollen bushings need a technician."),
    todo("Delete the DIY tuning advice", "\"turn it very slightly (less than 1/8 of a turn)\": remove it or replace it with \"call a technician\"."),
    h2("\"The Basics of Piano Anatomy\" is an H3 before the first H2, and there's an H3 that only says \"...\" (delete it)."),
    todo("Remove \"a pro pianist's survival guide\" and fix the title", "\"Keeping Your Instrument in Tune\" doesn't match the content.", copy=[("Meta title", "Piano Repair Basics: Simple Fixes and When to Call a Tech")]),
    meta_desc("Simple, safe fixes for common piano problems such as sticking keys and buzzing notes, and the signs that mean it's time to call a piano technician.", "The current one is 175 characters."),
],
"/how-to-clean-and-maintain-your-piano/": [
    todo("Remove the concert-pianist persona", "\"the first time I laid eyes on my Steinway… across the concert hall stage\" and \"As a concert pianist… my livelihood\" don't match the author bio.", pri=1),
    todo("Pick one rule about the inside of the piano", "The post says not to clean internal parts, then says to vacuum the soundboard and wipe the strings. Safer: leave strings and soundboard to the technician."),
    rep("consider using mothballs", "ask your technician about moth-proofing the felts", "Remove the mothball tip"),
    rep("Always wipe in the direction of the wood grain", "Use a soft microfiber polishing cloth", "Gloss finishes have no grain"),
    rep("20-23 degrees Celsius", "20-22 degrees Celsius", "Fix the conversion"),
    meta_title("How to Clean and Maintain Your Piano: A Practical Guide", "The current one is 86 characters."),
],
"/how-the-piano-works/": [
    rep("When you press the key, the whippen moves down, which pushes the jack down.", "When you press the key, the capstan lifts the wippen, which lifts the jack into the hammer.", "Fix the action description"),
    todo("Delete \"The action of a piano is actually two actions… Each half of the keyboard has 88 keys\""),
    todo("Fix \"that's how we tune a piano\"", "Adjusting the action is regulation, not tuning."),
    rep("Each piano also has 88 dampers", "Most notes have a damper; the highest notes don't need one", "Fix the damper count"),
    rep("There are around 200 strings", "There are about 220 to 240 strings", "Fix the string count"),
    h2("The post has only 3 H3s and no H2."),
    meta_desc("How a piano makes sound: keys, action, hammers, dampers, strings and soundboard, explained simply for beginners.", "The current one promises \"grand vs upright differences\", which the post doesn't cover."),
],
"/are-piano-keys-still-made-of-ivory/": [
    todo("Rewrite or unpublish this post (most of the history is wrong)", "Wrong: Cristofori used hammers, not a plectrum; Sébastien Érard (not Pape) invented double escapement (1821); CITES banned the international ivory trade in 1989, not \"ivory in pianos\"; ivory was sawn into thin veneers and glued on, not boiled and pressed; Ivorite is Yamaha's premium keytop material, not the standard (most keytops are acrylic).", pri=1),
    meta_title("Are Piano Keys Still Made of Ivory? History and Today's Keys", "The current one is 77 characters and says 2025."),
    meta_desc("No. Piano makers stopped using ivory keytops decades ago. A short history of ivory keys, the 1989 ivory trade ban and what keys are made of today.", "The current one is 229 characters and says 2025."),
    h2("Every section is an H3."),
],
"/skoove-review/": [
    aff(),
    dict(pri=2, kind="heading", where=ED, title="Make \"Skoove review scores\" an H2", note="It's an H3 before the first H2."),
    todo("Add the US price first", "Under \"What Skoove costs\": \"$12.49/month, $149.99 billed yearly\"."),
    todo("Replace the borrowed quote with your own test", "\"One independent reviewer who tested it at length called the detection 'virtually perfect'\" → your own result, e.g. how many hours on which piano over USB."),
    todo("Make the code-injection rating match the page (7/10)", "The Review script says 3.5/5. Change ratingValue to 7 and bestRating to 10.", kind="code", where=CI),
],
"/worship-music-academy-review/": [
    aff(),
    rep("lifetime access to their entire course for a one-time price of $39", "lifetime access to the course for a one-time price of $49 (shown reduced from $99, checked October 2026)", "Fix the price", pri=1),
    todo("Name the course and instructor", "\"Worship Piano: Beginner to Pro 2.0\" by Jared Messer, with nearly 400 videos and 80+ PDFs. Pick one name in the H1 (\"Worship Piano Music Academy\" vs \"Worship Music Academy\")."),
    h2("There are no H2s; every section is an H3."),
    todo("Add first-hand proof, or call it an overview", "No screenshots or testing details; 731 words.", pri=3),
],
"/hdpiano-review/": [
    aff(),
    rep("A few teaser lessons to see what it's like", "7-day free trial with full access", "Fix the free trial", pri=1),
    rep("Assesment", "Assessment", "Fix the title typo (also in the meta title)"),
    todo("Use the vendor's spelling \"HDpiano\" in the H1"),
    todo("Re-check $27/month and $196.92/year after signing in", "Couldn't be checked without an account. The site currently offers code PIANO2026 to save $98 on the annual plan.", pri=3),
],
"/open-studio-jazz-review/": [
    todo("Check the founder claim", "The post says Open Studio was \"co-founded by bass legend Christian McBride\". As far as we know it was founded by pianists Peter Martin and Adam Maness, with McBride as an instructor. Confirm, then fix it everywhere including headings.", pri=1),
    rep("500+ lessons", "2,500+ lessons", "Update the lesson count"),
    todo("Remove or source the quotes", "The McBride and Peter Martin quotes, \"How to Survive a Tour Bus\" and the \"Jazz Tree\" method couldn't be traced."),
    todo("Add the yearly prices and trial", "Yearly billing is $33/month (Open Studio) and $47/month (Pro); there's a 14-day free trial and a 30-day guarantee."),
    h2("Only H3/H4 headings, no H2."),
    todo("Replace the \"8 Best Online Piano Lessons🎹 for 2025\" bookmark card", "Use an inline link \"best online piano lessons\" to /best-piano-lessons-online/.", kind="link"),
],
"/best-piano-lessons-online/": [
    aff("This page has the most affiliate links on the site."),
    rep("then runs $37 a month", "then runs $49 a month", "Piano by Pictures price", pri=1),
    rep("Skoove runs $12.99 a month on a yearly plan", "Skoove runs $12.49 a month on a yearly plan", "Skoove price", pri=1),
    rep("Best for AI Feedback on Technique", "Best for Beginners Who Want Instant Note Feedback", "Skoove label (its review says it can't judge technique)"),
    rep("Pianote is $19.99 a month", "Pianote is now part of a Musora membership: $30 a month or $279 a year", "Pianote price", pri=1),
    rep("Best for Live Teacher Feedback", "Best Video-Lesson Library", "Pianote label (its review's main con is no feedback)"),
    todo("Make Simply Piano's rating match its review", "4.7/5 here, 3.5/5 in the Simply Piano review. Pick one and use it in both posts and in the code injection; re-rank if needed.", pri=1),
    todo("Make Flowkey's rating match its review", "3.8/5 here, 4.2/5 in the Flowkey review."),
    rep("nine interactive eBooks", "ten interactive eBooks", "Pianoforall book count"),
    rep("run $12.99 to $24.99", "run $12.49 to $49", "FAQ price range"),
    todo("Fix \"the priciest subscription here\"", "It's said about both Playground Sessions and Piano by Pictures. Keep it only for Piano by Pictures ($49)."),
],
"/simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/": [
    aff(),
    todo("Align the rating with the round-up", "\"Simply Piano is currently ranked #2 on our list\", but this review gives 3.5/5 and \"Weak Value for Adults\". Change one so they agree.", pri=1),
    rep("implie", "implies", "Typo"),
    rep("TL:DR", "TL;DR", "Typo"),
    meta_desc("Simply Piano review from a piano teacher after 6 months: fun for beginners, but at about $170 a year the value gets shaky and adults have better options.", "The current one is 162 characters."),
    todo("Re-check \"14-day free trial on annual plans\" in the app", "Other posts say 7 days.", pri=3),
],
"/pianoforall-review/": [
    aff(),
    dict(pri=1, kind="text", where=ED, title="Delete the sentence that denies affiliate links", find="This isn't your average review full of affiliate links and empty praise.", replace="(delete it)", note="The post has 6 affiliate links."),
    todo("Make the author claim match her bio", "\"As a professional pianist who's paid my dues in conservatories and smoky jazz clubs\" doesn't match Katarina's bio."),
    rep("Pianoforall Academy does a great job of drilling these rhythms", "Pianoforall does a great job of drilling these rhythms", "Wrong product name (and link)"),
    todo("Remove \"Get Another 20% OFF with Code: SAVE20\" unless it still works", "It isn't shown on the order page."),
    todo("Add the 60-day money-back guarantee (verified)"),
    todo("Delete the empty heading, and fix the alt text typo \"Rythm\"", kind="heading"),
],
"/pianote-review/": [
    rep("Basic Pianote (lessons only): $25/month or $200/year. Pianote+: $30/month or $240/year", "Musora membership (includes Pianote): $30/month or $279/year; a lessons-only option is about 17% less", "Fix the pricing", pri=1),
    todo("Remove \"Lifetime option occasionally available (~$997)\"", "It isn't on the plan page."),
    todo("Explain that Pianote now lives inside the Musora app"),
    todo("Merge the two verdict sections", "\"Final Verdict\" and \"Pianote Review 2026 Verdict\" are both H2s.", kind="heading"),
    meta_desc("Pianote review 2026: real pricing (now via Musora), the lack of real-time feedback, and who it suits. Best for self-motivated adults who like pop and jazz.", "The current one is 224 characters."),
],
"/pianovision-review/": [
    rep("The Plus subscription pricing hasn't been finalized yet", "PianoVision Plus costs $9.99/month or $99.99/year and adds 10,000+ licensed songs", "Plus pricing is out now", pri=1),
    rep("(Quest 2, Quest 3, or Quest Pro)", "(Quest 2, Quest 3, Quest 3S or Quest Pro)", "Add Quest 3S"),
    rep("Simply Piano at $180 per year", "Simply Piano at about $170 per year", "Match the Simply Piano review"),
    todo("Remove the aggregateRating from the code-injection script", "Self-rated star counts aren't allowed in review markup, and 400 ratings doesn't match the Meta store. Also fix its 2025 dates.", kind="code", where=CI),
    todo("Delete the empty heading", kind="heading"),
],
"/best-free-piano-learning-apps/": [
    aff(),
    meta_title("Best Piano Learning Apps 2026: Free and Paid, Tested", "The current one is 80 characters."),
    rep("$19.99/mo or $119.99/yr", "$29.99/mo or $149.99/yr", "Skoove price", pri=1),
    rep("Free: 25 lessons", "Free: limited lessons and songs", "Skoove free tier"),
    rep("$30/mo or $200/yr", "$30/mo or $279/yr (Musora)", "Pianote price"),
    rep("300+ video lessons", "400+ video lessons", "Hoffman Academy count"),
    rep("Simply Piano, by JoyTunes", "Simply Piano, by Simply (formerly JoyTunes)", "Company renamed"),
    todo("Fix the broken contents link", "The contents box links to \"…-7-day-free-trial\", but the heading now says \"14-Day\". Re-create the link to the heading."),
    todo("Fix the code-injection list", "numberOfItems says 8 for 7 apps, the page URL is wrong (…/best-free-piano-learning-app/ without the s), and the Simply Piano price and joytunes.com URL are out of date.", kind="code", where=CI),
],
"/synthesia-piano-review/": [
    aff(),
    meta_title("Synthesia Review 2026: Fun Piano Game or a Dead End?", "The current one is 71 characters."),
    rep("Synthesia completely bypasses reading sheet music.", "Notation is optional in Synthesia, and nothing makes you use it.", "Synthesia can show sheet music", pri=1),
    rep("(like Simply Piano", "(like a teacher or a structured course", "Don't contradict the Simply Piano review"),
    todo("Fix the code-injection author and dates", "The Review says \"Pianoers Editorial\" and a different date from the post. Use Katarina and the post's dates.", kind="code", where=CI),
],
"/piano-with-jonny-review/": [
    meta_title("Piano With Jonny Review 2026: Pros, Cons and Alternatives", "The current one is 62 characters."),
    todo("Replace the pricing table", "Use: Monthly $39.95; Annual $299.50/year; 14-day free trial; 30-day refund (checked October 2026). Delete the \"Holiday Special… through December 1\".", pri=1,
         copy=[("Pricing", "Monthly: $39.95 · Annual: $299.50/year · 14-day free trial · 30-day refund (checked October 2026)")]),
    rep("Over 2,200 video lessons (as of late 2025)", "Over 2,440 video lessons (October 2026)", "Lesson count"),
    rep("one of the stronger options available in 2025", "one of the stronger options available in 2026", "Year"),
    todo("Fix the comparison table prices", "Simply Piano $120, Pianote $149 and flowkey $120 don't match your own reviews (about $170, $279 and the Flowkey review)."),
    dict(pri=2, kind="heading", where=ED, title="Make \"Quick Comparison (2026)\" an H2"),
],
"/flowkey-review/": [
    meta_title("Flowkey Review 2026: Is It the Best App to Learn Piano?", "The current one is 64 characters."),
    todo("Align the rating with the round-up", "4.2/5 here vs 3.8/5 in /best-piano-lessons-online/.", pri=1),
    todo("Fix the contradicting \"Best for\" lines", "\"Not Ideal For: Complete beginners\" vs \"Adults who want to finally play piano at their own pace\"."),
    todo("Merge the four closing sections", "\"Verdict Box\", \"Flowkey Review: Verdict\", \"Final Rating\" and \"Final Thoughts\" are all closing H2s.", kind="heading"),
    todo("Re-check prices in the app and add \"as of\" date", pri=3),
],
"/piano-career-academy-review/": [
    meta_title("Piano Career Academy Review 2026: An Honest Assessment", "The current one is 65 characters and says 2025."),
    todo("Change \"(2025)\" in the post title and H1 to 2026, or remove it", pri=1),
    todo("Remove \"jazz, pop, and improvisation\"", "Piano Career Academy is a classical course; we couldn't find those topics."),
    todo("Delete \"So, if you're ready to ditch the metronome…\""),
    todo("Make the author claims match her bio", "\"As a concert pianist with years of experience\" and \"As a professional pianist myself…\"."),
    rep("Ilnica", "Ilinca", "Fix the name in the image alt text", pri=3),
    meta_desc("Piano Career Academy review: Ilinca Vartic's classical course, what the lessons cover, $47/month or $470/year pricing, and who it suits.", "The current one is 164 characters and mentions a concert pianist."),
],
"/stephen-ridley/": [
    todo("Unpublish this post, or rewrite it as a plain course review", "It calls a named person a \"scam\" and a \"con artist\" and links his money to Scientology, while admitting there's \"no concrete paper trail\". That's a legal risk.", pri=1, kind="page"),
    todo("If you rewrite: delete the Scientology section and the \"Royal College of Music and Juilliard\" quote", "His own About page doesn't make that claim."),
    todo("If you rewrite: update the price", "The post says $1,400 and the code injection says $2,997. Current packages go up to $13,994. Check ridleyacademy.net before quoting a price."),
    todo("If you rewrite: new title", copy=[("Title", "Stephen Ridley Piano Academy Review (2026): Price, Method, Who It's For")]),
],
"/teach-yourself-piano/": [
    aff("Also add a short note next to the first Pianoforall link."),
    todo("Delete the three made-up quotes", "\"Sarah Chen\", \"Dr. Elena R., … Berklee\" and \"Michael Chang\".", pri=1),
    todo("Unlink \"Piano sales\"", "It links to /best-beginner-pianos/ from a sentence about market data. Add that link in Step 1 instead.", kind="link"),
],
"/piano-basics-a-beginners-guide-to-the-keyboard/": [
    todo("Fix the octave sentence", "\"Pass G and reach the next A, and the frequency has doubled\": the frequency doubles one octave up (from A to the next A), so rephrase."),
],
"/piano-practice-4-tips-to-successful-sessions/": [
    todo("Cite the 2002 sleep study", "Add a link to Walker et al., Neuron (2002) for \"about 20 percent faster\".", pri=3),
],
"/best-piano-books-for-adult-beginners/": [
    rep("And at $12.99, it's literally half the price of competitors.", "And at $11.99, it costs well under most competitors.", "Accelerated price, and it isn't half", pri=2),
    rep("Price: $12.99 | Completion Time: 6-9 months", "Price: $11.99 | Completion Time: 6-9 months", "Accelerated price line"),
    rep("Alfred's packs more music theory into 143 pages", "Alfred's packs more music theory into 160 pages", "Alfred page count"),
    rep("No videos. No play-along tracks. No apps.", "The basic edition has no videos or apps; a $15.99 edition adds online audio.", "John Thompson has an audio edition"),
    todo("Remove \"Working with a teacher accelerates progress by ~30%\"", "There's no source."),
    todo("Rename the repeated headings per book", "Five \"What Makes It Not Suck\" and \"The Downsides\" H3s; e.g. \"Faber: what works\".", kind="heading", pri=3),
],
"/5-best-piano-methods-to-learn-quickly/": [
    todo("Delete the copied text", "\"Let's hear your story! Share it here and you'll have your own page on my website…\" comes from another website.", pri=1),
    todo("Delete \"Which Piano Method Do You Love?… share your experiences here\" unless you want comments there"),
    dict(pri=2, kind="heading", where=ED, title="Make \"Best for You?\" and \"Which Piano Method Do You Love?\" H2s"),
],
"/bastien-piano-method-is-it-the-right-one-for-you/": [
    meta_desc("Is the Bastien Piano Method right for you or your child? A piano teacher's review of its approach, books, ages it suits and its fixed-hand-position weakness.", "The current one is 198 characters, says 2025 and promises a comparison the post doesn't have."),
    h2("The main sections are H3s, with 6 H4s."),
    todo("Remove the leaked bookmark-card text", "Replace the \"How to learn piano by yourself…\" card with an inline link \"how to teach yourself piano\".", kind="link"),
],
"/ahmad-jamal-biography/": [
    todo("Add a short sources list at the end", "Wikipedia, the NEA Jazz Masters page and the Kennedy Center.", pri=3),
    todo("Check or drop \"Duke Ellington Fellow, Yale University (1994)\"", "It isn't in Wikipedia's awards list.", pri=3),
],
"/cole-lam-the-piano-prodigy/": [
    rep("At the tender age of 12, Cole Lam defies the conventions of expectation", "Cole Lam was 12 when his St Pancras performance went viral; he is now 19 and studies at Berklee after The Purcell School", "He's now 19", pri=2),
    rep("London Street Pancras Station", "London St Pancras Station", "Station name"),
    todo("Delete the generic filler", "\"Media features have highlighted his incredible performances… Lam has also received awards and recognition\" and the Freddie Mercury line. Add real facts: the St Pancras video passed 100M views and he composed the Commonwealth Dance Relay soundtrack."),
],
"/lang-lang-the-biography/": [
    rep("His breakout moment came when he performed at the Grammy Awards in 1999 at age 17", "His breakout moment came in August 1999 at the Ravinia Festival's \"Gala of the Century\", when at 17 he stood in for André Watts in Tchaikovsky's Piano Concerto No. 1 with the Chicago Symphony", "Breakthrough was Ravinia, not the Grammys", pri=2),
    rep("In 1998 at age 15, he released his first album, The Carnegie Hall Concert", "In 2000 he released his first album, Live at Seiji Ozawa Hall, Tanglewood, on Telarc; his first Deutsche Grammophon album followed in 2003", "First album"),
    rep("At 40 years old currently", "At 44", "Age"),
    rep("watched by over 5 billion people globally", "watched by an estimated 1 to 4 billion people", "Olympics audience"),
    rep("Lang Lang composed the official 'Winter Olympics Theme Song'", "Lang Lang recorded the promotional song \"Forever You and Me\" with Andrea Bocelli and Lei Jia", "2022 Olympics"),
    todo("Add his recent work", "Piano Book 2 (DG, October 2025), Hollywood Walk of Fame star (2024), and playing at the Milan–Cortina 2026 Olympic opening ceremony.", pri=3),
    todo("Fix the three broken in-page links in the contents"),
    meta_title("Lang Lang Biography: His Life and Career", "The current title has a stray \"|\"."),
],
"/about/": [
    meta_desc("Pianoers gives straight piano advice: reviews of digital pianos, keyboards and online lessons by piano teachers Richard and Katarina. Here's who we are.", "The current one is 197 characters."),
    todo("Fix the author in the code-injection script", "The About page's structured data says Katarina, but the text is written by Richard.", kind="code", where="Page settings → Code injection"),
    todo("Expand the About page", "Who you are, credentials, how you test, how the site makes money, and how to report a correction (aim for 600+ words).", pri=3),
],
"/privacy-policy/": [
    dict(pri=3, kind="heading", where=ED, title="Delete the duplicate \"Privacy Policy\" heading at the top of the page body"),
    dict(pri=3, kind="setting", where="Page settings → Meta data", title="Add a meta description", copy=[("Meta description", "How Pianoers.com collects, uses and protects your data, including analytics, newsletter sign-ups and affiliate links.")]),
],
"/cookie-policy/": [
    dict(pri=3, kind="setting", where="Page settings → Meta data", title="Add a meta description", copy=[("Meta description", "Which cookies Pianoers.com uses, for analytics, newsletter sign-ups and affiliate links, and how to turn them off.")]),
],
}
