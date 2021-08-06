module.exports = {
    environment: process.env.NODE_ENV,
    icons: {
        webmanifest: [
            {
                src: "/assets/images/logo.png", // these values are for testing, change these for your own site.
                type: "image/png",
                sizes: "192x192"
            }
        ]
    },
    page: {
        title: {
            seperator: "-",
            length: 70,
        },
        description: {
            length: 200
        },
        keywords: {
            count: 5
        }
    },
    webmanifest: {
        filename: "site.webmanifest",
        startUrl: "/?utm_source=homescreen",
        display: ["fullscreen", "standalone", "minimal-ui", "browser"][3]
    }
}
