// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes: prismThemes} = require("prism-react-renderer");

/**
 * @type {import('docusaurus-plugin-openapi-docs').OpenApiDocsPluginConfig}
 * 
 * @param {string} name
 * @param {string} fileLocation
 * @returns {import('docusaurus-plugin-openapi-docs').OpenApiDocsPluginConfig}
 */
function createSpecDocConfig(name, fileLocation) {
  return { // the <id> referenced when running CLI commands
    specPath: "openapi/" + fileLocation, // path to OpenAPI spec, URLs supported
    outputDir: "docs/api_documenation/" + name, // output directory for generated files
    // sidebarOptions: { // optional, instructs plugin to generate sidebar.js
      // groupPathsBy: "tag", // group sidebar items by operation "tag"
    // }
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Buddylink",
  tagline: "Discover web3 with friends",
  url: "https://docs.buddy.link",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "buddylink",
  projectName: "buddy-docs",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // showLastUpdateTime: true,
          docItemComponent: "@theme/ApiItem" // derived from docusaurus-theme-openapi-docs
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // id of plugin-content-docs or preset for rendering docs
        config: {
          groups: createSpecDocConfig("Groups", "api-group-spec.yaml"),
          points: createSpecDocConfig("Points", "api-point-management-spec.yaml"),
          questAttempts: createSpecDocConfig("Quest Attempts", "api-quest-attempt-spec.yaml"),
          questManagement: createSpecDocConfig("Quest Management", "api-quest-management-spec.yaml"),
          buddyInBio: createSpecDocConfig("Buddy in Bio", "buddy-in-bio.spec.yaml"),
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"], 
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // algolia: {
      //   contextualSearch: true,
      // },
      docs: {
        sidebar: {
          // hideable: true,
        },
      },
      // Replace with your project's social card
      image: "img/buddylink-social-card.jpg",
      navbar: {
        title: "Buddylink",
        logo: {
          alt: "Buddylink Logo",
          src: "img/logo.png",
        },
        items: [],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/ladder-caster",
              },
              {
                label: "Discord",
                href: "https://discord.gg/buddylink",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/BuddyLinkApp",
              },
              {
                label: "Blog",
                href: "https://buddy.link/blogs",
              },
            ],
          },
          {
            title: "Powered By",
            items: [
              {
                label: "Docusaurus",
                href: "https://docusaurus.io/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ladder Labs`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};


module.exports = config;
