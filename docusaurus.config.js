// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

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
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["rust"],
      },
    }),
};

module.exports = config;
