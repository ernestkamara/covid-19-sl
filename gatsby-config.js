const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Covid 19 Update - Sierra Leone`,
    description: `Updates for the current COVID 19 Pandemic in Sierra Leone.`,
    author: `Bunch of Sierra Leonean Developers`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/sierra-leone.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FB_API_KEY,
          authDomain: process.env.FB_AUTH_DOMAIN,
          databaseURL: process.env.FB_DB_URL,
          projectId: process.env.FB_PROJECT_ID,
          storageBucket: process.env.FB_STORAGE_BUCKET,
          messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
          appId: process.env.FB_APP_ID,
          measurementId: process.env.FB_MEASUREMENT_ID,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
