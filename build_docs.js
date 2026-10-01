const fs = require('fs');
const path = require('path');

const PACKAGES = [
  {
    id: 'extension',
    dir: path.join(__dirname, 'packages', 'extension-history'),
    changelogFile: 'CHANGELOG.md',
    mdArtifact: 'changelog-extension.md',
    isPrimary: true
  },
  {
    id: 'patches',
    dir: path.join(__dirname, 'packages', 'extension-patches'),
    changelogFile: 'CHANGELOG.md',
    mdArtifact: 'changelog-patches.md',
    isPrimary: false,
    githubUrl: 'https://github.com/lildaveloper/antigravity-extension-changelog/tree/main/packages/extension-patches'
  }
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function inlineMarkdown(text) {
  let out = text;
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return out;
}

function parseLinesToHtml(lines) {
  let html = '';
  let inSublist = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed === '---') continue;

    if (trimmed.startsWith('- **') && !rawLine.startsWith('    ') && !rawLine.startsWith('\t') && !rawLine.startsWith('  -')) {
      if (inSublist) {
        html += '</ul></li>';
        inSublist = false;
      }
      const itemContent = inlineMarkdown(trimmed.replace(/^- /, ''));
      const nextLine = lines[i + 1];
      if (nextLine && (nextLine.startsWith('  -') || nextLine.startsWith('    -') || nextLine.startsWith('\t-'))) {
        html += `<li class="rn-item">${itemContent}<ul class="rn-sublist">`;
        inSublist = true;
      } else {
        html += `<li class="rn-item">${itemContent}</li>`;
      }
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemContent = inlineMarkdown(trimmed.replace(/^[-*] /, ''));
      if (!inSublist) {
        html += `<li class="rn-item">${itemContent}</li>`;
      } else {
        html += `<li class="rn-subitem">${itemContent}</li>`;
      }
    } else if (trimmed.startsWith('*This section') || trimmed.startsWith('_This section')) {
      html += `<p class="rn-section-note">${inlineMarkdown(trimmed)}</p>`;
    } else {
      html += `<p class="rn-desc-p">${inlineMarkdown(trimmed)}</p>`;
    }
  }

  if (inSublist) {
    html += '</ul></li>';
  }

  return html;
}

function parseChangelogHeader(md) {
  const lines = md.split('\n');
  let title = '';
  let surfaceName = '';
  const introParagraphs = [];
  let currentPara = [];
  let started = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!started && trimmed.startsWith('# ')) {
      title = trimmed.replace(/^#\s+/, '').trim();
      started = true;
      continue;
    }
    if (started) {
      if (trimmed.match(/^##\s+\[/)) {
        break;
      }
      const surfaceMatch = trimmed.match(/^##\s+([^[\n\r]+)$/);
      if (surfaceMatch) {
        surfaceName = surfaceMatch[1].trim();
        if (currentPara.length > 0) {
          introParagraphs.push(currentPara.join(' '));
          currentPara = [];
        }
        continue;
      }
      if (trimmed === '---') {
        if (currentPara.length > 0) {
          introParagraphs.push(currentPara.join(' '));
          currentPara = [];
        }
        continue;
      }
      if (trimmed.length === 0) {
        if (currentPara.length > 0) {
          introParagraphs.push(currentPara.join(' '));
          currentPara = [];
        }
      } else {
        currentPara.push(trimmed);
      }
    }
  }
  if (currentPara.length > 0) {
    introParagraphs.push(currentPara.join(' '));
  }

  const description = introParagraphs[0] || '';
  const rolloutNotice = introParagraphs[1] || '';

  return {
    title,
    surfaceName,
    description,
    rolloutNotice
  };
}

function parseChangelog(md, tabPrefix = 'ext') {
  const releases = [];
  const lines = md.split('\n');
  let currentRelease = null;
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const verMatch = line.match(/^##\s+\[v?([0-9.]+)\]\s*-\s*(.+)$/);
    if (verMatch) {
      if (currentRelease) {
        releases.push(currentRelease);
      }
      const version = verMatch[1];
      const rawDate = verMatch[2].trim();
      let formattedDate = rawDate;
      let isoDate = null;

      const dateMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (dateMatch) {
        isoDate = rawDate;
        const [_, year, month, day] = dateMatch;
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
      }

      currentRelease = {
        version,
        id: `rel-${tabPrefix}-${version}`,
        versionLabel: `v${version}`,
        date: formattedDate,
        rawDate,
        isoDate,
        isLatest: releases.length === 0,
        headline: null,
        summary: null,
        introLines: [],
        sections: []
      };
      currentSection = null;
      continue;
    }

    if (!currentRelease) continue;

    if (!currentRelease.headline) {
      if (line.startsWith('### ')) {
        currentRelease.headline = line.replace(/^###\s+/, '').trim();
      } else if (line.trim().length > 0 && !line.startsWith('---')) {
        currentRelease.introLines.push(line.trim());
      }
      continue;
    }

    if (line.startsWith('### ')) {
      const sectionTitle = line.replace(/^###\s+/, '').trim();
      currentSection = { title: sectionTitle, lines: [] };
      currentRelease.sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      currentSection.lines.push(line);
    } else if (line.trim().length > 0 && !line.startsWith('---')) {
      currentRelease.introLines.push(line.trim());
    }
  }

  if (currentRelease) {
    releases.push(currentRelease);
  }

  for (const r of releases) {
    if (!r.summary && r.introLines.length > 0) {
      r.summary = r.introLines.join(' ');
    }
  }

  return releases;
}

function countBullets(lines) {
  return lines.filter(l => l.trim().startsWith('- **') || (l.trim().startsWith('- ') && !l.startsWith('    ') && !l.startsWith('  -'))).length;
}

function renderReleaseRow(r, pkg) {
  const accordionsHtml = r.sections.map(sec => {
    const count = countBullets(sec.lines);
    const countBadge = count > 0 ? `<span class="rn-count">(${count})</span>` : '';
    return `
      <details class="rn-accordion" data-release-detail="" data-item-title="${escapeHtml(sec.title)}">
        <summary class="rn-accordion-summary">
          <span class="rn-cat-title">${escapeHtml(sec.title)}${countBadge}</span>
          <svg class="rn-chevron" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </summary>
        <ul class="rn-list">
          ${parseLinesToHtml(sec.lines)}
        </ul>
      </details>
    `;
  }).join('\n');

  const headline = r.headline || '';
  const summaryText = r.summary ? inlineMarkdown(r.summary) : '';

  const headlineHtml = headline ? `<h3 class="rn-headline">${escapeHtml(headline)}</h3>` : '';
  const githubBtnHtml = (pkg && pkg.githubUrl) ? `
    <a href="${pkg.githubUrl}" target="_blank" rel="noopener noreferrer" class="subnav-pill external-link rn-card-action">GitHub <span class="arrow" aria-hidden="true">↗</span></a>
  ` : '';

  const cardHeaderHtml = (headlineHtml || githubBtnHtml) ? `
    <div class="rn-card-header">
      ${headlineHtml}
      ${githubBtnHtml}
    </div>
  ` : '';

  const summaryHtml = summaryText ? `<div class="rn-summary"><p>${summaryText}</p></div>` : '';

  return `
    <article class="rn-row" id="${r.id}">
      <div class="rn-version-col">
        <div class="rn-version-row">
          <h3 class="rn-version-heading">
            <a href="#${r.id}" class="rn-version-tag" title="View release ${r.version}">${r.versionLabel}</a>
          </h3>
          ${r.isLatest ? '<span class="rn-latest-tag">Latest</span>' : ''}
        </div>
        <time class="rn-date-text" ${r.isoDate ? `datetime="${r.isoDate}"` : ''}>${r.date}</time>
      </div>
      <div class="rn-card">
        ${cardHeaderHtml}
        ${summaryHtml}
        <div class="rn-categories">
          ${accordionsHtml}
        </div>
      </div>
    </article>
  `;
}

const packagesWithData = PACKAGES.map(pkg => {
  const filePath = path.join(pkg.dir, pkg.changelogFile);
  const rawMd = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const headerData = parseChangelogHeader(rawMd);
  const tabPrefix = pkg.id === 'extension' ? 'ext' : pkg.id;
  const releases = parseChangelog(rawMd, tabPrefix);
  const releaseRowsHtml = releases.map(r => renderReleaseRow(r, pkg)).join('\n');
  const label = headerData.surfaceName || pkg.label || pkg.id;
  return {
    ...pkg,
    label,
    rawMd,
    headerData,
    releases,
    releaseRowsHtml
  };
});

const primaryPkg = packagesWithData.find(p => p.isPrimary) || packagesWithData[0];
const headerTitle = primaryPkg.headerData.title || 'Changelog';
const headerDescription = primaryPkg.headerData.description || '';
const rolloutNotice = primaryPkg.headerData.rolloutNotice || '';

const tocListItems = packagesWithData.map((pkg, pIdx) => {
  return pkg.releases.map((r, rIdx) => `
    <li data-tab="${pkg.id}" ${pIdx === 0 ? '' : 'style="display: none;"'}><a href="#${r.id}" class="toc-link" ${pIdx === 0 && rIdx === 0 ? 'aria-current="true"' : ''}><span>${r.versionLabel}</span></a></li>
  `).join('\n');
}).join('\n');

const mobileTocListItems = packagesWithData.map((pkg, pIdx) => {
  return pkg.releases.map((r, rIdx) => `
    <li data-tab="${pkg.id}" ${pIdx === 0 ? '' : 'style="display: none;"'}><a href="#${r.id}" class="mobile-toc-link" ${pIdx === 0 && rIdx === 0 ? 'aria-current="true"' : ''}><span>${r.versionLabel}</span></a></li>
  `).join('\n');
}).join('\n');

const tabButtonsHtml = packagesWithData.map((pkg, idx) => `
  <button type="button" role="tab" class="rn-tab-btn ${idx === 0 ? 'active' : ''}" data-tab-target="${pkg.id}" data-md-file="${pkg.mdArtifact}" data-rollout-text="${escapeHtml(pkg.headerData.rolloutNotice || '')}" aria-selected="${idx === 0 ? 'true' : 'false'}" aria-controls="panel-${pkg.id}" id="tab-${pkg.id}">${escapeHtml(pkg.label)}</button>
`).join('\n');

const tabPanelsHtml = packagesWithData.map((pkg, idx) => `
  <div id="panel-${pkg.id}" class="tab-panel rn-panel ${idx === 0 ? 'active' : ''}" data-panel-id="${pkg.id}" ${idx === 0 ? '' : 'style="display: none;"'}>
    <div class="rn-timeline" id="releaseTimeline-${pkg.id}">
      ${pkg.releaseRowsHtml}
    </div>
  </div>
`).join('\n');


// Shared Navigation & Ecosystem Links (Single Source of Truth for Subnav & Footer)
const NAV_LINKS = {
  officialDocs: {
    label: 'Official Docs',
    href: 'https://antigravity.google/docs/changelog/'
  },
  marketplace: {
    label: 'Marketplace',
    href: 'https://marketplace.visualstudio.com/items?itemName=Google.google-antigravity'
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/lildaveloper/antigravity-extension-changelog'
  },
  license: {
    label: 'MIT License',
    href: 'https://github.com/lildaveloper/antigravity-extension-changelog/blob/main/LICENSE'
  }
};

const fullHtml = `<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
    (function() {
      const stored = typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');
      const theme = (stored === 'light' || stored === 'dark') ? stored : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.dataset.theme = theme;
    })();
  </script>
  <title>${escapeHtml(headerTitle)} | Google Antigravity Docs</title>
  <meta name="description" content="${escapeHtml(headerDescription)}">

  <!-- Favicon & Platform Icons -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="icon" type="image/png" href="assets/image/antigravity-logo.png">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">

  <!-- Open Graph / Facebook / iMessage -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Google Antigravity Docs">
  <meta property="og:title" content="${escapeHtml(headerTitle)} | Google Antigravity Docs">
  <meta property="og:description" content="${escapeHtml(headerDescription)}">
  <meta property="og:url" content="https://lildaveloper.github.io/antigravity-extension-changelog/">
  <meta property="og:image" content="https://lildaveloper.github.io/antigravity-extension-changelog/assets/image/sitecards/sitecard-documentation.png">
  <meta property="og:image:secure_url" content="https://lildaveloper.github.io/antigravity-extension-changelog/assets/image/sitecards/sitecard-documentation.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(headerTitle)} | Google Antigravity Docs">
  <meta name="twitter:description" content="${escapeHtml(headerDescription)}">
  <meta name="twitter:image" content="https://lildaveloper.github.io/antigravity-extension-changelog/assets/image/sitecards/sitecard-documentation.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Symbols:opsz,wght,FILL,GRAD,ROND@20..48,100..700,0..1,-50..200,0..100&display=block">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,slnt,wdth,wght,ROND@8..144,-10..0,25..150,400..500,0..100&display=swap">

  <!-- Official Antigravity Styles -->
  <link rel="stylesheet" href="assets/index.css">
  <link rel="stylesheet" href="assets/changelog.css">

  <style>
    @font-face {
      font-family: "Google Sans";
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url("assets/fonts/GoogleSansFlex.ttf") format("truetype-variations");
    }
    @font-face {
      font-family: "Google Sans Flex";
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url("assets/fonts/GoogleSansFlex.ttf") format("truetype-variations");
    }

    :root {
      --sl-font: 'Google Sans Flex', "Google Sans", sans-serif;
      --sl-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --sl-color-bg: #121317;
      --sl-color-bg-sidebar: #18191d;
      --sl-color-hairline: #18191d;
      --sl-color-hairline-light: #2f3034;
      --sl-color-text-accent: #8ab4f8;
      --sl-color-text: #e8eaed;
      --sl-color-white: #e8eaed;
      --sl-color-gray-1: #e8eaed;
      --sl-color-gray-2: #cdd4dc;
      --sl-color-gray-3: #aab1cc;
      --sl-color-gray-4: #45474d;
      --sl-color-gray-5: #2f3034;
      --sl-color-gray-6: #18191d;
      --theme-outline-variant: rgba(255, 255, 255, 0.12);
      --palette-grey-50: rgb(30, 32, 36);
    }
    :root[data-theme="light"] {
      --sl-color-bg: #ffffff;
      --sl-color-bg-sidebar: #ffffff;
      --sl-color-hairline: #f8f9fc;
      --sl-color-hairline-light: #f8f9fc;
      --sl-color-text-accent: #121317;
      --sl-color-text: #45474d;
      --sl-color-white: #121317;
      --sl-color-gray-1: #212226;
      --sl-color-gray-2: #45474d;
      --sl-color-gray-3: #757984;
      --sl-color-gray-4: #cdd4dc;
      --sl-color-gray-5: #eff2f7;
      --sl-color-gray-6: #f8f9fc;
      --theme-outline-variant: rgba(33, 34, 38, 0.06);
      --palette-grey-50: #e6eaf0;
    }

    * {
      box-sizing: border-box;
    }

    body {
      background-color: var(--sl-color-bg);
      color: var(--sl-color-text);
      font-family: var(--sl-font);
      font-size: 16px;
      line-height: 28px;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* Suppress native HTML details triangle marker */
    details > summary {
      list-style: none !important;
    }
    details > summary::-webkit-details-marker,
    details > summary::marker {
      display: none !important;
      content: "" !important;
      font-size: 0 !important;
    }

    /* Fixed Full-Width Header */
    header.header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 7rem;
      z-index: 1000;
      background-color: #ffffff;
      border-bottom: 1px solid rgba(33, 34, 38, 0.06);
      padding: 0;
      box-sizing: border-box;
    }
    :root[data-theme="dark"] header.header {
      background-color: #1e1e1e;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .header-stack {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .header-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 4.25rem;
      padding: 0 24px;
      background-color: #ffffff;
      box-sizing: border-box;
      flex: 0 1 auto;
    }
    :root[data-theme="dark"] .header-main {
      background-color: #1a1b1e;
    }

    .site-title {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      text-decoration: none;
    }
    .site-title img {
      width: auto;
      height: 1.75rem;
    }

    .right-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Starlight Theme Select Matching Official Docs */
    starlight-theme-select {
      display: block;
    }
    starlight-theme-select label {
      --sl-label-icon-size: 0.875rem;
      --sl-caret-size: 1.25rem;
      --sl-inline-padding: 0.5rem;
      --sl-select-width: 6.25em;
      color: var(--sl-color-gray-2);
      align-items: center;
      gap: 0.25rem;
      display: flex;
      position: relative;
      cursor: pointer;
      height: 44.5px;
    }
    starlight-theme-select label:hover {
      color: var(--sl-color-white);
    }
    starlight-theme-select .icon {
      pointer-events: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      fill: currentColor;
    }
    starlight-theme-select .label-icon {
      left: 0;
      inset-inline-start: 0;
      width: 0.875rem;
      height: 0.875rem;
    }
    starlight-theme-select .caret {
      right: 0;
      inset-inline-end: 0;
      width: 1.25rem;
      height: 1.25rem;
    }
    starlight-theme-select select {
      padding-block: 0.625rem;
      padding-inline: calc(var(--sl-label-icon-size) + var(--sl-inline-padding) + 0.25rem) calc(var(--sl-caret-size) + var(--sl-inline-padding) + 0.25rem);
      margin-inline: calc(var(--sl-inline-padding) * -1);
      width: calc(var(--sl-select-width) + var(--sl-inline-padding) * 2);
      text-overflow: ellipsis;
      color: inherit;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: transparent;
      border: 0;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 24.5px;
      height: 44.5px;
      outline: none;
    }
    starlight-theme-select option {
      background-color: #1a1b1e;
      color: #e8eaed;
    }
    :root[data-theme="light"] starlight-theme-select option {
      background-color: #ffffff;
      color: #212226;
    }

    .subnav-bar {
      height: 2.75rem;
      padding: 0 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      scrollbar-width: none;
      background-color: #16171a;
      align-items: center;
      display: flex;
      overflow-x: auto;
      width: 100%;
      box-sizing: border-box;
      flex: 0 1 auto;
    }
    .subnav-bar::-webkit-scrollbar {
      display: none;
    }
    .subnav-bar::before {
      display: none !important;
    }
    :root[data-theme="light"] .subnav-bar {
      background-color: #f8f9fa;
      border-top: 1px solid rgba(33, 34, 38, 0.06);
      border-bottom: 1px solid rgba(33, 34, 38, 0.06);
    }
    .subnav-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .subnav-left, .subnav-right {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .subnav-pill {
      color: #c4c7c5 !important;
      white-space: nowrap;
      border: 1px solid transparent;
      border-radius: 9999px;
      align-items: center;
      padding: 0.35rem 0.95rem;
      font-family: "Google Sans Flex", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.75;
      text-decoration: none;
      transition: 0.15s ease-in-out;
      display: inline-flex;
      cursor: pointer;
      box-sizing: border-box;
    }
    .subnav-pill:hover {
      background-color: rgba(255, 255, 255, 0.12);
      color: #ffffff !important;
    }
    .subnav-pill.active {
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
      color: #ffffff !important;
      background-color: #2b2d33 !important;
      font-weight: 600;
    }
    :root[data-theme="light"] .subnav-pill {
      color: #444746 !important;
    }
    :root[data-theme="light"] .subnav-pill:hover {
      background-color: #e8eaed;
      color: #1f1f1f !important;
    }
    :root[data-theme="light"] .subnav-pill.active {
      border: 1px solid #c7c9ce !important;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
      color: #1f1f1f !important;
      background-color: #dfe1e5 !important;
      font-weight: 600;
    }
    .subnav-pill .arrow {
      margin-left: 0.25rem;
      font-size: 0.85em;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: 136px;
    }

    @media (max-width: 50rem) {
      .header-main {
        padding: 0 1rem;
      }
      .subnav-bar {
        padding: 0 1rem !important;
      }
      .subnav-pill {
        padding: 0.25rem 0.65rem;
        font-size: 0.8125rem;
      }
      .content-panel {
        padding: 24px 1rem !important;
      }
      mobile-starlight-toc summary {
        padding: 0 1rem !important;
      }
      mobile-starlight-toc .dropdown a {
        padding: 0.45rem 1rem !important;
      }
    }

    /* Main 2-Column Full-Width Frame Matching Astro */
    .main-frame {
      display: block;
      width: 100%;
      padding-top: 112px;
      min-height: 100vh;
    }
    .lg\\:sl-flex {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .main-pane {
      order: 1;
      flex: 1;
      min-width: 0;
    }
    main {
      box-sizing: border-box;
      min-width: 0;
      max-width: 100%;
      padding: 0 0 3vh 0;
    }
    .content-panel {
      padding: 24px 56px;
      width: 100%;
      box-sizing: border-box;
    }
    .content-panel + .content-panel {
      border-top: 1px solid var(--sl-color-hairline);
    }
    .sl-container {
      max-width: 896px;
      margin: 0 auto;
      width: 100%;
    }

    /* Responsive Breakpoints matching Google Docs (72rem / 1152px) */
    @media (max-width: 71.99rem) {
      .right-sidebar-container {
        display: none !important;
      }
      mobile-starlight-toc {
        display: block !important;
      }
      .main-frame {
        padding-top: 152px;
      }
      html {
        scroll-padding-top: 176px;
      }
      .content-panel {
        padding: 24px 24px;
      }
    }

    @media (min-width: 72rem) {
      mobile-starlight-toc {
        display: none !important;
      }
      .right-sidebar-container {
        display: block !important;
      }
      .main-frame {
        padding-top: 112px;
      }
      html {
        scroll-padding-top: 136px;
      }
    }

    :root[data-mobile-toc-hidden="true"] mobile-starlight-toc {
      display: none !important;
    }
    :root[data-mobile-toc-hidden="true"] .main-frame {
      padding-top: 112px !important;
    }
    :root[data-mobile-toc-hidden="true"] {
      scroll-padding-top: 136px !important;
    }

    .breadcrumbs-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      min-width: 0;
      margin-bottom: 0.625rem;
      height: 26px;
      box-sizing: border-box;
    }
    .starlight-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.25rem 0.45rem;
      font-family: "Google Sans Text", "Google Sans", system-ui, -apple-system, sans-serif;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.3;
      color: #5f6368;
      min-width: 0;
      flex-wrap: wrap;
      flex: 1 1 auto;
    }
    :root[data-theme="dark"] .starlight-breadcrumbs {
      color: rgb(154, 160, 166);
    }
    .breadcrumb-separator {
      color: inherit;
      vertical-align: middle;
      flex-shrink: 0;
      width: 12px;
      height: 12px;
      display: inline-block;
    }
    .breadcrumb-item {
      color: inherit;
      align-items: center;
      display: inline-flex;
    }
    .breadcrumb-item:not(.breadcrumb-last) {
      color: #5f6368;
      flex-shrink: 0;
    }
    .breadcrumb-last {
      color: #202124;
      flex-shrink: 1;
      font-weight: 500;
    }
    :root[data-theme="dark"] .breadcrumb-last {
      color: rgb(232, 234, 237);
    }

    /* Markdown Dropdown Button & Menu matching Google Antigravity */
    .markdown-dropdown-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .markdown-trigger-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      height: 26px;
      min-height: 26px;
      padding: 3px 10px;
      margin: 0;
      font-family: "Google Sans", sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 9999px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.15s, border-color 0.15s;
      box-sizing: border-box;
      line-height: normal;
    }
    :root[data-theme="light"] .markdown-trigger-btn {
      color: #fff;
      background-color: #202124;
      border: 1px solid #202124;
    }
    :root[data-theme="light"] .markdown-trigger-btn span {
      color: #fff;
    }
    :root[data-theme="light"] .markdown-trigger-btn:hover {
      background-color: #3c4043;
      border-color: #3c4043;
    }
    :root[data-theme="dark"] .markdown-trigger-btn {
      color: rgb(232, 234, 237);
      background-color: rgb(47, 48, 52);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    :root[data-theme="dark"] .markdown-trigger-btn span {
      color: rgb(232, 234, 237);
    }
    :root[data-theme="dark"] .markdown-trigger-btn:hover {
      color: #fff;
      background-color: rgb(60, 64, 67);
      border-color: rgba(255, 255, 255, 0.28);
    }
    .markdown-trigger-btn .dropdown-icon {
      color: inherit;
      margin-left: 1px;
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }
    .markdown-trigger-btn .dropdown-icon svg {
      display: block;
    }
    .button.dropdown-open .dropdown-icon,
    .button[aria-expanded="true"] .dropdown-icon,
    .markdown-trigger-btn[aria-expanded="true"] .dropdown-icon {
      transform: rotate(-180deg);
    }
    .markdown-dropdown-menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      min-width: 155px;
      padding: 4px 0;
      border-radius: 8px;
      z-index: 100;
      box-sizing: border-box;
    }
    :root[data-theme="light"] .markdown-dropdown-menu {
      background-color: #fff;
      border: 1px solid #dadce0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    :root[data-theme="dark"] .markdown-dropdown-menu {
      background-color: rgb(42, 43, 46);
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }
    .markdown-dropdown-menu[hidden] {
      display: none !important;
    }
    .markdown-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 6px 12px;
      font-family: "Google Sans", sans-serif;
      font-size: 0.75rem;
      cursor: pointer;
      text-align: left;
      background: none;
      border: none;
      text-decoration: none;
      transition: background-color 0.15s, color 0.15s;
      box-sizing: border-box;
      line-height: 21px;
    }
    :root[data-theme="light"] .markdown-menu-item {
      color: #202124;
    }
    :root[data-theme="light"] .markdown-menu-item:hover {
      color: #1a73e8;
      background-color: #f1f3f4;
    }
    :root[data-theme="dark"] .markdown-menu-item {
      color: rgb(232, 234, 237);
    }
    :root[data-theme="dark"] .markdown-menu-item:hover {
      color: rgb(138, 180, 248);
      background-color: rgba(255, 255, 255, 0.08);
    }
    .markdown-menu-item .icon {
      color: #5f6368;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
    }
    :root[data-theme="dark"] .markdown-menu-item .icon {
      color: rgb(154, 160, 166);
    }
    .markdown-menu-item:hover .icon {
      color: inherit;
    }

    /* Accessibility utility matching Starlight */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Heading wrapper & anchor link matching Google Antigravity */
    .sl-markdown-content .sl-heading-wrapper {
      --sl-anchor-icon-size: .55em;
      --sl-anchor-icon-gap: .65em;
      --sl-anchor-icon-space: calc(var(--sl-anchor-icon-size) + var(--sl-anchor-icon-gap));
      line-height: var(--sl-line-height-headings, 1.2);
    }
    .sl-markdown-content .sl-heading-wrapper.level-h1 {
      font-size: var(--sl-text-h1, 42px);
    }
    .sl-markdown-content .sl-heading-wrapper > :first-child {
      padding-inline-end: var(--sl-anchor-icon-space);
      display: inline;
    }
    .sl-markdown-content .sl-anchor-link {
      user-select: none;
      margin-inline-start: calc(-1 * var(--sl-anchor-icon-size));
      display: inline-flex;
      position: relative;
      vertical-align: baseline;
      align-items: baseline;
      color: var(--sl-color-gray-3, #5f6368);
      transition: opacity 0.15s, color 0.15s;
      text-decoration: none;
    }
    :root[data-theme="dark"] .sl-markdown-content .sl-anchor-link {
      color: var(--sl-color-gray-3, #9aa0a6);
    }
    .sl-markdown-content .sl-anchor-link:hover {
      color: var(--sl-color-accent, #1a73e8);
    }
    :root[data-theme="dark"] .sl-markdown-content .sl-anchor-link:hover {
      color: #8ab4f8;
    }
    .sl-markdown-content .sl-anchor-link::after {
      content: "";
      position: absolute;
      inset: -0.25rem -0.5rem;
    }
    .sl-markdown-content .sl-anchor-icon > svg {
      width: var(--sl-anchor-icon-size);
      height: var(--sl-anchor-icon-size);
      vertical-align: baseline;
      transform: translateY(-0.02em);
      display: inline;
    }
    @media (hover: hover) {
      .sl-markdown-content .sl-anchor-link {
        opacity: 0;
      }
      .sl-markdown-content .sl-anchor-link:focus,
      .sl-markdown-content .sl-heading-wrapper:hover .sl-anchor-link {
        opacity: 1;
      }
    }

    h1#changelog {
      font-family: "Google Sans Flex", "Google Sans", sans-serif;
      font-size: 36px;
      font-weight: 500;
      line-height: 45px;
      color: #202124;
      margin: 0;
      letter-spacing: normal;
    }
    :root[data-theme="dark"] h1#changelog {
      color: #e8eaed;
    }
    .sl-markdown-content > p {
      font-family: "Google Sans Flex", "Google Sans", sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: #202124;
      margin: 0 0 20px 0;
    }
    :root[data-theme="dark"] .sl-markdown-content > p {
      color: #e8eaed;
    }

    /* Surface Tabs */
    .rn-wrapper {
      margin-top: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .rn-tab-bar {
      border-bottom: 1px solid var(--sl-color-hairline, rgba(0, 0, 0, 0.08));
      scrollbar-width: none;
      width: 100%;
      overflow: auto hidden;
    }
    .rn-tab-bar::-webkit-scrollbar {
      display: none;
    }
    .rn-tabs {
      white-space: nowrap;
      align-items: center;
      gap: 1.5rem;
      display: flex;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none;
    }
    .rn-tab-btn {
      color: var(--sl-color-gray-2, #5f6368);
      cursor: pointer;
      vertical-align: middle;
      background: none;
      border: none;
      outline: none;
      align-items: center;
      padding: 0.65rem 0.1rem 0.75rem;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25;
      transition: color 0.15s;
      display: inline-flex;
      position: relative;
      margin: 0 !important;
    }
    .rn-tab-btn:hover {
      color: var(--sl-color-text, #202124);
    }
    .rn-tab-btn.active {
      color: var(--sl-color-text-accent, #121317);
      font-weight: 600;
    }
    :root[data-theme="dark"] .rn-tab-btn {
      color: #9aa0a6;
    }
    :root[data-theme="dark"] .rn-tab-btn:hover {
      color: #ffffff;
    }
    :root[data-theme="dark"] .rn-tab-btn.active {
      color: #8ab4f8;
    }
    .rn-tab-btn.active::after {
      content: "";
      background-color: var(--sl-color-text-accent, #121317);
      border-radius: 2px 2px 0 0;
      height: 2px;
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
    }
    :root[data-theme="dark"] .rn-tab-btn.active::after {
      background-color: #8ab4f8;
    }

    .rn-subbar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0;
      margin: 0;
    }
    .rn-rollout-text {
      color: #757984;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.78125rem;
      line-height: 1.35;
      display: inline-flex;
      margin: 0 !important;
    }
    .rn-info-icon {
      color: #757984;
      flex-shrink: 0;
    }
    :root[data-theme="dark"] .rn-rollout-text {
      color: #e8eaed;
    }
    :root[data-theme="dark"] .rn-info-icon {
      color: #8ab4f8;
    }

    .rn-toggle-btn {
      border: 1px solid var(--sl-color-hairline, rgba(0, 0, 0, 0.08));
      color: #45474d;
      cursor: pointer;
      background: none;
      border-radius: 6px;
      align-items: center;
      gap: 0.3rem;
      padding: 0.2rem 0.55rem;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 21px;
      transition: color 0.15s, background-color 0.15s, border-color 0.15s;
      display: inline-flex;
      margin: 0 !important;
    }
    .rn-toggle-btn:hover {
      color: #45474d;
      background-color: #f8f9fc;
      border-color: rgba(0, 0, 0, 0.14);
    }
    :root[data-theme="dark"] .rn-toggle-btn {
      color: #9aa0a6;
      border-color: rgba(255, 255, 255, 0.1);
    }
    :root[data-theme="dark"] .rn-toggle-btn .toggle-icon {
      color: inherit;
    }
    :root[data-theme="dark"] .rn-toggle-btn:hover {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.2);
    }
    :root[data-theme="dark"] .rn-toggle-btn:hover .toggle-icon {
      color: #ffffff;
    }
    .rn-toggle-btn .toggle-icon {
      flex-shrink: 0;
      transition: transform 0.2s, stroke 0.15s, color 0.15s;
    }
    .rn-toggle-btn.expanded .toggle-icon {
      transform: rotate(180deg);
    }

    .rn-timeline {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 0.25rem;
      min-width: 0;
      max-width: 100%;
    }
    .rn-row {
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      align-items: start;
      gap: 20px;
      min-width: 0;
      max-width: 100%;
    }
    @media (max-width: 768px) {
      .rn-row {
        grid-template-columns: minmax(0, 1fr);
        gap: 0.45rem;
      }
    }

    .rn-version-col {
      padding-top: 5.6px;
    }
    .rn-version-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.35rem;
    }
    .rn-version-heading {
      margin: 0 !important;
      padding: 0 !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      border: none !important;
      display: inline-flex;
    }
    .rn-version-tag {
      font-family: var(--sl-font-mono, "Roboto Mono", monospace);
      color: #ffffff;
      font-size: 0.9375rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 26.25px;
      text-decoration: none;
      transition: color 0.15s;
    }
    :root[data-theme="light"] .rn-version-tag {
      color: #202124;
    }
    .rn-version-tag:hover {
      color: #8ab4f8;
    }
    :root[data-theme="light"] .rn-version-tag:hover {
      color: #1a73e8;
    }
    .rn-latest-tag {
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1a73e8;
      background-color: rgba(26, 115, 232, 0.08);
      border-radius: 4px;
      padding: 0.05rem 0.3rem;
      font-size: 0.5625rem;
      font-weight: 700;
      line-height: 1.2;
      display: inline-block;
    }
    :root[data-theme="dark"] .rn-latest-tag {
      color: #e8eaed;
      background-color: rgba(138, 180, 248, 0.15);
    }
    .rn-date-text {
      color: var(--sl-color-gray-3, #757984);
      font-size: 0.75rem;
      line-height: 21px;
      margin-top: 0.15rem;
      display: block;
    }
    :root[data-theme="dark"] .rn-date-text {
      color: rgb(154, 160, 166);
    }

    .rn-card {
      background-color: rgba(255, 255, 255, 0.024);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    :root[data-theme="light"] .rn-card {
      background-color: #f8f9fc;
      border: 1px solid #f8f9fc;
    }

    .rn-headline {
      color: #202124;
      font-family: "Google Sans", system-ui, sans-serif;
      font-weight: 600;
      line-height: 1.4;
      margin: 0px 0px 0.4rem !important;
      font-size: 1rem !important;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    :root[data-theme="dark"] .rn-headline {
      color: #ffffff;
    }

    .rn-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.65rem;
      min-width: 0;
      max-width: 100%;
    }
    .rn-card-header .rn-headline {
      margin-bottom: 0 !important;
    }
    @media (max-width: 768px) {
      .rn-card-header {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    .rn-card-action {
      flex-shrink: 0;
      font-size: 0.8125rem !important;
      padding: 0.22rem 0.7rem !important;
      line-height: 1.25 !important;
      border: 1px solid rgba(255, 255, 255, 0.14) !important;
    }
    :root[data-theme="light"] .rn-card-action {
      border: 1px solid rgba(0, 0, 0, 0.12) !important;
    }

    .rn-summary {
      color: #45474d;
      margin-bottom: 0.65rem;
      font-size: 0.84375rem;
      line-height: 1.55;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .rn-summary p {
      margin: 0px !important;
      font-size: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    :root[data-theme="dark"] .rn-summary {
      color: rgb(189, 193, 198);
    }

    .rn-categories {
      flex-direction: column;
      padding-top: 0.15rem;
      display: flex;
      min-width: 0;
      max-width: 100%;
    }

    /* Accordions matching official Starlight markdown details */
    details.rn-accordion {
      border: 1px solid rgba(33, 34, 38, 0.06);
      background-color: #e6eaf0;
      border-radius: 8px;
      margin-bottom: 0.85rem;
      padding: 12px 18px;
      transition: background-color 0.15s, border-color 0.15s;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    details.rn-accordion[open] {
      background-color: #ffffff;
      border-color: rgba(33, 34, 38, 0.06);
    }
    :root[data-theme="dark"] details.rn-accordion {
      background-color: rgb(30, 32, 36);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    :root[data-theme="dark"] details.rn-accordion[open] {
      background-color: rgb(36, 39, 45);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .rn-accordion-summary {
      cursor: pointer;
      user-select: none;
      color: #2f3034;
      justify-content: space-between;
      align-items: center;
      padding: 7.2px 0px;
      font-family: "Google Sans", "Google Sans Flex", sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 26.6px;
      transition: color 0.15s;
      display: flex;
      list-style: none !important;
      outline: none;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    .rn-accordion-summary:hover {
      color: #1a73e8;
    }
    :root[data-theme="dark"] .rn-accordion-summary {
      color: rgb(232, 234, 237);
    }
    :root[data-theme="dark"] .rn-accordion-summary:hover {
      color: rgb(138, 180, 248);
    }
    details.rn-accordion[open] > .rn-accordion-summary {
      border-bottom: 1px solid rgba(33, 34, 38, 0.06);
      margin-bottom: 12px;
      padding-bottom: 8px;
    }
    :root[data-theme="dark"] details.rn-accordion[open] > .rn-accordion-summary {
      border-bottom-color: rgba(255, 255, 255, 0.12);
    }

    .rn-cat-title {
      display: inline-flex;
      align-items: baseline;
      gap: 4.8px;
      font-size: 0.95rem;
      font-weight: 600;
    }
    .rn-count {
      color: #757984;
      font-size: 11.5px;
      font-weight: 400;
      line-height: 20.125px;
    }
    :root[data-theme="dark"] .rn-count {
      color: rgb(154, 160, 166);
    }
    .rn-chevron {
      color: #757984;
      width: 15px;
      height: 15px;
      flex-shrink: 0;
      transition: transform 0.2s;
    }
    :root[data-theme="dark"] .rn-chevron {
      color: #aab1cc;
    }
    details.rn-accordion[open] .rn-chevron {
      transform: rotate(180deg);
    }

    .rn-list {
      display: flex;
      flex-direction: column;
      gap: 5.6px;
      list-style: outside disc;
      margin: 0px !important;
      padding: 2.4px 0px 9.6px 20px !important;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    .rn-item {
      color: #45474d;
      font-size: 13px;
      line-height: 19.5px;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    :root[data-theme="dark"] .rn-item {
      color: #dadce0;
    }
    .rn-item code,
    .rn-subitem code,
    .rn-list code {
      font-family: var(--sl-font-mono, monospace);
      font-size: 12px;
      line-height: 18px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
      padding: 1.6px 4.8px;
      color: #202124;
      overflow-wrap: anywhere;
      word-break: break-word;
      white-space: break-spaces;
    }
    :root[data-theme="dark"] .rn-item code,
    :root[data-theme="dark"] .rn-subitem code,
    :root[data-theme="dark"] .rn-list code {
      background-color: rgba(255, 255, 255, 0.08);
      color: #e8eaed;
    }
    .rn-item a {
      color: inherit;
      text-underline-offset: 3px;
      text-decoration: underline;
      transition: opacity 0.2s;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .rn-item a:hover {
      opacity: 0.8;
    }

    .rn-sublist {
      margin: 0.35rem 0 0.4rem 1.25rem;
      padding: 0;
      list-style-type: circle;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    .rn-subitem {
      color: var(--sl-color-gray-2);
      font-size: 12.5px;
      line-height: 18px;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .rn-section-note {
      font-style: italic;
      color: var(--sl-color-gray-3);
      font-size: 12px;
      margin: 2px 0 6px 0;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .rn-desc-p {
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    /* Right Sidebar Table of Contents */
    .right-sidebar-container {
      order: 2;
      width: 288px;
      flex-shrink: 0;
      position: relative;
    }
    .right-sidebar {
      position: fixed;
      top: 112px;
      bottom: 0;
      right: 0;
      width: 288px;
      overflow-y: auto;
      padding: 24px 0;
      scrollbar-width: thin;
      border-inline-start: 1px solid var(--sl-color-hairline);
    }
    .right-sidebar-panel {
      padding: 16px 40px 16px 32px;
    }
    h2#starlight__on-this-page {
      font-family: "Google Sans Flex", "Google Sans", sans-serif;
      font-size: 18px;
      font-weight: 450;
      line-height: 21.6px;
      color: #121317;
      letter-spacing: normal;
      margin: 0 0 8px 0;
      padding: 0;
    }
    :root[data-theme="dark"] h2#starlight__on-this-page {
      color: #e8eaed;
    }
    .starlight-toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .starlight-toc-list li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    starlight-toc a,
    .toc-link {
      color: rgb(95, 99, 104);
      padding: 0.35rem 0 0.35rem 0.5rem;
      border-left: 2px solid transparent;
      border-radius: 4px;
      font-family: "Google Sans", sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.35;
      text-decoration: none;
      transition: color 0.15s, font-weight 0.15s, background-color 0.15s;
      display: block;
    }
    starlight-toc a:hover,
    .toc-link:hover {
      color: rgb(32, 33, 36);
      background-color: rgba(0, 0, 0, 0.04);
    }
    starlight-toc a[aria-current="true"],
    .toc-link[aria-current="true"] {
      color: rgb(25, 103, 210);
      border-left-color: rgb(25, 103, 210);
      font-weight: 500;
    }
    :root[data-theme="dark"] starlight-toc a,
    :root[data-theme="dark"] .toc-link {
      color: rgb(154, 160, 166);
      border-left-color: transparent;
    }
    :root[data-theme="dark"] starlight-toc a:hover,
    :root[data-theme="dark"] .toc-link:hover {
      color: rgb(255, 255, 255);
      background-color: rgba(255, 255, 255, 0.06);
    }
    :root[data-theme="dark"] starlight-toc a[aria-current="true"],
    :root[data-theme="dark"] .toc-link[aria-current="true"] {
      color: rgb(138, 180, 248);
      border-left-color: rgb(138, 180, 248);
      font-weight: 500;
    }

    /* Mobile Table of Contents (3rd top bar for < 72rem / 1152px) */
    mobile-starlight-toc {
      display: none;
    }
    mobile-starlight-toc nav {
      z-index: 90;
      top: 7rem;
      border-top: none;
      border-bottom: 1px solid rgba(33, 34, 38, 0.06);
      background-color: #ffffff;
      position: fixed;
      inset-inline: 0px;
    }
    :root[data-theme="dark"] mobile-starlight-toc nav {
      background-color: rgb(22, 23, 26);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }
    mobile-starlight-toc details {
      margin: 0;
      padding: 0;
    }
    mobile-starlight-toc summary {
      cursor: pointer;
      height: 2.5rem;
      color: #202124;
      border-bottom: none;
      align-items: center;
      gap: 0.625rem;
      padding: 0px 24px;
      font-family: "Google Sans", "Google Sans Flex", sans-serif;
      display: flex;
      box-sizing: border-box;
      outline: none;
      list-style: none !important;
      user-select: none;
    }
    :root[data-theme="dark"] mobile-starlight-toc summary {
      color: rgb(232, 234, 237);
    }
    mobile-starlight-toc .toggle {
      background-color: var(--palette-grey-10, #f8f9fa);
      border: 1px solid var(--theme-outline-variant, #dadce0);
      color: rgb(32, 33, 36);
      border-radius: 9999px;
      gap: 0.35rem;
      padding: 0.2rem 0.65rem;
      font-family: "Google Sans Flex", "Google Sans", sans-serif;
      font-size: 0.8125rem;
      font-weight: 500;
      line-height: 1.2;
      transition: 0.15s;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    mobile-starlight-toc details[open] .toggle {
      border-color: #1a73e8;
      color: #1a73e8;
      background-color: rgb(232, 240, 254);
    }
    :root[data-theme="dark"] mobile-starlight-toc .toggle {
      color: rgb(232, 234, 237);
      background-color: rgb(45, 46, 49);
      border-color: rgba(255, 255, 255, 0.15);
    }
    :root[data-theme="dark"] mobile-starlight-toc details[open] .toggle {
      color: rgb(138, 180, 248);
      background-color: rgba(138, 180, 248, 0.15);
      border-color: rgb(138, 180, 248);
    }
    mobile-starlight-toc .caret {
      transition: transform 0.2s ease;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    mobile-starlight-toc details[open] .caret {
      transform: rotate(90deg);
    }
    mobile-starlight-toc .display-current {
      color: rgb(95, 99, 104);
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: "Google Sans", sans-serif;
      font-size: 0.8125rem;
      font-weight: 400;
      overflow: hidden;
    }
    :root[data-theme="dark"] mobile-starlight-toc .display-current {
      color: rgb(154, 160, 166);
    }
    mobile-starlight-toc .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      border: 1px solid rgba(33, 34, 38, 0.06);
      border-top: none;
      max-height: calc(75vh - 7rem);
      background-color: #ffffff;
      border-radius: 0px 0px 12px 12px;
      padding: 0.5rem 0px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 32px;
      overscroll-behavior: contain;
      overflow-y: auto;
      box-sizing: border-box;
    }
    :root[data-theme="dark"] mobile-starlight-toc .dropdown {
      background-color: rgb(30, 30, 30);
      border-color: rgba(255, 255, 255, 0.12);
      border-top: none;
      box-shadow: rgba(0, 0, 0, 0.5) 0px 12px 32px;
    }
    mobile-starlight-toc ul.isMobile {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    mobile-starlight-toc ul.isMobile li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    mobile-starlight-toc .dropdown a {
      color: rgb(95, 99, 104);
      border-left: 2px solid transparent;
      padding: 0.45rem 1.5rem;
      font-family: "Google Sans", sans-serif;
      font-size: 0.875rem;
      line-height: 1.4;
      text-decoration: none;
      transition: 0.15s;
      display: block;
      border-top: 1px solid var(--sl-color-hairline);
    }
    mobile-starlight-toc .dropdown a:hover {
      color: rgb(32, 33, 36);
      background-color: rgba(0, 0, 0, 0.04);
    }
    mobile-starlight-toc .dropdown a[aria-current="true"] {
      color: rgb(26, 115, 232);
      background-color: rgba(26, 115, 232, 0.06);
      border-left-color: rgb(26, 115, 232);
      font-weight: 500;
    }
    :root[data-theme="dark"] mobile-starlight-toc .dropdown a {
      color: rgb(154, 160, 166);
      border-top-color: rgb(24, 25, 29);
    }
    :root[data-theme="dark"] mobile-starlight-toc .dropdown a:hover {
      color: rgb(255, 255, 255);
      background-color: rgba(255, 255, 255, 0.06);
    }
    :root[data-theme="dark"] mobile-starlight-toc .dropdown a[aria-current="true"] {
      color: rgb(138, 180, 248);
      background-color: rgba(138, 180, 248, 0.1);
      border-left-color: rgb(138, 180, 248);
    }

    .tab-panel {
      display: none;
    }
    .tab-panel.active {
      display: block;
    }

    /* Footer & Legal Nav matching Google Antigravity */
    .docs-footer {
      display: flex;
      flex-direction: column;
      margin-top: 144px;
      padding: 0;
    }
    .docs-legal-nav {
      border-top: 1px solid var(--sl-color-hairline-light);
      padding-top: 1.25rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem 1.5rem;
    }
    .docs-footer-link {
      font-family: var(--sl-font);
      font-size: 13px;
      line-height: 22.75px;
      font-weight: 400;
      color: #45474d;
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      margin: 0 !important;
      display: inline-flex;
      align-items: center;
      vertical-align: baseline;
    }

    /* Legal Modals (Privacy & Terms) */
    .legal-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }
    .legal-modal-backdrop.is-open {
      opacity: 1;
      visibility: visible;
    }
    .legal-modal {
      background: var(--sl-color-bg);
      border: 1px solid var(--sl-color-hairline-light);
      border-radius: 16px;
      max-width: 640px;
      width: 100%;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      transform: scale(0.96);
      transition: transform 0.2s ease;
      overflow: hidden;
    }
    .legal-modal-backdrop.is-open .legal-modal {
      transform: scale(1);
    }
    .legal-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--sl-color-hairline-light);
    }
    .legal-modal-header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--sl-color-text);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .legal-modal-close {
      background: transparent;
      border: none;
      color: var(--sl-color-gray-3);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s, background 0.15s;
    }
    .legal-modal-close:hover {
      color: var(--sl-color-white);
      background: var(--sl-color-gray-6);
    }
    .legal-modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--sl-color-gray-2);
    }
    .legal-modal-body h4 {
      margin: 1.25rem 0 0.4rem 0;
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--sl-color-text);
    }
    .legal-modal-body h4:first-child {
      margin-top: 0;
    }
    .legal-modal-body p {
      margin: 0 0 0.75rem 0;
    }
    .legal-modal-body ul {
      margin: 0 0 0.75rem 1.25rem;
      padding: 0;
    }
    .legal-modal-body li {
      margin-bottom: 0.35rem;
    }
    .legal-modal-body code {
      font-family: var(--sl-font-mono);
      font-size: 0.8125rem;
      padding: 0.15rem 0.35rem;
      background: var(--sl-color-gray-6);
      border-radius: 4px;
      color: var(--sl-color-text);
    }
    .legal-modal-body a {
      color: var(--sl-color-text-accent);
      text-decoration: none;
    }
    .legal-modal-body a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="_top"></div>

  <!-- Header Navigation (Full-Width Edge-to-Edge) -->
  <header class="header">
    <div class="header-stack">
      <!-- Row 1: Logo & Right-side Theme -->
      <div class="header-main">
        <div class="title-wrapper">
          <a href="./" class="site-title">
            <img class="light:sl-hidden" alt="Google Antigravity" src="assets/antigravity_product_lockup_dark.svg" width="1687" height="217">
            <img class="dark:sl-hidden" alt="Google Antigravity" src="assets/antigravity_product_lockup_full_color.svg" width="1687" height="217">
          </a>
        </div>

        <div class="right-group">
          <template id="theme-icons">
            <svg aria-hidden="true" class="light" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Zm.64 5-.71.71a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71A1 1 0 0 0 5.64 17ZM12 5a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1Zm5.66 2.34a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.66.71a1 1 0 0 0 0 1.41 1 1 0 0 0 .66.29Zm-12-.29a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.71-.71a1.004 1.004 0 1 0-1.43 1.41l.73.71ZM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm-2.64 6A1 1 0 0 0 17 18.36l.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.76-.66ZM12 6.5a5.5 5.5 0 1 0 5.5 5.5A5.51 5.51 0 0 0 12 6.5Zm0 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0 3.5a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Z"></path>
            </svg>
            <svg aria-hidden="true" class="dark" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.049 8.049 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14 9.784 9.784 0 0 0 2.1-.22 8.11 8.11 0 0 1-7.18 4.32v-.04Z"></path>
            </svg>
            <svg aria-hidden="true" class="auto" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 14h-1V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7H3a1 1 0 0 0-1 1v2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-2a1 1 0 0 0-1-1ZM6 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7H6V7Zm14 10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h16v1Z"></path>
            </svg>
          </template>
          <starlight-theme-select>
            <label style="--sl-select-width: 6.25em">
              <span class="sr-only">Select theme</span>
              <svg aria-hidden="true" class="icon label-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.049 8.049 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14 9.784 9.784 0 0 0 2.1-.22 8.11 8.11 0 0 1-7.18 4.32v-.04Z"></path>
              </svg>
              <select id="themeSelect" autocomplete="off">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
              <svg aria-hidden="true" class="icon caret" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z"></path>
              </svg>
            </label>
          </starlight-theme-select>
        </div>
      </div>

      <!-- Row 2: Subnav Bar -->
      <nav class="subnav-bar" aria-label="Documentation sections">
        <div class="subnav-container">
          <div class="subnav-left">
            <a href="${NAV_LINKS.officialDocs.href}" target="_blank" rel="noopener noreferrer" class="subnav-pill">${NAV_LINKS.officialDocs.label}</a>
            <a href="${NAV_LINKS.marketplace.href}" target="_blank" rel="noopener noreferrer" class="subnav-pill">${NAV_LINKS.marketplace.label}</a>
          </div>
          <div class="subnav-right">
            <a href="./" class="subnav-pill active" aria-current="page">Changelog</a>
            <a href="${NAV_LINKS.github.href}" target="_blank" rel="noopener noreferrer" class="subnav-pill external-link">${NAV_LINKS.github.label} <span class="arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Mobile Table of Contents (3rd top bar for < 72rem / 1152px) -->
  <mobile-starlight-toc data-min-h="2" data-max-h="3" data-has-headings="true">
    <nav aria-labelledby="starlight__on-this-page--mobile" data-analytics-nav="docs_toc">
      <details id="starlight__mobile-toc">
        <summary id="starlight__on-this-page--mobile">
          <span class="toggle">
            On this page
            <svg aria-hidden="true" class="caret" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="m14.83 11.29-4.24-4.24a1 1 0 1 0-1.42 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1.002 1.002 0 0 0 0-1.42Z"></path>
            </svg>
          </span>
          <span class="display-current"></span>
        </summary>
        <div class="dropdown">
          <ul class="isMobile">
            <li data-tab-hidden="true" style="display: none;"><a href="#_top" style="display: none;"><span>Overview</span></a></li>
            ${mobileTocListItems}
          </ul>
        </div>
      </details>
    </nav>
  </mobile-starlight-toc>

  <!-- Main Container Layout -->
  <div class="main-frame">
    <div class="lg:sl-flex">

      <!-- Right Sidebar Table of Contents ("On this page") -->
      <aside class="right-sidebar-container print:hidden">
        <div class="right-sidebar">
          <div class="right-sidebar-panel">
            <div class="sl-container">
              <starlight-toc data-min-h="2" data-max-h="3">
                <nav aria-labelledby="starlight__on-this-page" data-analytics-nav="docs_toc">
                  <h2 id="starlight__on-this-page">On this page</h2>
                  <ul id="tocList" class="starlight-toc-list">
                    <li data-tab-hidden="true" style="display: none;"><a href="#_top" style="display: none;"><span>Overview</span></a></li>
                    ${tocListItems}
                  </ul>
                </nav>
              </starlight-toc>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Pane -->
      <div class="main-pane">
        <main>
          <!-- Content Panel 1: Breadcrumbs -->
          <div class="content-panel">
            <div class="sl-container">
              <div class="breadcrumbs-row">
                <nav aria-label="Breadcrumb" class="starlight-breadcrumbs">
                  <span class="breadcrumb-item" title="Documentation">Documentation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="breadcrumb-separator" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  <span class="breadcrumb-item breadcrumb-last" title="${escapeHtml(headerTitle)}">${escapeHtml(headerTitle)}</span>
                </nav>
                <div id="md-actions-root" class="markdown-dropdown-wrapper" data-pathname="/docs/changelog/">
                  <button type="button" class="call-to-action--nav button button-primary button-compact markdown-trigger-btn dropdown-nav" aria-haspopup="true" aria-expanded="false" aria-label="Markdown Options">
                    <span>Markdown</span>
                    <span class="dropdown-icon" translate="no">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12 15L7.05 10.05L8.45 8.65L12 12.2L15.55 8.65L16.95 10.05L12 15Z"></path></svg>
                    </span>
                  </button>
                  <div class="markdown-dropdown-menu" data-md-menu hidden>
                    <button type="button" class="markdown-menu-item" data-copy-md data-md-file="${primaryPkg.mdArtifact}">
                      <svg class="icon" viewBox="0 -960 960 960" width="16px" height="16px" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M318.46-230.77q-23.53,0-40.61-17.08t-17.08-40.61V-802.31q0-23.53 17.08-40.61T318.46-860H712.31q23.53,0 40.61,17.08T770-802.31v513.84q0,23.53-17.08,40.61t-40.61,17.08H318.46Zm0-45.38H712.31q4.62,0 8.46-3.85t3.85-8.46V-802.31q0-4.62-3.85-8.46t-8.46-3.85H318.46q-4.62,0-8.46,3.85t-3.85,8.46v513.84q0,4.62 3.85,8.46t8.46,3.85ZM207.69-120q-23.53,0-40.61-17.08T150-177.7V-736.92h45.38V-177.7q0,4.62 3.85,8.46t8.46,3.85H646.92V-120H207.69Zm98.46-156.15q0,0 0-3.85t0-8.46V-802.31q0-4.62 0-8.46t0-3.85q0,0 0,3.85t0,8.46v513.84q0,4.62 0,8.46t0,3.85Z"></path></svg>
                      <span class="item-label">Copy Markdown</span>
                    </button>
                    <a href="${primaryPkg.mdArtifact}" data-view-md-link target="_blank" rel="noopener noreferrer" class="markdown-menu-item">
                      <svg class="icon" viewBox="0 -960 960 960" width="16px" height="16px" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M197.69-140q-23.53,0-40.61-17.08T140-197.69V-762.31q0-23.53 17.08-40.61T197.69-820H449.38v45.38H197.69q-4.62,0-8.46,3.85t-3.85,8.46v564.61q0,4.62 3.85,8.46t8.46,3.85H762.31q4.62,0 8.46-3.85t3.85-8.46V-449.38H820v251.69q0,23.53-17.08,40.61T762.31-140H197.69ZM384.31-351.69l-32-32.61L742.62-774.61H530.15V-820H820v289.84H774.61V-742L384.31-351.69Z"></path></svg>
                      <span class="item-label">View Markdown</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Panel 2: Changelog Body -->
          <div class="content-panel">
            <div class="sl-container">
              <!-- Main Heading & Description -->
              <div class="sl-markdown-content">
                <div class="sl-heading-wrapper level-h1">
                  <h1 id="changelog">${escapeHtml(headerTitle)}</h1><a class="sl-anchor-link" href="#changelog">
                    <span aria-hidden="true" class="sl-anchor-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 1 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 0 0-1.42-1.42m8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 1 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3.88-3.89a4.49 4.49 0 0 0 0-6.33M8.83 15.17a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.92-4.92a1 1 0 1 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42"></path>
                      </svg>
                    </span>
                    <span class="sr-only">Section titled “${escapeHtml(headerTitle)}”</span>
                  </a>
                </div>
                <p>
                  ${headerDescription ? inlineMarkdown(escapeHtml(headerDescription)) : ''}
                </p>

                <!-- Surface Timeline Wrapper -->
                <div class="rn-wrapper not-content">
                  <div class="rn-tab-bar">
                    <div class="rn-tabs" role="tablist" aria-label="Surfaces">
                      ${tabButtonsHtml}
                    </div>
                  </div>

                  <div class="rn-subbar">
                    <p class="rn-rollout-text">
                      <svg class="rn-info-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                      <span id="rolloutNoticeText">${escapeHtml(rolloutNotice)}</span>
                    </p>
                    <button type="button" id="toggleAllBtn" class="rn-toggle-btn" data-toggle-all="" aria-expanded="false" title="Toggle all sections">
                      <svg class="toggle-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="7 13 12 18 17 13"></polyline>
                        <polyline points="7 6 12 11 17 6"></polyline>
                      </svg>
                      <span class="rn-toggle-btn-label toggle-text">Expand all</span>
                    </button>
                  </div>

                  <div class="rn-panels-container">
                    ${tabPanelsHtml}
                  </div>
                </div>
              </div>

              <!-- Legal / Footer matching Google Antigravity -->
              <footer class="sl-flex docs-footer">
                <nav class="docs-legal-nav print:hidden" aria-label="Project links and legal notices">
                  <a class="docs-footer-link" href="${NAV_LINKS.officialDocs.href}" target="_blank" rel="noopener noreferrer">${NAV_LINKS.officialDocs.label}</a>
                  <a class="docs-footer-link" href="${NAV_LINKS.marketplace.href}" target="_blank" rel="noopener noreferrer">${NAV_LINKS.marketplace.label}</a>
                  <a class="docs-footer-link" href="${NAV_LINKS.github.href}" target="_blank" rel="noopener noreferrer">${NAV_LINKS.github.label}</a>
                  <a class="docs-footer-link" href="${NAV_LINKS.license.href}" target="_blank" rel="noopener noreferrer">${NAV_LINKS.license.label}</a>
                  <a href="#privacy" class="docs-footer-link" id="btnPrivacy">Privacy</a>
                  <a href="#terms" class="docs-footer-link" id="btnTerms">Terms</a>
                </nav>
              </footer>
            </div>
          </div>
        </main>
      </div>

    </div>
  </div>

  <!-- Privacy Modal -->
  <div id="modalPrivacy" class="legal-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="privacyTitle">
    <div class="legal-modal">
      <div class="legal-modal-header">
        <h3 id="privacyTitle">Privacy Policy</h3>
        <button type="button" class="legal-modal-close" aria-label="Close dialog" data-close-modal>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="legal-modal-body">
        <p style="color: var(--sl-color-gray-3); font-size: 0.8125rem; margin-bottom: 1rem;"><strong>Last Updated:</strong> October 2, 2026</p>
        <p>This Privacy Policy explains how the <strong>Google Antigravity Extension Changelog</strong> project (&quot;we&quot;, &quot;our&quot;, or &quot;the project&quot;) handles information when you visit our documentation site or use our open-source tools.</p>

        <h4>1. Zero Personal Data Collection</h4>
        <p>This project is an open-source, informational repository and static documentation archive. We do not collect, store, process, share, or sell any personally identifiable information (PII) such as your name, email address, IP address, or location.</p>

        <h4>2. Zero Cookies &amp; Tracking Technologies</h4>
        <p>Our website does not use tracking cookies, analytics beacons, marketing pixels, or third-party telemetry scripts. Local browser <code>localStorage</code> is used exclusively to remember your UI theme preference (<code>light</code> or <code>dark</code>). This value never leaves your browser.</p>

        <h4>3. Static GitHub Pages Hosting</h4>
        <p>This documentation site is hosted statically via GitHub Pages. Standard HTTP network logs (such as request IP addresses, browser user-agents, and timestamps) are processed by GitHub Inc. for infrastructure security and DDoS mitigation in accordance with the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>.</p>

        <h4>4. CLI Scripts &amp; Local Operations</h4>
        <p>The companion scripts and patches (such as <code>packages/extension-patches</code>) execute entirely on your local machine. They never transmit codebase contents, diffs, file trees, or system metrics to remote servers. All inspections, unpackings, and patch applications remain strictly local.</p>

        <h4>5. Third-Party Links</h4>
        <p>Our site provides links to external resources, such as the Visual Studio Code Marketplace and Google. We are not responsible for the privacy practices or content of external third-party sites.</p>

        <h4>6. Updates to This Policy</h4>
        <p>Because this is a static archive, privacy changes are rare. Any updates will be reflected directly in this policy with a revised date.</p>

        <h4 style="margin-top: 1.5rem;">Contact</h4>
        <p>If you have questions about this Privacy Policy, please open an issue on the <a href="https://github.com/lildaveloper/antigravity-extension-changelog" target="_blank" rel="noopener noreferrer">antigravity-extension-changelog GitHub repository</a>.</p>
      </div>
    </div>
  </div>

  <!-- Terms Modal -->
  <div id="modalTerms" class="legal-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="termsTitle">
    <div class="legal-modal">
      <div class="legal-modal-header">
        <h3 id="termsTitle">Terms of Service &amp; Legal Notices</h3>
        <button type="button" class="legal-modal-close" aria-label="Close dialog" data-close-modal>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="legal-modal-body">
        <p style="color: var(--sl-color-gray-3); font-size: 0.8125rem; margin-bottom: 1rem;"><strong>Last Updated:</strong> October 2, 2026</p>
        <p>Please read these Terms of Service (&quot;Terms&quot;) carefully before using the <strong>Google Antigravity Extension Changelog</strong> website, documentation, scripts, or repositories.</p>

        <h4>1. Purpose &amp; Educational Nature</h4>
        <p>The <code>antigravity-extension-changelog</code> project is an independent, community-driven historical archive and forensic engineering reference for the Google Antigravity VS Code Extension. It is created for educational, research, archival, and interoperability purposes under fair use.</p>

        <h4>2. Trademark &amp; Non-Affiliation Disclaimer</h4>
        <p>Google Antigravity, Google, Google Cloud, and Gemini are trademarks or registered trademarks of Google LLC. Visual Studio Code and VS Code are trademarks of Microsoft Corporation. This project is <strong>not affiliated with, endorsed by, sponsored by, or associated with Google LLC or Microsoft Corporation</strong> in any manner. All product names, logos, and brands referenced on this site are property of their respective owners.</p>

        <h4>3. Open Source License</h4>
        <p>All code, diff analysis scripts, and site generators created by this repository are released under the <a href="https://github.com/lildaveloper/antigravity-extension-changelog/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.</p>

        <h4>4. &quot;AS IS&quot; Disclaimer of Warranty</h4>
        <p style="font-size: 0.8125rem; text-transform: uppercase; color: var(--sl-color-gray-2); letter-spacing: 0.02em;">THE MATERIALS, DOCUMENTATION, SCRIPTS, AND PATCHES (INCLUDING <code>PACKAGES/EXTENSION-PATCHES</code>) ARE PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS, MAINTAINERS, OR CONTRIBUTORS BE LIABLE FOR ANY CLAIM, DAMAGES, LOSS OF DATA, OR OTHER LIABILITY ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>

        <h4>5. User Responsibility &amp; Discretion</h4>
        <p>Users who choose to download the extension, apply community patches, or modify their local environment do so entirely at their own discretion, risk, and responsibility. Always back up your development environment before running experimental scripts.</p>

        <h4>6. Modifications to Terms</h4>
        <p>We reserve the right to modify these Terms at any time. Any changes will be published here with an updated &quot;Last Updated&quot; timestamp.</p>

        <h4 style="margin-top: 1.5rem;">Contact</h4>
        <p>If you have questions or feedback regarding these Terms, please open an issue on the <a href="https://github.com/lildaveloper/antigravity-extension-changelog" target="_blank" rel="noopener noreferrer">antigravity-extension-changelog GitHub repository</a>.</p>
      </div>
    </div>
  </div>

  <!-- Interactive Scripts -->
  <script>
    // Theme Management matching Starlight
    const themeKey = 'starlight-theme';
    const getStoredTheme = () => {
      const val = typeof localStorage !== 'undefined' && localStorage.getItem(themeKey);
      return (val === 'auto' || val === 'dark' || val === 'light') ? val : 'auto';
    };
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

    function updateThemePickers(theme) {
      document.querySelectorAll('starlight-theme-select').forEach((picker) => {
        const select = picker.querySelector('select');
        if (select) select.value = theme;
        const tmpl = document.querySelector('#theme-icons');
        const newIcon = tmpl && tmpl.content.querySelector('.' + theme);
        if (newIcon) {
          const oldIcon = picker.querySelector('svg.label-icon');
          if (oldIcon) {
            oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);
          }
        }
      });
    }

    function applyTheme(theme) {
      if (theme === 'auto') {
        localStorage.removeItem(themeKey);
        document.documentElement.dataset.theme = getSystemTheme();
      } else {
        localStorage.setItem(themeKey, theme);
        document.documentElement.dataset.theme = theme;
      }
      updateThemePickers(theme);
    }

    const currentSavedTheme = getStoredTheme();
    applyTheme(currentSavedTheme);

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
      });
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      if (!localStorage.getItem(themeKey)) {
        applyTheme('auto');
      }
    });

    // Markdown Dropdown Menu & Copy Action matching Google Antigravity
    document.querySelectorAll('.markdown-dropdown-wrapper').forEach(wrapper => {
      const btn = wrapper.querySelector('.markdown-trigger-btn');
      const menu = wrapper.querySelector('[data-md-menu]');
      const copyBtn = wrapper.querySelector('[data-copy-md]');

      if (!btn || !menu) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.hasAttribute('hidden');
        if (isHidden) {
          menu.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
          btn.classList.add('dropdown-open');
        } else {
          menu.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('dropdown-open');
        }
      });

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          menu.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('dropdown-open');
        }
      });

      if (copyBtn) {
        copyBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const label = copyBtn.querySelector('.item-label');
          const originalText = label ? label.textContent : 'Copy Markdown';
          try {
            if (label) label.textContent = 'Fetching...';
            const targetFile = copyBtn.dataset.mdFile || 'changelog-extension.md';
            const res = await fetch(targetFile);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const rawText = await res.text();
            const doc = new DOMParser().parseFromString(rawText, 'text/html');
            const pre = doc.querySelector('pre');
            const textToCopy = pre ? (pre.textContent || '') : rawText;
            await navigator.clipboard.writeText(textToCopy);
            if (label) {
              label.textContent = 'Copied!';
              setTimeout(() => {
                label.textContent = originalText;
                menu.setAttribute('hidden', '');
                btn.setAttribute('aria-expanded', 'false');
                btn.classList.remove('dropdown-open');
              }, 1200);
            }
          } catch (err) {
            console.error('Error copying markdown:', err);
            if (label) {
              label.textContent = 'Error copying';
              setTimeout(() => {
                label.textContent = originalText;
              }, 2000);
            }
          }
        });
      }
    });

    // Expand All / Collapse All (dynamically synced with accordion states)
    const toggleAllBtn = document.getElementById('toggleAllBtn');

    function updateToggleAllBtn() {
      if (!toggleAllBtn) return;
      const activePanel = document.querySelector('.tab-panel.active') || document.getElementById('panel-extension');
      if (!activePanel) return;
      const accordions = activePanel.querySelectorAll('details.rn-accordion');
      if (accordions.length === 0) return;
      const allOpen = Array.from(accordions).every(acc => acc.open);
      const label = toggleAllBtn.querySelector('.rn-toggle-btn-label') || toggleAllBtn.querySelector('.toggle-text');
      if (label) label.textContent = allOpen ? 'Collapse all' : 'Expand all';
      toggleAllBtn.classList.toggle('expanded', allOpen);
      toggleAllBtn.setAttribute('aria-expanded', allOpen ? 'true' : 'false');
    }

    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const activePanel = document.querySelector('.tab-panel.active') || document.getElementById('panel-extension');
        if (!activePanel) return;
        const accordions = activePanel.querySelectorAll('details.rn-accordion');
        if (accordions.length === 0) return;
        const shouldOpen = !Array.from(accordions).every(acc => acc.open);
        accordions.forEach(acc => {
          acc.open = shouldOpen;
        });
        updateToggleAllBtn();
      });
    }

    // Capture toggle events from individual accordion disclosures
    document.addEventListener('toggle', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('rn-accordion')) {
        updateToggleAllBtn();
      }
    }, true);

    updateToggleAllBtn();

    // Scroll Spy for Table of Contents with Dead-End & Click Handling
    const tocLinks = document.querySelectorAll('#tocList a');
    let isClickScrolling = false;
    let clickTimeout = null;
    let currentActiveId = document.querySelector('.rn-row')?.id || null;

    function syncDisplayCurrent(activeText, force) {
      const displayCurrent = document.querySelector('mobile-starlight-toc .display-current');
      if (!displayCurrent) return;
      if (!force && window.scrollY < 80) {
        displayCurrent.textContent = '';
      } else if (activeText) {
        displayCurrent.textContent = activeText;
      }
    }

    function setActiveLink(id, forceText) {
      if (!forceText && id === currentActiveId && window.scrollY >= 80) {
        return;
      }
      currentActiveId = id;

      tocLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      const mobileLinks = document.querySelectorAll('mobile-starlight-toc .dropdown a');
      let activeText = '';
      mobileLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          link.setAttribute('aria-current', 'true');
          activeText = link.textContent.trim();
        } else {
          link.removeAttribute('aria-current');
        }
      });

      syncDisplayCurrent(activeText, forceText);
    }

    function computeActiveId() {
      const activePanel = document.querySelector('.tab-panel.active') || document;
      const sections = Array.from(activePanel.querySelectorAll('.rn-row'));
      if (sections.length === 0) return null;

      const scrollY = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Dead end of document: automatically highlight the last section
      if (scrollY >= maxScroll - 8 && maxScroll > 0) {
        return sections[sections.length - 1].id;
      }

      // Calculate effective trigger points for all sections
      const headerOffset = window.innerWidth < 1152 ? 180 : 160;
      const canReach = [];
      for (let i = 0; i < sections.length; i++) {
        canReach[i] = (sections[i].offsetTop - headerOffset) <= maxScroll;
      }

      let firstUnreachable = sections.findIndex((s, i) => !canReach[i]);
      if (firstUnreachable === -1) firstUnreachable = sections.length;

      const triggerPoints = [];
      let prevTrigger = 0;

      for (let i = 0; i < firstUnreachable; i++) {
        const normal = Math.max(0, sections[i].offsetTop - headerOffset);
        triggerPoints[i] = normal;
        prevTrigger = normal;
      }

      const numUnreachable = sections.length - firstUnreachable;
      if (numUnreachable > 0) {
        const gap = Math.max(0, maxScroll - prevTrigger);
        for (let j = 0; j < numUnreachable; j++) {
          const idx = firstUnreachable + j;
          if (j === numUnreachable - 1) {
            triggerPoints[idx] = Math.max(prevTrigger, maxScroll - 8);
          } else {
            triggerPoints[idx] = prevTrigger + gap * ((j + 1) / numUnreachable);
          }
        }
      }

      let activeId = sections[0].id;
      for (let i = 0; i < sections.length; i++) {
        if (scrollY >= triggerPoints[i]) {
          activeId = sections[i].id;
        } else {
          break;
        }
      }
      return activeId;
    }

    function updateScrollSpy() {
      if (isClickScrolling) return;
      const activePanel = document.querySelector('.tab-panel.active') || document.getElementById('panel-extension');
      if (!activePanel || activePanel.querySelectorAll('.rn-row').length === 0) return;

      if (window.scrollY < 80) {
        const displayCurrent = document.querySelector('mobile-starlight-toc .display-current');
        if (displayCurrent) displayCurrent.textContent = '';
      }

      const activeId = computeActiveId();
      if (activeId && activeId !== currentActiveId) {
        setActiveLink(activeId);
      }
    }

    // Fast-clear displayCurrent when scrolled back near top
    window.addEventListener('scroll', () => {
      if (!isClickScrolling && window.scrollY < 80) {
        const displayCurrent = document.querySelector('mobile-starlight-toc .display-current');
        if (displayCurrent) displayCurrent.textContent = '';
      }
    }, { passive: true });

    if (window.location.hash) {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      if (hashId && document.getElementById(hashId)) {
        setTimeout(() => {
          if (window.scrollY >= 80) {
            setActiveLink(hashId, true);
          }
        }, 150);
      }
    }

    // Handle clicks on TOC links
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        isClickScrolling = true;
        setActiveLink(targetId, true);
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
          isClickScrolling = false;
        }, 1200);
      });
    });

    // Mobile TOC Dropdown Click & Accessibility Handling
    const mobileTocDetails = document.getElementById('starlight__mobile-toc');
    const mobileTocLinks = document.querySelectorAll('mobile-starlight-toc .dropdown a');

    if (mobileTocDetails) {
      const parentToc = mobileTocDetails.closest('mobile-starlight-toc');
      mobileTocDetails.addEventListener('toggle', () => {
        if (parentToc) parentToc.classList.toggle('open', mobileTocDetails.open);
      });
      const closeMobileToc = () => {
        mobileTocDetails.open = false;
        if (parentToc) parentToc.classList.remove('open');
      };

      mobileTocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          closeMobileToc();
          const href = link.getAttribute('href');
          if (!href || !href.startsWith('#')) return;
          const targetId = href.slice(1);
          const targetEl = document.getElementById(targetId);
          if (!targetEl) return;

          isClickScrolling = true;
          setActiveLink(targetId, true);
          clearTimeout(clickTimeout);
          clickTimeout = setTimeout(() => {
            isClickScrolling = false;
          }, 1200);
        });
      });

      window.addEventListener('click', (e) => {
        if (!mobileTocDetails.contains(e.target)) {
          closeMobileToc();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileTocDetails.open) {
          closeMobileToc();
          mobileTocDetails.querySelector('summary')?.focus();
        }
      });
    }

    // Reset click lock when user manually scrolls
    function onManualScroll() {
      isClickScrolling = false;
      clearTimeout(clickTimeout);
    }
    window.addEventListener('wheel', onManualScroll, { passive: true });
    window.addEventListener('touchmove', onManualScroll, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        onManualScroll();
      }
    }, { passive: true });

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    window.addEventListener('resize', updateScrollSpy, { passive: true });
    updateScrollSpy();

    // Surface Tab Navigation & Contextual Markdown Binding
    function switchTab(tabTarget, pushState = true) {
      const activeBtn = document.querySelector('.rn-tab-btn[data-tab-target="' + tabTarget + '"]');
      if (!activeBtn) return;

      document.querySelectorAll('.rn-tab-btn').forEach(b => {
        const isTarget = b.dataset.tabTarget === tabTarget;
        b.classList.toggle('active', isTarget);
        b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });

      document.querySelectorAll('.tab-panel').forEach(panel => {
        const isTarget = panel.dataset.panelId === tabTarget;
        panel.classList.toggle('active', isTarget);
        panel.style.display = isTarget ? 'block' : 'none';
      });

      // Update visible TOC items
      document.querySelectorAll('#tocList li[data-tab]').forEach(li => {
        li.style.display = (li.dataset.tab === tabTarget) ? '' : 'none';
      });
      document.querySelectorAll('mobile-starlight-toc .dropdown li[data-tab]').forEach(li => {
        li.style.display = (li.dataset.tab === tabTarget) ? '' : 'none';
      });

      // Update rollout notice text from tab
      const rolloutSpan = document.getElementById('rolloutNoticeText');
      if (rolloutSpan && activeBtn.dataset.rolloutText) {
        rolloutSpan.textContent = activeBtn.dataset.rolloutText;
      }

      // Update Markdown dropdown items
      const mdFile = activeBtn.dataset.mdFile || 'changelog-extension.md';
      const viewMdLink = document.querySelector('[data-view-md-link]');
      if (viewMdLink) {
        viewMdLink.setAttribute('href', mdFile);
      }
      const copyMdBtn = document.querySelector('[data-copy-md]');
      if (copyMdBtn) {
        copyMdBtn.dataset.mdFile = mdFile;
      }

      if (pushState) {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tabTarget);
        history.replaceState(null, '', url.pathname + url.search + (url.hash || ''));
      }

      updateToggleAllBtn();
      if (typeof updateScrollSpy === 'function') {
        updateScrollSpy();
      }
    }

    document.querySelectorAll('.rn-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tabTarget, true);
      });
    });

    // Initial Tab Resolution from URL query or hash
    const initialParams = new URLSearchParams(window.location.search);
    let initialTab = initialParams.get('tab');
    if (!initialTab && window.location.hash) {
      if (window.location.hash.startsWith('#rel-patches-')) {
        initialTab = 'patches';
      } else if (window.location.hash.startsWith('#rel-ext-') || window.location.hash.startsWith('#rel-extension-')) {
        initialTab = 'extension';
      }
    }
    if (!initialTab || !document.querySelector('.rn-tab-btn[data-tab-target="' + initialTab + '"]')) {
      initialTab = 'extension';
    }
    switchTab(initialTab, false);

    // Changelog Subnav Link - authentic browser reload back to clean base URL
    const changelogNavBtn = document.querySelector('.subnav-right .subnav-pill.active');
    if (changelogNavBtn) {
      changelogNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.location.search || window.location.hash) {
          window.location.href = window.location.pathname;
        } else {
          window.location.reload();
        }
      });
    }

    // Legal Modals (Privacy & Terms)
    const modalPrivacy = document.getElementById('modalPrivacy');
    const modalTerms = document.getElementById('modalTerms');
    const btnPrivacy = document.getElementById('btnPrivacy');
    const btnTerms = document.getElementById('btnTerms');

    function openModal(modal) {
      if (!modal) return;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (btnPrivacy) btnPrivacy.addEventListener('click', (e) => { e.preventDefault(); openModal(modalPrivacy); });
    if (btnTerms) btnTerms.addEventListener('click', (e) => { e.preventDefault(); openModal(modalTerms); });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(modalPrivacy);
        closeModal(modalTerms);
      });
    });

    [modalPrivacy, modalTerms].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modalPrivacy);
        closeModal(modalTerms);
      }
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'docs', 'index.html'), fullHtml, 'utf8');

packagesWithData.forEach(pkg => {
  fs.writeFileSync(path.join(__dirname, 'docs', pkg.mdArtifact), pkg.rawMd, 'utf8');
});

console.log('Successfully re-generated docs/index.html (' + fullHtml.length + ' bytes)');
packagesWithData.forEach(pkg => {
  console.log(`- Emitted docs/${pkg.mdArtifact} (${pkg.rawMd.length} bytes)`);
});
