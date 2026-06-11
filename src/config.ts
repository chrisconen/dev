// Single source of truth for personal data, links and copy fragments.
// Anything marked TODO is safe to ship as-is but should be confirmed.
// Empty strings hide the related UI element (links render conditionally).

export const SITE = {
  name: 'Chris Conen',
  domain: 'chrisconen.dev',
  url: 'https://chrisconen.dev',
  title: 'Chris Conen — Proof over promises',
  description:
    'Builder and operator moving into security governance and AI assurance. ' +
    'Creator of AXR: open-source, Ed25519-signed execution receipts for AI agents. ' +
    'Relocating to Australia, open to sponsored security, GRC and AI assurance roles.',

  // TODO: confirm this mailbox exists (domain is on Cloudflare; Email Routing
  // can forward hello@chrisconen.dev in two minutes).
  email: 'hello@chrisconen.dev',

  github: 'https://github.com/chrisconen',

  // This site's own source repository (public, so the receipt can be
  // verified from source by anyone).
  siteRepo: 'https://github.com/chrisconen/dev',

  // TODO: add LinkedIn profile URL. Leave empty to hide the link.
  linkedin: '',

  // TODO: confirm the exact repository URL for AXR.
  axrRepo: 'https://github.com/chrisconen/axr',

  // Secondary, footer-only. The web portfolio is deliberately not part of
  // the main narrative on this site.
  webWork: 'https://australianweb.agency',

  location: 'Budapest, Hungary',

  // Ed25519 public key (base64, 32 bytes) pinned in source after `npm run keygen`.
  // Empty string means "not pinned yet" — the receipt page will say so honestly.
  receiptPublicKey: '',
};

export type Evidence = {
  title: string;
  transition: string;
  metric: string;
  detail: string;
  href: string; // TODO per item; empty hides the link
  linkLabel: string;
};

export const EVIDENCE: Evidence[] = [
  {
    title: 'Motyán',
    transition: 'WordPress to Astro rebuild',
    metric: 'Mobile PageSpeed 57 to 99',
    detail:
      'Full replatform of a live business site. The score is produced by ' +
      "Google's public tooling, not by me.",
    // TODO: live URL for the Motyán site.
    href: '',
    linkLabel: 'Visit the site',
  },
  {
    title: 'Bella Camila',
    transition: 'Unas storefront to Astro',
    metric: 'Mobile PageSpeed 99',
    detail:
      'E-commerce frontend rebuilt for speed. Reproducible by anyone ' +
      'with the URL and thirty seconds.',
    // TODO: live URL for the Bella Camila storefront.
    href: '',
    linkLabel: 'Visit the site',
  },
  {
    title: 'ECO Clean',
    transition: 'Operations, end to end',
    metric: '200+ five-star Google reviews',
    detail:
      'A services business I own and run: pricing, delivery, customer ' +
      'trust. The reviews are public record.',
    // TODO: Google Business Profile reviews URL for ECO Clean.
    href: '',
    linkLabel: 'Read the reviews',
  },
];
