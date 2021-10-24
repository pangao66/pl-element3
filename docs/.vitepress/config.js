const path = require('path')
const { resolve } = require('path');
module.exports = {
  lang: 'en-US',
  title: 'VitePress',
  description: 'Vite & Vue powered static site generator.',
  markdown: {
    lineNumbers: true,
  },
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ['src'],
  alias: {
    // 为了能在demo中正确的使用  import { X } from 'pl-element3'
    [`pl-element3`]: resolve('./packages'),
  },
  themeConfig: {
    repo: 'pangao66/pl-element3',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    // algolia: {
    //   apiKey: 'c57105e511faa5558547599f120ceeba',
    //   indexName: 'vitepress'
    // },
    //
    // carbonAds: {
    //   carbon: 'CEBDT27Y',
    //   custom: 'CKYD62QM',
    //   placement: 'vuejsorg'
    // },

    nav: [
      { text: '介绍', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Config Reference',
        link: '/config/basics',
        activeMatch: '^/config/',
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/vuejs/vitepress/releases',
      },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/': getGuideSidebar(),
    },
  },
}

function getGuideSidebar() {
  return [
    {
      text: '介绍',
      children: [
        { text: 'pl-element是什么', link: '/' },
        { text: 'button', link: '/guide/button' },
        { text: 'input', link: '/guide/input' },
        { text: 'select', link: '/guide/select' },
        { text: 'date', link: '/guide/date' },
        { text: 'form', link: '/guide/form' },
        { text: 'table', link: '/guide/table' },
      ],
    },
    {
      text: 'Advanced',
      children: [],
    },
  ]
}

