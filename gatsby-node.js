const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    })
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const Category = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/categories/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  Category.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Category.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })

  ////////////

  const Product = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              id: product_id
              categoryId: category_id
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  Product.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `${node.frontmatter.categoryId}/${node.frontmatter.id}`,
      component: path.resolve(`./src/templates/Product.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
