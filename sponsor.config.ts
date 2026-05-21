import { defineConfig, tierPresets } from 'sponsorkit'

export default defineConfig({
  providers: ['afdian'],

  afdian: {
    exchangeRate: 1,
  },

  outputDir: './sponsorkit',
  width: 800,
  formats: ['json', 'svg', 'png'],
  includePastSponsors: true,

  customComposer: async (composer, sponsors) => {
    const activeSponsors = sponsors
      .filter(sponsor => sponsor.monthlyDollars > 0)
      .sort((a, b) => b.monthlyDollars - a.monthlyDollars)

    const pastSponsors = sponsors
      .filter(sponsor => sponsor.monthlyDollars <= 0)
      .sort((a, b) => Date.parse(b.createdAt || '') - Date.parse(a.createdAt || ''))

    composer.addSpan(20)

    if (activeSponsors.length) {
      composer
        .addTitle('赞助者')
        .addSpan(10)

      await composer.addSponsorGrid(activeSponsors, tierPresets.medium)
    }

    if (pastSponsors.length) {
      composer
        .addSpan(20)
        .addTitle('历史赞助者')
        .addSpan(10)

      await composer.addSponsorGrid(pastSponsors, tierPresets.xs)
    }

    composer.addSpan(20)
  },
})
