// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';
import { cloudflare } from '@cloudflare/vite-plugin';
import markdocContentPathContainment from './src/integrations/markdoc-partials.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.fossbilling.org',
  integrations: [
    starlight({
      title: 'FOSSBilling Docs',
      description: 'Official FOSSBilling documentation.',
      disable404Route: true,
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'shortcut icon',
            href: '/favicon-dark.svg',
            type: 'image/svg+xml',
            media: '(prefers-color-scheme: dark)',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
          },
        },
      ],
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        alt: 'FOSSBilling',
        replacesTitle: true,
      },
      customCss: ['./src/styles/fossbilling.css'],
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
      },
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      editLink: {
        baseUrl: 'https://github.com/FOSSBilling/docs/edit/main/',
      },
      sidebar: [
        'index',
        {
          label: 'Getting Started',
          items: [{ autogenerate: { directory: 'getting-started' } }],
        },
        {
          label: 'Admin Guide',
          items: [
            {
              label: 'Overview',
              slug: 'admin-guide',
            },
            {
              label: 'Configuration',
              slug: 'admin-guide/config',
            },
            'admin-guide/company',
            'admin-guide/email-templates',
            {
              label: 'Anti-Spam',
              slug: 'admin-guide/anti-spam',
            },
            'admin-guide/localization',
            {
              label: 'Invoice PDFs',
              slug: 'admin-guide/invoice-pdf',
            },
            'admin-guide/custom-payment-gateway',
            {
              label: 'Product Types',
              collapsed: true,
              items: [
                { autogenerate: { directory: 'admin-guide/product-types' } },
              ],
            },
            {
              label: 'Server Managers',
              collapsed: true,
              items: [
                { autogenerate: { directory: 'admin-guide/server-managers' } },
              ],
            },
          ],
        },
        {
          label: 'Maintenance',
          items: [{ autogenerate: { directory: 'maintenance' } }],
        },
        {
          label: 'Security',
          items: [{ autogenerate: { directory: 'security' } }],
        },
        {
          label: 'Extensions & Development',
          items: [
            {
              label: 'Overview',
              slug: 'extensions-and-development',
            },
            {
              label: 'Extensions',
              slug: 'extensions-and-development/extensions',
            },
            {
              label: 'API',
              collapsed: true,
              items: [
                {
                  label: 'API Reference',
                  slug: 'extensions-and-development/api',
                },
                {
                  label: 'Guest API',
                  items: [
                    {
                      label: 'Domains & Currency',
                      slug: 'extensions-and-development/api/guest/domains-currency',
                    },
                    {
                      label: 'Products',
                      slug: 'extensions-and-development/api/guest/products',
                    },
                  ],
                },
                {
                  label: 'JavaScript Wrapper',
                  slug: 'extensions-and-development/api/javascript',
                },
              ],
            },
            'extensions-and-development/event-hooks',
            'extensions-and-development/twig-filters',
            {
              label: 'File Structure',
              slug: 'extensions-and-development/file-structure',
            },
            {
              label: 'Guides',
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: 'extensions-and-development/guides',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Support',
          items: [{ autogenerate: { directory: 'support' } }],
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/FOSSBilling/FOSSBilling',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://fossbilling.org/discord',
        },
      ],
      lastUpdated: true,
    }),
    markdoc(),
  ],
  vite: {
    plugins: [
      markdocContentPathContainment(
        new URL('./src/content/docs/', import.meta.url),
      ),
      cloudflare(),
    ],
  },
});
