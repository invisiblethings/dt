"""Homeowner guides. Informational content that targets question-style searches
and gives answer engines a clear, quotable answer up top (`key_answer`).

Rules change, so every guide closes with a "verify with the agency" note
(added by the template).
"""

PUBLISHED = "2026-10-20"

GUIDES = [
    {
        "slug": "nyc-renovation-permits",
        "sheet": "G-101",
        "title": "Do I Need a Permit to Renovate in NYC? Staten Island Guide",
        "description": "Which home projects need an NYC Department of Buildings permit on Staten Island: painting, floors, kitchens, baths, walls, decks and additions.",
        "h1": "Do I need a permit to renovate in NYC?",
        "dek": "A Staten Island homeowner's guide to what the Department of Buildings cares about, and what it doesn't.",
        "key_answer": "In New York City, cosmetic work like painting, new flooring, and replacing cabinets or fixtures in the same place generally doesn't need a Department of Buildings (DOB) permit. Work that changes structure, plumbing, gas, electrical, egress or the building's use generally does, and it must be filed by licensed professionals. That includes removing load-bearing walls, moving plumbing, adding circuits, building additions and decks, and changing occupancy.",
        "related": ["kitchen-remodeling", "bathroom-remodeling", "home-renovations", "home-additions"],
        "body": """
<h2>The short version</h2>
<p>The NYC Department of Buildings (DOB) regulates work that affects how a building stands up, how people get out of it in a fire, and the systems that can hurt someone if they're done wrong: structure, plumbing, gas, electrical, fire protection and use. Finishes mostly aren't its concern.</p>

<h3>Usually no DOB permit</h3>
<ul>
  <li>Interior and exterior painting</li>
  <li>New flooring over an existing floor structure</li>
  <li>Replacing kitchen cabinets and countertops in the same layout</li>
  <li>Replacing tile and finishes in a bathroom without moving fixtures</li>
  <li>Patching drywall and plaster</li>
</ul>

<h3>Usually needs a permit or filing</h3>
<ul>
  <li><strong>Removing or altering walls</strong>, especially load-bearing ones, which needs a licensed architect or engineer</li>
  <li><strong>Plumbing</strong>: moving or adding fixtures, drains or supply lines, filed by a licensed master plumber</li>
  <li><strong>Gas</strong>: any new gas piping or appliance relocation</li>
  <li><strong>Electrical</strong>: most electrical work in NYC must be done by a DOB-licensed electrician, who files it with the DOB</li>
  <li><strong>Additions, dormers and new decks</strong></li>
  <li><strong>Changing use or occupancy</strong>, such as turning a basement into a bedroom or apartment</li>
  <li><strong>Structural roof work</strong>, meaning new framing or a changed roof line</li>
</ul>

<h2>Staten Island wrinkles</h2>
<p><strong>Landmarks.</strong> If your house is in a historic district (such as St. George/New Brighton on the North Shore) or individually landmarked, exterior changes and permitted interior work also need Landmarks Preservation Commission approval.</p>
<p><strong>Flood zones.</strong> Parts of the East and South Shore are in FEMA flood zones, where substantial improvements and new construction can trigger flood-resistant construction and elevation requirements.</p>
<p><strong>Special districts.</strong> Much of the South Shore is in the Special South Richmond Development District, which adds zoning review for some site work and additions.</p>
<p><strong>Sidewalks and curb cuts.</strong> Work on the public sidewalk in front of your house needs an NYC DOT permit. New or widened curb cuts involve DOB and DOT.</p>

<h2>How to check what's been filed on your house</h2>
<p>Permits and filings are public. Search your address on the DOB's online systems (DOB NOW Public Portal and the Building Information System) to see past jobs, open permits and violations. It's worth doing before you buy a house, and before you hire someone to finish a job another contractor started.</p>

<h2>Why it matters</h2>
<p>Unpermitted work can lead to violations and stop-work orders, complicate insurance claims, and hold up a sale when the buyer's attorney runs a search. Work done without licensed trades can also simply be unsafe.</p>

<h2>How we handle it</h2>
<p>At the walkthrough we'll tell you which parts of your project are cosmetic and which need filings. For filed work, we build to your architect's or engineer's approved plans, and plumbing and electrical are done by licensed NYC plumbers and electricians.</p>
""",
    },
    {
        "slug": "condo-coi-alteration-agreement",
        "sheet": "G-102",
        "title": "Condo & Co-op Renovations NYC: COIs & Alteration Agreements",
        "description": "What COIs and alteration agreements are, what NYC condo and co-op buildings require from contractors, and how to get your renovation approved faster.",
        "h1": "Condo & co-op renovations in NYC: COIs and alteration agreements",
        "dek": "The paperwork your building will ask for, and how to get through it without losing a month.",
        "key_answer": "Before a contractor can work in most NYC condos and co-ops, the building requires a certificate of insurance (COI) naming the condo or co-op corporation, the board and the managing agent as additional insureds, at the liability limits the building sets. Larger projects such as kitchens, bathrooms and anything touching plumbing, electrical or walls usually also need a signed alteration agreement and board approval, and sometimes architect drawings and DOB filings.",
        "related": ["condo-apartment-renovations", "interior-painting", "kitchen-remodeling", "bathroom-remodeling"],
        "body": """
<h2>What is a COI?</h2>
<p>A certificate of insurance is a one-page summary, usually on a standard ACORD form, that proves the contractor carries insurance. NYC buildings ask for it so that if a worker is hurt, a pipe floods the unit below, or a hallway gets damaged, the contractor's policy responds first, not the building's.</p>

<h3>What buildings typically require on the COI</h3>
<ul>
  <li><strong>General liability</strong> at limits the building sets. Many ask for at least $1 million per occurrence and $2 million aggregate, and some, especially in Manhattan, require an additional umbrella policy.</li>
  <li><strong>Additional insureds</strong>: the condo or co-op corporation, the board of managers or directors, and the managing agent, named exactly as the building specifies</li>
  <li><strong>Workers' compensation and disability</strong> coverage as required by New York State</li>
  <li>Wording such as <em>primary and non-contributory</em> and <em>waiver of subrogation</em></li>
  <li>The unit owner sometimes listed as well</li>
</ul>
<p><strong>Tip:</strong> Ask management for their COI sample or requirements sheet and send it straight to your contractor. Most rejected COIs come down to a misspelled corporation name or a missing additional insured.</p>

<h2>What is an alteration agreement?</h2>
<p>An alteration agreement is a contract between you (the unit owner or shareholder) and the building. It spells out what you're allowed to change and how. It usually covers:</p>
<ul>
  <li>Scope of work, and plans or drawings for larger projects</li>
  <li>Contractor insurance and licensing requirements</li>
  <li>A refundable security deposit and fees for the building's architect or engineer to review plans</li>
  <li>Permitted work hours and days, and in some co-ops, summer-only rules for major work</li>
  <li>Elevator use, protection of common areas, and debris removal</li>
  <li>Waterproofing requirements for wet areas (bathrooms, kitchens)</li>
  <li>Completion deadlines and penalties</li>
</ul>

<h2>What usually needs what</h2>
<ul>
  <li><strong>Painting, minor repairs:</strong> COI plus notice to management</li>
  <li><strong>Flooring:</strong> COI, and often the building's acoustic underlayment spec</li>
  <li><strong>Kitchens and bathrooms:</strong> COI, alteration agreement, board approval, and often drawings, plus DOB filings for plumbing or electrical changes</li>
  <li><strong>Wall removals and layout changes:</strong> all of the above plus architect or engineer drawings and DOB approval</li>
</ul>

<h2>How to get approved faster</h2>
<ol>
  <li>Get the building's alteration package and COI requirements before you collect quotes.</li>
  <li>Choose a contractor who has done COIs for managed buildings before and can turn one around quickly.</li>
  <li>Submit a complete package at once, with scope, schedule, insurance and license information. Boards slow down on incomplete submissions.</li>
  <li>Book the elevator and confirm work hours with the super before demo day.</li>
</ol>

<h2>How we handle it</h2>
<p>We issue COIs to your building's exact wording as soon as we have the requirements, and prepare the contractor's side of the alteration package. One of our condo clients put it this way: <em>“He handled all the condo COI insurance requirements smoothly and made the whole process stress-free.”</em></p>
""",
    },
    {
        "slug": "flat-roof-vs-shingle-roof",
        "sheet": "G-103",
        "title": "Flat Roof vs. Shingle Roof: What Fits a Staten Island Home",
        "description": "Flat (low-slope) vs. pitched shingle roofs on Staten Island homes: materials, lifespan, leak points and NYC cool-roof rules, from a local roofer.",
        "h1": "Flat roof vs. shingle roof: what fits a Staten Island home?",
        "dek": "You usually don't choose. The roof's slope does. But you do choose materials and details, and those decide how long it lasts.",
        "key_answer": "The pitch of your roof decides between flat and shingle. Asphalt shingles need a slope of at least 2:12 (and extra underlayment below 4:12), so lower-slope roofs on attached homes, extensions, garages and storefronts need a membrane system like modified bitumen, EPDM or TPO. Shingle roofs are cheaper to repair and shed water easily. Flat roofs rely on drainage and seams. In NYC, replacement low-slope roofs generally need a reflective cool-roof surface.",
        "related": ["roofing", "roof-repair", "home-additions"],
        "body": """
<h2>Slope decides the system</h2>
<p>Shingles work by overlapping: water runs down and over each course. Below a certain pitch, water moves too slowly and gets driven back up under the tabs. Manufacturers generally require a minimum slope of 2:12 (2 inches of rise per 12 inches of run) for asphalt shingles, with special underlayment between 2:12 and 4:12. Below that, you need a continuous waterproof membrane, which is what people call a "flat roof." Flat roofs are really low-slope, pitched gently toward drains or scuppers.</p>

<h2>Where you find each on Staten Island</h2>
<ul>
  <li><strong>Shingle (pitched):</strong> detached homes, most semi-attached two-families, capes and colonials across the island</li>
  <li><strong>Low-slope (flat):</strong> attached rowhouses, rear extensions, porches, garages, dormers with low pitch, and nearly every storefront</li>
  <li><strong>Both:</strong> very common, typically a pitched main roof with a flat roof over an extension or porch</li>
</ul>

<h2>Comparing the two</h2>
<h3>Pitched shingle roofs</h3>
<ul>
  <li>Architectural asphalt shingles commonly last around 20–30 years, depending on ventilation, exposure and installation.</li>
  <li>Repairs are straightforward and inexpensive. You replace the damaged shingles.</li>
  <li>Leaks usually start at flashing (chimneys, walls, skylights) and pipe boots, not in the field.</li>
</ul>
<h3>Low-slope membrane roofs</h3>
<ul>
  <li>Common systems are modified bitumen, EPDM (rubber) and TPO (single-ply thermoplastic). Service life depends heavily on the system, installation and drainage.</li>
  <li>Water sits longer, so seams, parapet flashing and drains do all the work.</li>
  <li>Ponding water is the enemy. Fixing slope and drainage during replacement adds years.</li>
</ul>

<h2>NYC rules to know</h2>
<p>New York City generally requires replacement low-slope roofs to have a reflective, energy-efficient “cool roof” surface, and some buildings have additional sustainability requirements for roof replacements. Whether a roof replacement needs a DOB filing depends on the building and scope. Structural changes always do.</p>

<h2>What makes either roof last on Staten Island</h2>
<ul>
  <li><strong>Wind:</strong> high-wind nailing and sealed starter courses near the water</li>
  <li><strong>Flashing:</strong> new step, counter and chimney flashing, not reused or tarred over</li>
  <li><strong>Ventilation:</strong> balanced soffit and ridge venting so shingles don't bake</li>
  <li><strong>Drainage:</strong> clear scuppers, gutters and leaders on flat roofs</li>
</ul>

<h2>How we handle it</h2>
<p>We install both systems, so you get one recommendation for the whole house, not a pitch for whatever one roofer happens to sell. See <a href="/services/roofing/">roof replacement</a> or <a href="/services/roof-repair/">roof leak repair</a>.</p>
""",
    },
    {
        "slug": "how-to-vet-a-contractor-nyc",
        "sheet": "G-104",
        "title": "How to Check a Contractor's License in NYC: Checklist",
        "description": "How to vet a home improvement contractor on Staten Island or anywhere in NYC: DCWP license lookup, insurance, written contracts, payments, permits and reviews.",
        "h1": "How to vet a home improvement contractor in NYC",
        "dek": "A checklist for Staten Island, Brooklyn and Manhattan homeowners before you sign anything.",
        "key_answer": "In New York City, contractors who do home improvement work on residential property generally must hold a Home Improvement Contractor license from the NYC Department of Consumer and Worker Protection (DCWP), which you can verify online. Also confirm liability and workers' compensation insurance with a COI sent by the contractor's insurance agent, get a written contract with a detailed scope and payment schedule, check that licensed plumbers and electricians will do that work, and read recent reviews.",
        "related": ["home-renovations", "kitchen-remodeling", "roofing"],
        "body": """
<h2>1. Check the license</h2>
<p>NYC's Department of Consumer and Worker Protection (DCWP) licenses Home Improvement Contractors. Ask for the license number and look it up on the DCWP website. The license should be active and in the business name on your contract.</p>
<p>Some trades are licensed separately by the Department of Buildings. Plumbing must be done by a DOB-licensed master plumber and electrical work by a DOB-licensed electrician. Ask your general contractor who their plumber and electrician are, and look those licenses up too.</p>

<h2>2. Verify insurance from the source</h2>
<ul>
  <li>Ask for a certificate of insurance (COI) showing general liability and workers' compensation.</li>
  <li>Have it sent directly from the contractor's insurance agent, and ask to be named as certificate holder or additional insured.</li>
  <li>If you live in a condo or co-op, your building will set its own requirements. See our <a href="/guides/condo-coi-alteration-agreement/">COI guide</a>.</li>
</ul>

<h2>3. Get it in writing</h2>
<p>New York State law requires home improvement contracts above a modest threshold to be in writing, with specific terms. A good contract includes:</p>
<ul>
  <li>The contractor's legal name, address, phone and license number</li>
  <li>A detailed scope: materials, brands and what's excluded</li>
  <li>Start and approximate completion dates</li>
  <li>A payment schedule tied to completed milestones, not dates</li>
  <li>How changes are priced and approved (in writing, before the work)</li>
  <li>Who pulls permits, if any are needed</li>
  <li>Your cancellation rights</li>
</ul>

<h2>4. Be careful with deposits</h2>
<p>A reasonable deposit to order materials is normal. Paying most of the job up front is not. New York law also has rules about how a contractor must protect payments received before the work is complete, and your contract should tell you how yours are held.</p>

<h2>5. Read the reviews, and look for specifics</h2>
<p>Look for reviews that describe a real project: what was done, how communication went, whether it finished on time. Reviews from other trades (electricians and plumbers who've worked alongside the contractor) are a strong signal.</p>

<h2>6. Ask how they handle surprises</h2>
<p>Older Staten Island and Brooklyn homes hide things behind walls. A good contractor explains up front how hidden conditions are documented, priced and approved, before they become a fight.</p>

<h2>Red flags</h2>
<ul>
  <li>No license number, or a license in a different name</li>
  <li>Cash only, or a large deposit before any work</li>
  <li>"We don't need a permit for that" on structural, plumbing or electrical work</li>
  <li>Pressure to sign the same day</li>
  <li>No physical walkthrough before a price</li>
</ul>

<h2>Ask us anything on this list</h2>
<p>We'll walk your project, give you a written quote, and answer every question above. Call <a href="tel:+13472651229">(347) 265-1229</a>.</p>
""",
    },
]

BY_SLUG = {g["slug"]: g for g in GUIDES}
