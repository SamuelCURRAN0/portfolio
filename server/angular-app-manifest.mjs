
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 18344, hash: '8fb8e3c170d4880eea20848bc048e08d3858d45a2ac69037390a78e41de3b277', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14115, hash: '4be8bfda5dfc4181ce52a99e48df2f02ad7c01a2bb9b7dbd80a91179bb1b6cc6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'main-IIO3AIVH.css': {size: 26054, hash: '3KMEVki9tus', text: () => import('./assets-chunks/main-IIO3AIVH_css.mjs').then(m => m.default)},
    'main.server.css': {size: 26054, hash: '3KMEVki9tus', text: () => import('./assets-chunks/main_server_css.mjs').then(m => m.default)},
    'server.css': {size: 26054, hash: '3KMEVki9tus', text: () => import('./assets-chunks/server_css.mjs').then(m => m.default)},
    'styles-2ZVZLMDR.css': {size: 258894, hash: 'xCtjyrllikM', text: () => import('./assets-chunks/styles-2ZVZLMDR_css.mjs').then(m => m.default)}
  },
};
