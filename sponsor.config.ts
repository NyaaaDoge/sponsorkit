import { defineConfig, tierPresets } from 'sponsorkit'

export default defineConfig({
  providers: ['afdian'],

  afdian: {
    exchangeRate: 1,
  },

  outputDir: './sponsorkit',
  width: 800,
  formats: ['json', 'svg', 'png'],

  tiers: [
    {
      title: '历史赞助者',
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    {
      title: '赞助者',
      preset: tierPresets.base,
    },
    {
      title: '30 元以上',
      monthlyDollars: 30,
      preset: tierPresets.medium,
    },
    {
      title: '50 元以上',
      monthlyDollars: 50,
      preset: tierPresets.large,
    },
    {
      title: '100 元以上',
      monthlyDollars: 100,
      preset: tierPresets.xl,
    },
  ],
})
