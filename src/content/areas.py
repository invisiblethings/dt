"""Service-area pages.

Staten Island is split by shore (not by neighborhood) so each page can say
something real about its housing stock. See SITE-STRUCTURE.md §3.
"""

# Staten Island Railway, St. George -> Tottenville, with the shore page each stop links to.
SIR_STOPS = [
    ("St. George", "north-shore"),
    ("Tompkinsville", "north-shore"),
    ("Stapleton", "north-shore"),
    ("Clifton", "north-shore"),
    ("Grasmere", "east-shore"),
    ("Old Town", "east-shore"),
    ("Dongan Hills", "east-shore"),
    ("Jefferson Av", "east-shore"),
    ("Grant City", "east-shore"),
    ("New Dorp", "east-shore"),
    ("Oakwood Heights", "east-shore"),
    ("Bay Terrace", "east-shore"),
    ("Great Kills", "south-shore"),
    ("Eltingville", "south-shore"),
    ("Annadale", "south-shore"),
    ("Huguenot", "south-shore"),
    ("Prince's Bay", "south-shore"),
    ("Pleasant Plains", "south-shore"),
    ("Richmond Valley", "south-shore"),
    ("Arthur Kill", "south-shore"),
    ("Tottenville", "south-shore"),
]

# Neighborhoods off the SIR line, shown as "transfers".
TRANSFERS = [
    ("north-shore", "North Shore transfer", ["West Brighton", "Port Richmond", "Mariners Harbor", "Westerleigh", "Elm Park", "Randall Manor"]),
    ("mid-island", "Mid-Island transfer", ["Todt Hill", "Willowbrook", "New Springville", "Bulls Head", "Castleton Corners", "Heartland Village"]),
]

SHORES = ["north-shore", "east-shore", "mid-island", "south-shore"]

AREAS = [
    {
        "slug": "staten-island",
        "path": "/areas/staten-island/",
        "sheet": "Z-100",
        "name": "Staten Island",
        "title": "Staten Island General Contractor | Every Shore | AXE",
        "description": "Staten Island general contractor covering the North Shore, East Shore, Mid-Island and South Shore. Roofing, remodeling, painting, pavers and more.",
        "h1": "Staten Island general contractor",
        "lede": "We're based here. Roofs, renovations, paint and pavers from St. George to Tottenville, by a crew that knows the island's houses.",
        "neighborhoods": [],
        "intro": [
            "Staten Island is a borough of houses: detached homes, semi-attached and attached two-families, and a lot of homeowners who plan to stay. That makes it a contractor's borough, and it's home for us. We do most of our work here, and we answer the phone ourselves.",
            "The island isn't one market, though. A 1900s Victorian in St. George, a raised bungalow in Midland Beach, a Todt Hill colonial and a 1990s attached two-family in Eltingville each come with different roofs, walls, codes and problems. The four shore pages below cover what we see in each part of the island.",
        ],
        "conditions": [
            ("One contractor for the whole house", "Most of our Staten Island jobs grow. A roof becomes a roof plus gutters and siding; a paint job turns into floors and a bathroom. Because we're a general contractor, we cover all of it under one contract and one schedule."),
            ("We know the city's rules", "Department of Buildings permits, Landmarks Preservation Commission districts on the North Shore, FEMA flood zones along the East and South Shore, the Special South Richmond Development District. We'll tell you which ones touch your project before it starts."),
            ("Close by", "We're on the island, so walkthroughs happen fast and quotes usually follow within a day or two."),
        ],
        "top_services": ["roofing", "roof-repair", "home-renovations", "interior-painting", "kitchen-remodeling", "pavers-masonry"],
        "faq": [
            ("What parts of Staten Island do you serve?", "All of it: the North Shore (St. George, West Brighton, Port Richmond, Stapleton, Mariners Harbor), East Shore (South Beach, Midland Beach, Dongan Hills, New Dorp, Grant City), Mid-Island (Todt Hill, Willowbrook, New Springville, Bulls Head) and South Shore (Great Kills, Eltingville, Annadale, Huguenot, Tottenville)."),
            ("How quickly can you come out for an estimate on Staten Island?", "Usually within a few days, often sooner. Call (347) 265-1229, Monday to Saturday, 8 AM–6 PM."),
            ("Are you a general contractor or a specialty contractor?", "A general contractor. We do roofing, painting, remodeling, flooring, pavers and more ourselves, and we coordinate licensed electricians and plumbers for the work that requires them."),
        ],
    },
    {
        "slug": "north-shore",
        "path": "/areas/staten-island/north-shore/",
        "sheet": "Z-101",
        "shore": "north-shore",
        "name": "North Shore",
        "title": "Contractor St. George & North Shore Staten Island | AXE",
        "description": "North Shore Staten Island contractor: St. George, West Brighton, Port Richmond, Stapleton, Mariners Harbor. Older-home renovations, roofs, paint.",
        "h1": "North Shore Staten Island contractor",
        "lede": "St. George, Stapleton, West Brighton, Port Richmond and Mariners Harbor, the island's oldest housing stock. We renovate it without stripping its character.",
        "neighborhoods": ["St. George", "Tompkinsville", "Stapleton", "Clifton", "Rosebank", "New Brighton", "Randall Manor", "West Brighton", "Livingston", "Port Richmond", "Elm Park", "Mariners Harbor", "Arlington", "Westerleigh", "Graniteville", "Grymes Hill", "Silver Lake", "Sunnyside"],
        "intro": [
            "The North Shore is where Staten Island started, and its houses show it: Victorian and Queen Anne homes on the hills above the ferry, rowhouses and frame two-families in Stapleton and Port Richmond, and early 20th-century homes in West Brighton and Westerleigh. They're beautiful houses that have usually been patched a dozen times.",
            "Most of our North Shore work is restoring and renovating these older homes: re-roofing and re-flashing, replacing failing exterior paint and trim, opening up interiors, and bringing kitchens and baths up to date while keeping the details that make them worth living in.",
        ],
        "conditions": [
            ("Plaster, lath and balloon framing", "Pre-war houses often have plaster walls and balloon-framed walls that run two stories without fire blocking. We repair plaster instead of tearing it all out, and add fire blocking when walls are open."),
            ("Landmark districts", "The St. George/New Brighton Historic District and other individually landmarked buildings need Landmarks Preservation Commission approval for exterior changes like windows, siding, roofing materials and porches. We'll check your address first."),
            ("Lead paint and old wiring", "Homes built before 1978 may have lead-based paint, and older homes may still have knob-and-tube or undersized wiring. We plan around both, with lead-safe practices and upgrades by licensed electricians."),
        ],
        "top_services": ["exterior-painting", "roof-repair", "home-renovations", "interior-painting", "kitchen-remodeling", "siding"],
        "faq": [
            ("Can you work on a house in the St. George historic district?", "Yes. Exterior work in a landmark district needs LPC approval, and replacing materials in kind is usually the simplest path. We'll help you document existing conditions and match materials."),
            ("Do you repair plaster walls?", "Yes. We patch and skim-coat plaster so it reads as one smooth surface under paint, which is often better and cheaper than full replacement with drywall."),
        ],
    },
    {
        "slug": "east-shore",
        "path": "/areas/staten-island/east-shore/",
        "sheet": "Z-102",
        "shore": "east-shore",
        "name": "East Shore",
        "title": "Contractor Midland Beach, South Beach & East Shore SI | AXE",
        "description": "East Shore Staten Island contractor: South Beach, Midland Beach, Dongan Hills, New Dorp, Oakwood. Roofing, siding, decks and raised-home stairs.",
        "h1": "East Shore Staten Island contractor",
        "lede": "South Beach, Midland Beach, Dongan Hills, New Dorp and Oakwood. Wind, salt and flood-zone rules shape every exterior we build here.",
        "neighborhoods": ["Arrochar", "South Beach", "Grasmere", "Old Town", "Dongan Hills", "Midland Beach", "Grant City", "New Dorp", "New Dorp Beach", "Oakwood", "Oakwood Beach", "Bay Terrace", "Concord", "Fort Wadsworth"],
        "intro": [
            "The East Shore runs from the Verrazzano down along the beaches toward Great Kills. Inland, around Dongan Hills, Grant City and New Dorp, it's a mix of detached homes and attached two-families. Toward the water, in South Beach, Midland Beach, New Dorp Beach and Oakwood Beach, the neighborhoods were among the hardest hit in the city by Hurricane Sandy, and many homes were rebuilt or raised.",
            "That history shapes the work here: exteriors built for wind and salt, tall stairs and landings on elevated houses, and basements and lower levels designed with flood exposure in mind.",
        ],
        "conditions": [
            ("Wind and salt exposure", "Closer to the water, we use high-wind roofing installation, stainless or hot-dipped hardware, and exterior paints and siding that tolerate salt air."),
            ("Raised homes", "Elevated houses need safe stairs, landings, guards and lattice or skirting. We rebuild entries and decks that were built quickly after the storm."),
            ("Flood zones", "Some East Shore homes are in FEMA flood zones, where rules limit what can be built or finished below the flood elevation. We check before planning basement or lower-level work."),
        ],
        "top_services": ["roofing", "siding", "decks", "basement-finishing", "roof-repair", "pavers-masonry"],
        "faq": [
            ("Do you build stairs and decks for raised homes?", "Yes. Stairs, landings and decks for elevated homes are some of our most common East Shore projects, built on proper footings with code-compliant guards and rails."),
            ("What siding holds up best near the beach?", "Insulated vinyl and fiber-cement both handle wind and salt better than thin vinyl. We'll compare costs for your house."),
        ],
    },
    {
        "slug": "mid-island",
        "path": "/areas/staten-island/mid-island/",
        "sheet": "Z-103",
        "shore": "mid-island",
        "name": "Mid-Island",
        "title": "Contractor Todt Hill, New Springville & Mid-Island SI | AXE",
        "description": "Mid-Island Staten Island contractor: Todt Hill, Willowbrook, New Springville, Bulls Head, Castleton Corners. Kitchens, baths, additions and roofs.",
        "h1": "Mid-Island Staten Island contractor",
        "lede": "Todt Hill, Willowbrook, New Springville and Bulls Head have bigger lots and bigger houses, and owners ready to remodel, add on and upgrade.",
        "neighborhoods": ["Todt Hill", "Emerson Hill", "Lighthouse Hill", "Willowbrook", "New Springville", "Bulls Head", "Castleton Corners", "Manor Heights", "Meiers Corners", "Heartland Village", "Travis", "Bloomfield", "Chelsea"],
        "intro": [
            "The middle of the island has some of its largest homes, from Todt Hill and Emerson Hill estates to the detached and semi-attached houses around Willowbrook, New Springville, Bulls Head and Castleton Corners. Many were built from the 1960s through the 1990s and are due for their first major remodel.",
            "Projects here tend to be bigger: full kitchen and primary-bath renovations, additions and finished basements, full roof and siding replacements, and paver driveways and patios across wide lots. We also cover the West Shore neighborhoods of Travis, Bloomfield and Chelsea.",
        ],
        "conditions": [
            ("First-generation remodels", "Original 1970s–90s kitchens and baths, builder-grade windows and aging roofs often come due at once. We phase multi-room renovations so the house stays livable."),
            ("Hills and drainage", "On the hills of Todt Hill, Emerson Hill and Grymes Hill, water management decides whether driveways, retaining walls and basements last. We design grading and drainage first."),
            ("Room to add on", "Larger lots mean more room for rear additions and dormers. Zoning sets the limits, and we build to your architect's approved plans."),
        ],
        "top_services": ["kitchen-remodeling", "bathroom-remodeling", "home-additions", "pavers-masonry", "roofing", "basement-finishing"],
        "faq": [
            ("Do you do large renovations on Todt Hill homes?", "Yes. We take on multi-room and whole-home renovations, working with your architect or designer, and phase the work around how you use the house."),
            ("Can you build a retaining wall on a sloped lot?", "Yes. We build segmental block retaining walls with proper base, drainage aggregate and drainage pipe. Taller walls require engineering, and we'll tell you where that line is."),
        ],
    },
    {
        "slug": "south-shore",
        "path": "/areas/staten-island/south-shore/",
        "sheet": "Z-104",
        "shore": "south-shore",
        "name": "South Shore",
        "title": "Contractor Tottenville, Great Kills & South Shore SI | AXE",
        "description": "South Shore Staten Island contractor: Great Kills, Eltingville, Annadale, Huguenot, Prince's Bay, Tottenville. Roofing, pavers, decks, remodels.",
        "h1": "South Shore Staten Island contractor",
        "lede": "Great Kills, Eltingville, Annadale, Huguenot and Tottenville. Family homes, two-families and big yards, which means roofs, pavers, decks and remodels.",
        "neighborhoods": ["Great Kills", "Eltingville", "Arden Heights", "Annadale", "Huguenot", "Woodrow", "Rossville", "Prince's Bay", "Pleasant Plains", "Charleston", "Richmond Valley", "Tottenville"],
        "intro": [
            "The South Shore was largely built out over the last fifty years: detached homes and attached and semi-attached two-families in Eltingville, Annadale, Arden Heights and Huguenot, plus older homes and waterfront streets in Great Kills, Prince's Bay and Tottenville. Yards are bigger here, and so is the appetite for driveways, patios and decks.",
            "Our South Shore work leans exterior: roof replacements as 1980s–90s roofs reach the end of their life, paver driveways and patios, decks, siding, and kitchens and baths in homes that have never been updated.",
        ],
        "conditions": [
            ("Roofs reaching end of life", "A lot of South Shore houses still have their original or first-replacement roofs. We inspect and tell you honestly whether you need a repair or a replacement."),
            ("The Special South Richmond Development District", "Much of the South Shore falls in this special zoning district, which adds rules on things like tree preservation and lot coverage for some projects. Additions and big site work need that review."),
            ("Waterfront exposure", "Streets near Raritan Bay and Great Kills Harbor get wind and salt like the East Shore does. We build exteriors to match."),
        ],
        "top_services": ["roofing", "pavers-masonry", "decks", "siding", "kitchen-remodeling", "bathroom-remodeling"],
        "faq": [
            ("Do you install paver driveways on the South Shore?", "Yes. Paver driveways, walkways and patios are some of our most requested South Shore jobs, built on an excavated, compacted base so they stay flat."),
            ("Do you work in Tottenville and Charleston?", "Yes, all the way to the end of the line. We cover every South Shore neighborhood."),
        ],
    },
    {
        "slug": "brooklyn",
        "path": "/areas/brooklyn/",
        "sheet": "Z-200",
        "name": "Brooklyn",
        "title": "General Contractor Brooklyn | Renovations & Painting | AXE",
        "description": "Staten Island-based general contractor serving Brooklyn: apartment and condo renovations, painting, flooring, kitchens, baths and roofing. COIs for buildings.",
        "h1": "General contractor serving Brooklyn",
        "lede": "Just over the Verrazzano. We take on painting, renovations and roofing in Brooklyn homes, condos and co-ops, with COIs and building paperwork handled.",
        "neighborhoods": ["Bay Ridge", "Dyker Heights", "Bensonhurst", "Bath Beach", "Fort Hamilton", "Sunset Park", "Gravesend", "Borough Park", "Marine Park", "Sheepshead Bay", "Park Slope", "Windsor Terrace"],
        "intro": [
            "We're based on Staten Island, and much of Brooklyn is closer to us than parts of our own borough. Southwest Brooklyn (Bay Ridge, Dyker Heights, Bensonhurst, Fort Hamilton) is a short drive over the bridge, and we regularly work there and beyond.",
            "Brooklyn work for us is mostly two things: apartment and condo renovations (painting, flooring, kitchens, bathrooms) in buildings that require COIs and alteration agreements, and work on attached houses, like flat-roof repairs, facade painting and full interior renovations.",
        ],
        "conditions": [
            ("Rowhouse roofs", "Brooklyn rowhouses usually have low-slope roofs with parapets shared with neighbors. Flashing and drainage at the parapet are where leaks start."),
            ("Building paperwork", "COIs, managing-agent approval and building hours are routine for us. See our <a href=\"/services/condo-apartment-renovations/\">condo &amp; co-op renovation</a> page."),
            ("Pre-war interiors", "Plaster walls, out-of-level floors and old wiring are common. We plan for them in the estimate."),
        ],
        "top_services": ["condo-apartment-renovations", "interior-painting", "flooring", "kitchen-remodeling", "bathroom-remodeling", "roof-repair"],
        "faq": [
            ("Do you charge extra to work in Brooklyn?", "Not as a rule. Southwest Brooklyn is close to our base. Parking, building logistics and access are part of every estimate, wherever the job is."),
            ("Can you work in a co-op in Bay Ridge?", "Yes. We provide COIs to the building's requirements and follow the alteration agreement and work hours."),
        ],
    },
    {
        "slug": "manhattan",
        "path": "/areas/manhattan/",
        "sheet": "Z-300",
        "name": "Manhattan",
        "title": "Apartment Renovation Contractor Manhattan | Condo & Co-op",
        "description": "Manhattan condo, co-op and apartment renovations: painting, flooring, kitchens and baths, with COIs, alteration agreements and building rules handled.",
        "h1": "Apartment renovation contractor for Manhattan",
        "lede": "Condo and co-op renovations, from a fresh coat of paint to new kitchens and baths, with the COIs and building approvals Manhattan buildings require.",
        "neighborhoods": ["Financial District", "Battery Park City", "Tribeca", "Lower East Side", "Chelsea", "Midtown", "Upper East Side", "Upper West Side", "Harlem", "Washington Heights"],
        "intro": [
            "In Manhattan, the hardest part of a renovation is often getting approved to start. Managing agents want a COI with exact wording and limits, boards want an alteration agreement and sometimes drawings, and supers want elevator bookings and quiet hours respected. We deal with all of it as a matter of routine.",
            "We take on Manhattan apartment work of every size: painting before a move-in or sale, new floors, kitchen and bathroom renovations, and full interior refreshes in condos, co-ops and rental units.",
        ],
        "conditions": [
            ("COIs to the building's wording", "We issue certificates naming the condo or co-op corporation, board and managing agent exactly as the building's sample requires, as soon as we have the requirements."),
            ("Alteration agreements", "Kitchens, baths and anything touching plumbing, electrical or walls typically need board approval. We prepare the contractor's side of the package. See our <a href=\"/guides/condo-coi-alteration-agreement/\">COI &amp; alteration agreement guide</a>."),
            ("Building rules", "Work hours, freight elevators, corridor protection, debris removal and summer-work rules in some co-ops are all part of our plan from day one."),
        ],
        "top_services": ["condo-apartment-renovations", "interior-painting", "flooring", "kitchen-remodeling", "bathroom-remodeling", "home-renovations"],
        "faq": [
            ("Do you work in Manhattan co-ops?", "Yes. We handle COIs, alteration agreements and building rules, and we coordinate directly with the managing agent and super."),
            ("How do I get a quote for my Manhattan apartment?", "Call (347) 265-1229 or send the estimate form with photos and your building's requirements. We'll schedule a walkthrough."),
        ],
    },
]

BY_SLUG = {a["slug"]: a for a in AREAS}
