import path from 'path'
import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    // https://tailwindcss.com/docs/content-configuration#working-with-third-party-libraries
    path.join(path.dirname(require.resolve('@portal-dev/ui')), '**/*.js'),
  ],
  theme: {
    extend: {
      colors: {
        'portal-background': {
          DEFAULT: 'var(--portal-background)',
          high: 'var(--portal-background-high)',
          low: 'var(--portal-background-low)',
          lower: 'var(--portal-background-lower)',
          lowest: 'var(--portal-background-lowest)',
          body: 'var(--portal-background-body)',
          topbar: 'var(--portal-background-topbar)',
          sidenav: 'var(--portal-background-sidenav)',
          codeblock: 'var(--portal-background-codeblock)',
          inlinecode: 'var(--portal-background-inlinecode)',
          card: 'var(--portal-background-card)',
          keyboard: 'var(--portal-background-keyboard)',
          dialog: 'var(--portal-background-dialog)',
          'dialog-overlay': 'var(--portal-background-dialog-overlay)',
          'dialog-selected': 'var(--portal-background-dialog-selected)',
          button: 'var(--portal-background-button)',
          'button-hover': 'var(--portal-background-button-hover)',
        },
        'portal-accent': {
          DEFAULT: 'var(--portal-accent)',
          high: 'var(--portal-accent-high)',
          low: 'var(--portal-accent-low)',
        },
        'portal-content': {
          DEFAULT: 'var(--portal-content)',
          high: 'var(--portal-content-high)',
          low: 'var(--portal-content-low)',
          lower: 'var(--portal-content-lower)',
          lowest: 'var(--portal-content-lowest)',
          disabled: 'var(--portal-content-disabled)',
          heading: 'var(--portal-content-heading)',
          body: 'var(--portal-content-body)',
          label: 'var(--portal-content-label)',
          icon: 'var(--portal-content-icon)',
          listdisc: 'var(--portal-content-listdisc)',
          listnumber: 'var(--portal-content-listnumber)',
          button: 'var(--portal-content-button)',
          'button-hover': 'var(--portal-content-button-hover)',
          'button-selected': 'var(--portal-content-button-selected)',
        },
        'portal-note': {
          DEFAULT: 'var(--portal-note)',
        },
        'portal-info': {
          DEFAULT: 'var(--portal-info)',
        },
        'portal-warning': {
          DEFAULT: 'var(--portal-warning)',
        },
        'portal-success': {
          DEFAULT: 'var(--portal-success)',
        },
        'portal-danger': {
          DEFAULT: 'var(--portal-danger)',
        },
        'portal-border': {
          DEFAULT: 'var(--portal-border)',
          dialog: 'var(--portal-border-dialog)',
        },
        'portal-outline': {
          DEFAULT: 'var(--portal-outline)',
          dialog: 'var(--portal-outline-dialog)',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        'portal-heading': ['var(--font-geist-sans)', ...fontFamily.sans],
        'portal-body': ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      fontSize: {
        'portal-body-sm': [
          'var(--portal-font-size-body-sm)',
          {
            lineHeight: 'var(--portal-line-height-body-sm)',
            letterSpacing: 'var(--portal-letter-spacing-body-sm)',
            fontWeight: 'var(--portal-font-weight-body-sm)',
          },
        ],
        'portal-body': [
          'var(--portal-font-size-body)',
          {
            lineHeight: 'var(--portal-line-height-body)',
            letterSpacing: 'var(--portal-letter-spacing-body)',
            fontWeight: 'var(--portal-font-weight-body)',
          },
        ],
        'portal-heading-6': [
          'var(--portal-font-size-heading-6)',
          {
            lineHeight: 'var(--portal-line-height-heading-6)',
            letterSpacing: 'var(--portal-letter-spacing-heading-6)',
            fontWeight: 'var(--portal-font-weight-heading-6)',
          },
        ],
        'portal-heading-5': [
          'var(--portal-font-size-heading-5)',
          {
            lineHeight: 'var(--portal-line-height-heading-5)',
            letterSpacing: 'var(--portal-letter-spacing-heading-5)',
            fontWeight: 'var(--portal-font-weight-heading-5)',
          },
        ],
        'portal-heading-4': [
          'var(--portal-font-size-heading-4)',
          {
            lineHeight: 'var(--portal-line-height-heading-4)',
            letterSpacing: 'var(--portal-letter-spacing-heading-4)',
            fontWeight: 'var(--portal-font-weight-heading-4)',
          },
        ],
        'portal-heading-3': [
          'var(--portal-font-size-heading-3)',
          {
            lineHeight: 'var(--portal-line-height-heading-3)',
            letterSpacing: 'var(--portal-letter-spacing-heading-3)',
            fontWeight: 'var(--portal-font-weight-heading-3)',
          },
        ],
        'portal-heading-2': [
          'var(--portal-font-size-heading-2)',
          {
            lineHeight: 'var(--portal-line-height-heading-2)',
            letterSpacing: 'var(--portal-letter-spacing-heading-2)',
            fontWeight: 'var(--portal-font-weight-heading-2)',
          },
        ],
        'portal-heading-1': [
          'var(--portal-font-size-heading-1)',
          {
            lineHeight: 'var(--portal-line-height-heading-1)',
            letterSpacing: 'var(--portal-letter-spacing-heading-1)',
            fontWeight: 'var(--portal-font-weight-heading-1)',
          },
        ],
      },
      width: {
        'portal-width-sidenav': 'var(--portal-width-sidenav)',
        'portal-width-table-of-contents': 'var(--portal-width-table-of-contents)',
      },
      maxWidth: {
        'portal-width-site': 'var(--portal-width-site)',
      },
      height: {
        'portal-height-topnav': 'var(--portal-height-topnav)',
      },
      padding: {
        'portal-padding-site-sides': 'var(--portal-padding-site-sides)',
        'portal-padding-article-top': 'var(--portal-padding-article-top)',
        'portal-padding-article-sides': 'var(--portal-padding-article-sides)',
      },
      margin: {
        'portal-margin-article-gap-headings': 'var(--portal-margin-article-gap-headings)',
        'portal-margin-article-gap': 'var(--portal-margin-article-gap)',
        'portal-margin-article-gap-clusters': 'var(--portal-margin-article-gap-clusters)',
        'portal-padding-article-sides': 'var(--portal-padding-article-sides)',
      },
      inset: {
        'portal-height-topnav': 'var(--portal-height-topnav)',
      },
    },
  },
  plugins: [],
}
export default config
