"""Google reviews, quoted verbatim from the AXE Google Business Profile.

`services` links each review to the service pages it is relevant to (by slug).
Keep the text exactly as written by the reviewer.
"""

REVIEWS = [
    {
        "name": "Ying Li",
        "tag": "Interior painting · Condo",
        "services": ["interior-painting", "condo-apartment-renovations"],
        "featured": True,
        "text": "Highly recommend Angel for painting and contracting work. Professional, responsive, easy to communicate with, and very flexible with scheduling. He handled all the condo COI insurance requirements smoothly and made the whole process stress-free. The quality of the work was excellent at a very reasonable price. After the painting was completed, it honestly felt like we were moving into a completely new home. We’re extremely happy with the results and will definitely hire him again for future projects",
    },
    {
        "name": "Donny Skuka",
        "tag": "Roofing",
        "services": ["roofing"],
        "featured": True,
        "text": "This company doing my roof and they did amazing job. Very serious people , clean job and i am very happy .",
    },
    {
        "name": "Ellie Z",
        "tag": "Interior painting · Apartment",
        "services": ["interior-painting", "condo-apartment-renovations"],
        "featured": True,
        "text": "Engjel and his team are amazing! I needed to repaint my apartment - he was very responsive, came to do an onsite assessment and gave me a quote the day after. He was able to do the work quickly and super professionally. We are really happy with the results - the place looks so much better than before. He was also just such a joy and easy to work with. Reasonably priced - highly highly recommend!!!",
    },
    {
        "name": "Suchit Dash",
        "tag": "General contracting",
        "services": [],
        "featured": False,
        "text": "Really great communication and work. Very professional. Would highly recommend.",
    },
    {
        "name": "Elvi Jamaku",
        "tag": "Interior painting · Whole apartment",
        "services": ["interior-painting"],
        "featured": False,
        "text": "I had to paint my whole apartment and I was looking for someone who would come and help me as soon as possible, when i first called Angel answered to me and since then he has always been calling to make sure that everything is fine. Would definitely suggest you to work with them.",
    },
    {
        "name": "Boulevard Lounge",
        "tag": "Commercial painting · Lounge",
        "services": ["commercial-construction", "interior-painting"],
        "featured": True,
        "text": "We had an amazing experience with Angel and AXE CONTRACTING GROUP ! Their team was professional, detail-oriented, and transformed our lounge beautifully. The quality of their work exceeded our expectations, and they completed everything on time. Highly recommend them for any painting project!",
    },
    {
        "name": "sefit Maksudovski",
        "tag": "Roof leak repair",
        "services": ["roof-repair"],
        "featured": True,
        "text": "Leak fixed on my roof. Gets the job done efficiently and quickly . Great crew, pays attention closely to details.",
    },
    {
        "name": "Murra Electric",
        "tag": "Trade partner · Licensed electrical contractor",
        "services": ["roofing", "home-renovations", "commercial-construction"],
        "featured": False,
        "text": "As a licensed electrical contractor, we've had the pleasure of working alongside AXE Contracting on several projects. Their team is reliable, detail-oriented, and consistently delivers high-quality roofing and remodeling work. When AXE is on the job, we know the project will run smoothly and meet the highest standards. Highly recommended.",
    },
    {
        "name": "Valentin Bajro",
        "tag": "Interior renovation",
        "services": ["home-renovations"],
        "featured": False,
        "text": "I recently hired AXE Contracting Group for an interior renovation project, and I am beyond impressed with their work! The entire process was smooth, professional, and delivered beyond my expectations also they made me a super fair price!!!!",
    },
    {
        "name": "Fitt",
        "tag": "Apartment renovation · Floors & walls",
        "services": ["flooring", "home-renovations", "condo-apartment-renovations"],
        "featured": True,
        "text": "I recently had the pleasure of working with AXE Contracting for the renovation of my apartment. They did an outstanding job on both the floors and walls. The team was professional, efficient, and paid great attention to detail. The quality of their work exceeded my expectations, and they completed the project on time and within budget. I highly recommend them for any construction or renovation needs. Thank you for transforming my apartment into a beautiful and comfortable space.",
    },
    {
        "name": "Ron",
        "tag": "Home improvement",
        "services": [],
        "featured": False,
        "text": "The work was done quickly and with precision. Great communication and im very happy with the outcome.",
    },
    {
        "name": "Eco Build",
        "tag": "Roofing & construction",
        "services": ["roofing"],
        "featured": False,
        "text": "Axe Roofing and Construction did a great job, professional, reliable, and efficient. The quality of work was excellent, and everything was done on time. Highly recommend!",
    },
    {
        "name": "Artisan Barbershop",
        "tag": "Commercial renovation · Barbershop",
        "services": ["commercial-construction"],
        "featured": False,
        "text": "This company Renovate my store and they did such an amazing job. I am very happy serious people, responsible, on what they did. I highly recommended",
    },
    {
        "name": "Tony Chini",
        "tag": "Pavers",
        "services": ["pavers-masonry"],
        "featured": False,
        "text": "They just finished pavers at my house they did such a good job I’m going to recommend to more people",
    },
]


def for_service(slug):
    return [r for r in REVIEWS if slug in r["services"]]
