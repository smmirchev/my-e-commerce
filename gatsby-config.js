const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `category`,
        path: `${__dirname}/src/md-data/categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `md-data`,
        path: `${__dirname}/src/md-data`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          // "@reducers": path.resolve(__dirname, "src/reducers"),
          "@functions": path.resolve(__dirname, "src/functions"),
          "@styles": path.resolve(__dirname, "src/styles"),
          // "@images": path.resolve(__dirname, "src/images"),
          "@views": path.resolve(__dirname, "src/views"),
          // "@store": path.resolve(__dirname, "src/store"),
        },
        extensions: [],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import './src/styles/styles.scss';`,
      },
      includePaths: ["./src/styles"],
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `fr`, `de`],
        defaultLanguage: `en`,
        redirect: true,
        redirectComponent: require.resolve(`./src/components/redirect.js`),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
