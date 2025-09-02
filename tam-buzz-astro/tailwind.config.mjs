import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#c1c3c8",
            "--tw-prose-headings": "#ffffff",
            "--tw-prose-lead": "#9ca3af",
            "--tw-prose-links": "#60a5fa",
            "--tw-prose-bold": "#ffffff",
            "--tw-prose-counters": "#9ca3af",
            "--tw-prose-bullets": "#6b7280",
            "--tw-prose-hr": "#374151",
            "--tw-prose-quotes": "#f3f4f6",
            "--tw-prose-quote-borders": "#374151",
            "--tw-prose-captions": "#9ca3af",
            "--tw-prose-code": "#f3f4f6",
            "--tw-prose-pre-code": "#e5e7eb",
            "--tw-prose-pre-bg": "#1f2937",
            "--tw-prose-th-borders": "#374151",
            "--tw-prose-td-borders": "#2d3748",
          },
        },
      },
    },
  },
  plugins: [typography],
};
