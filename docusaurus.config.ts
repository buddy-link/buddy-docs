import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { themes } from "prism-react-renderer";

function createSpecDocConfig(name: string, fileLocation: string) {
  return { // the <id> referenced when running CLI commands
    specPath: "openapi/" + fileLocation, // path to OpenAPI spec, URLs supported
    outputDir: "docs/api_documenation/" + name, // output directory for generated files
    // sidebarOptions: { // optional, instructs plugin to generate sidebar.js
      // groupPathsBy: "tag", // group sidebar items by operation "tag"
    // }
  } satisfies OpenApiPlugin.Options
}

const config: Config = {
  title: "Buddylink",
  tagline: "Discover web3 with friends",
  url: "https://docs.buddy.link",
  baseUrl: "/",
  onBrokenLinks: "warn",
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
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // showLastUpdateTime: true,
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          groups: createSpecDocConfig("Groups", "api-group-spec.yaml"),
          points: createSpecDocConfig("Points", "api-point-management-spec.yaml"),
          questAttempts: createSpecDocConfig("Quest Attempts", "api-quest-attempt-spec.yaml"),
          questManagement: createSpecDocConfig("Quest Management", "api-quest-management-spec.yaml"),
          buddyInBio: createSpecDocConfig("Buddy in Bio", "buddy-in-bio.spec.yaml"),
        } satisfies Plugin.PluginOptions,
      } 
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"], 
  themeConfig: {
    docs: {
      sidebar: {
        hideable: false,
      },
    },
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
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: [
        "rust",
      ],
    },
  } satisfies Preset.ThemeConfig,
};


module.exports = config;
