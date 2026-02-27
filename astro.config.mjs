// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import sitemap from '@astrojs/sitemap'
import rehypeFigure from 'rehype-figure'
import starlightImageZoom from 'starlight-image-zoom'
import remarkHeadingId from 'remark-heading-id'
import starlightSidebarTopics from 'starlight-sidebar-topics'
import starlightLinksValidator from 'starlight-links-validator'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  site: 'https://lawmanager.hotaka-g.jp/',
  // プリフェッチ設定を有効化
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // 画面内に入ったら読み込み開始
  },
  image: {
    breakpoints: [1000, 2000],
  },
  integrations: [
    starlight({
      title: 'LawManager',
      // ... その他の設定
      favicon: '/images/favicon.svg',
      head: [],

      components: {
        // Head: './src/components/CustomHeader.astro',
        // Footer: './src/components/CustomFooter.astro',
        // Banner: './src/components/LegacyNotice.astro',
        // Pagination: './src/components/CustomPagination.astro',
        // SiteTitle: './src/components/CustomSiteTitle.astro',
      },
      customCss: [
        './src/styles/main.scss', // ここにSCSSファイルを指定
      ],
      plugins: [
        starlightLinksValidator(),
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
    // ここに remarkPlugins を追加
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [[rehypeFigure, { className: 'custom-figure' }]],
  },
})
