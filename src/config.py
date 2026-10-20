"""Single source of truth for business facts.

Fill in the TODO values here and rebuild (`python3 src/build.py`). Every page,
the footer, the title block and the JSON-LD read from this file.
"""

SITE_URL = "https://axecontracting.org"

BUSINESS = {
    "name": "AXE Contracting Group",
    "short": "AXE",
    "tagline": "Building Quality. Delivering Trust.",
    "phone_display": "(347) 265-1229",
    "phone_e164": "+13472651229",
    "email": "support@axecontracting.org",
    "hours_display": "Mon–Sat · 8:00 AM – 6:00 PM",
    # schema.org openingHoursSpecification
    "hours_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00",
    "owner": "Angel",
    "city": "Staten Island",
    "region": "NY",
    "country": "US",
    "google_profile": "https://share.google/VGBW093pRHXSenrR7",
    # TODO: add the street address if the client wants it public. Leave it empty
    # and the site is marked up as a service-area business with no street address.
    "street": "",
    "postal_code": "",
    # TODO: NYC DCWP Home Improvement Contractor license number. Not shown until set.
    "hic_license": "",
    # Approximate geo-center of Staten Island, used for the schema `geo` only
    # until a real address exists.
    "lat": 40.5795,
    "lng": -74.1502,
}

# TODO: paste a Formspree (or similar) endpoint, e.g. "https://formspree.io/f/abcdwxyz".
# While it's empty, the estimate form opens the visitor's email app with the
# request pre-written to BUSINESS["email"].
FORM_ENDPOINT = ""

SERVICE_AREAS = ["Staten Island", "Brooklyn", "Manhattan"]
