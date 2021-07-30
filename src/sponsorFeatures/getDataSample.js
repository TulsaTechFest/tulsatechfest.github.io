const fetch = require("node-fetch");
async function getData(url) {
    try
    {
        if (url != "") {
            repo = await fetch(url).then(data => data.json());
            return {
                ...repo,
                title: repo.name,
                text: repo.text,
                tags: repo.tags
            }
        } else {
            return getDefaultData();
        }
    } catch (err) {
        console.log(err);
    }
}
async function getDefaultData() {
    return 
        [
            {
                "title": "Attendee List - Premier",
                "text": "Attendee Name and Email of Opt-In Registrations (within 5 business days after event completion - thanks for your patience)",
                "tags": ["sponsorfeature", "sponsorfeature-premier"]
            },
            {
                "title": "Booth - Premier",
                "text": "Booth - first come, first serve (Highest location visibility)",
                "tags": ["sponsorfeature", "sponsorfeature-premier"]
            },
            {
                "title": "Promotional",
                "text": "Highest visibility of logo on ALL collateral and at least two promotional items of our choosing",
                "tags": ["sponsorfeature", "sponsorfeature-premier"]
            },
            {
                "title": "Attendee List  - Gold",
                "text": "Attendee Name and Email of Opt-In Registrations (within 7 business days after event completion)",
                "tags": ["sponsorfeature", "sponsorfeature-gold"]
            },
            {
                "title": "Promotional",
                "text": "Booth - first come, first serve",
                "tags": ["sponsorfeature", "sponsorfeature-gold"]
            },
            {
                "title": "Attendee Statistics - Silver",
                "text": "Attendee Statistics (no names or email addresses)",
                "tags": ["sponsorfeature", "sponsorfeature-silver"]
            },
            {
                "title": "Link",
                "text": "Link/Logo on TulsaTechFest website",
                "tags": ["sponsorfeature", "sponsorfeature-all"]
            },
            {
                "title": "Giftbags",
                "text": "Distribution of materials in TulsaTechFest gift bag (if provided)",
                "tags": ["sponsorfeature", "sponsorfeature-all"]
            },
            {
                "title": "Recognition",
                "text": "Special recognition in opening and closing",
                "tags": ["sponsorfeature", "sponsorfeature-all"]
            }
        ]
}