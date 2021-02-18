const path = require("path")

module.exports = {
  siteMetadata: {
    title: `My e-Commerce`,
    description: `Gatsby e-commerce project`,
    author: `Stefan Mirchev`,
    image: "/static/images/preview.png",
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
          "@nodeModules": path.resolve(__dirname, "node_modules"),
          "@components": path.resolve(__dirname, "src/components"),
          "@functions": path.resolve(__dirname, "src/functions"),
          "@styles": path.resolve(__dirname, "src/styles"),
          "@views": path.resolve(__dirname, "src/views"),
          "@store": path.resolve(__dirname, "src/store"),
        },
        extensions: ["js"],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import './src/styles/styles.scss';`,
      },
      includePaths: [
        `${__dirname}/src/styles`,
        `${__dirname}/src/node_modules`,
      ],
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
        icon: `src/static/images/logo.png`, // This path is relative to the root of the site.
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
  ],
}
