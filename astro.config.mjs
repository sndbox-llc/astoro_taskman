// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import sitemap from '@astrojs/sitemap'
import rehypeFigure from '@microflash/rehype-figure'
import starlightImageZoom from 'starlight-image-zoom'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightLinksValidator from 'starlight-links-validator'
import remarkGfm from 'remark-gfm'
import { unified } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'
import tailwindcss from '@tailwindcss/vite'
import starlightScrollToTop from 'starlight-scroll-to-top'

const isProd = process.env.NODE_ENV === 'production'

function remarkCustomHeadingId() {
  return (tree, file) => {
    // ファイルが .mdx かどうかを判定
    const isMdx = file.history[0]?.endsWith('.mdx')

    visit(tree, 'heading', (node) => {
      const lastChild = node.children[node.children.length - 1]
      if (lastChild && lastChild.type === 'text') {
        let match = null
        let id = null

        if (isMdx) {
          // 【MDX用】気難しいので [#id=xxx] だけを許可
          match = lastChild.value.match(/\s*\[#id=([\w-]+)\]$/)
          if (match) id = match[1]
        } else {
          // 【MD用】従来の {#xxx} と 新しい [#id=xxx] の両方を許可
          const mdMatch = lastChild.value.match(/\s*\{#([\w-]+)\}$|\s*\[#id=([\w-]+)\]$/)
          if (mdMatch) id = mdMatch[1] || mdMatch[2]
        }

        if (id) {
          node.data = node.data || {}
          node.data.hProperties = node.data.hProperties || {}
          node.data.hProperties.id = id

          // マッチした部分（{#xxx} または [#id=xxx]）を本文から消去
          lastChild.value = lastChild.value.replace(/\s*\{#[\w-]+\}$|\s*\[#id=[\w-]+\]$/, '')
        }
      }
    })
  }
}

export default defineConfig({
  site: 'https://lawmanager.hotaka-g.jp/',
  // プリフェッチ設定を有効化
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // 画面内に入ったら読み込み開始
  },
  image: {
    breakpoints: [500, 1000, 2000],
  },
  integrations: [
    starlight({
      title: 'LawManager',
      lastUpdated: true,
      favicon: '/images/favicon.png',
      head: [],

      components: {},
      customCss: ['./src/styles/main.scss', './src/styles/global.css'],
      plugins: [
        starlightScrollToTop({
          showOnHomepage: true,
          showProgressRing: true,
          showTooltip: true,
          tooltipText: {
            en: 'Scroll to top',
            ja: 'トップへ戻る',
          },
        }),

        starlightLinksValidator({
          exclude: ['/'],
        }),
        starlightImageZoom(), // 2. プラグインを追加
        starlightSidebarTopics([
          {
            label: 'お問い合わせ',
            icon: 'phone',
            link: 'docs/system/inquery',
            items: [],
          },
          {
            label: '操作ガイド',
            link: 'docs/setup',
            icon: 'document',
            items: [
              {
                label: '初期設定',
                items: [
                  // ここにサブアイテムを追加
                  { slug: 'docs/setup' },
                  { slug: 'docs/setup/tags' },

                  { slug: 'docs/setup/template' },
                ],
              },
              {
                label: 'タスク',
                items: [
                  //
                  { slug: 'docs/task' },
                  { slug: 'docs/task/create' },
                  { slug: 'docs/task/view' },
                  {
                    label: 'タスク登録',
                    items: [
                      //
                      { slug: 'docs/task/add/step1' },
                      { slug: 'docs/task/add/step2' },
                      { slug: 'docs/task/add/step3' },
                      { slug: 'docs/task/add/step4' },
                      { slug: 'docs/task/add/step5' },
                      { slug: 'docs/task/add/step6' },
                      { slug: 'docs/task/add/step7' },
                      { slug: 'docs/task/add/step8' },
                      { slug: 'docs/task/add/step9' },
                      { slug: 'docs/task/add/step10' },
                    ],
                  },
                  {
                    label: 'タスク編集',
                    items: [
                      //
                      { slug: 'docs/task/edit/step1' },
                      { slug: 'docs/task/edit/step2' },
                      { slug: 'docs/task/edit/step3' },
                      { slug: 'docs/task/edit/step4' },
                    ],
                  },
                ],
              },
              {
                label: '案件',
                items: [
                  //
                  { slug: 'docs/anken' },
                  { slug: 'docs/anken/make' },
                  { slug: 'docs/anken/view' },
                ],
              },
              {
                label: '関係者',
                items: [
                  //
                  { slug: 'docs/kankeisha' },
                  { slug: 'docs/kankeisha/make' },
                  { slug: 'docs/kankeisha/view' },
                ],
              },
              {
                label: 'カレンダー',
                items: [
                  //
                  { slug: 'docs/calendar' },
                  { slug: 'docs/calendar/week' },
                  { slug: 'docs/calendar/month' },
                  { slug: 'docs/calendar/user' },
                ],
              },
              {
                label: '裁判管理',
                items: [
                  //
                  { slug: 'docs/judge' },
                  { slug: 'docs/judge/make' },
                  { slug: 'docs/judge/view' },
                ],
              },
              {
                label: '詳細リファレンス',
                collapsed: true,

                items: [
                  //
                  { slug: 'docs/other/tablesettings' },
                  { slug: 'docs/other/status' },
                  { slug: 'docs/other/resp' },
                  { slug: 'docs/other/search' },
                  { slug: 'docs/other/account' },
                  { slug: 'docs/other/org' },
                  { slug: 'docs/other/notice' },
                  { slug: 'docs/other/files' },
                  { slug: 'docs/other/csv' },
                  { slug: 'docs/other/staffmanage' },
                ],
              },
              {
                label: 'システム概要',
                collapsed: true,

                items: [
                  //
                  { slug: 'docs/system/hard' },
                  { slug: 'docs/system/release-note' },
                  { slug: 'docs/system/security' },
                  { slug: 'docs/system/agree' },
                  { slug: 'docs/system/privacy' },
                  { slug: 'docs/system/tokutei' },
                  { slug: 'docs/system/price' },
                  { slug: 'docs/system/credit' },
                ],
              },
            ],
          },
          {
            label: '逆引き辞典',
            icon: 'phone',
            link: 'reverse-lookup',
            items: [
              //
              { slug: 'reverse-lookup/other/defaultgroup' },
              { slug: 'reverse-lookup/other/save' },
              { slug: 'reverse-lookup/other/cashclear' },
            ],
          },
        ]),
      ],
      locales: {
        root: {
          label: 'Japanese',
          lang: 'ja',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/sndbox-llc/astoro_taskman',
        },
      ],
    }),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkCustomHeadingId],
      rehypePlugins: [[rehypeFigure, { className: 'custom-figure' }]],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
