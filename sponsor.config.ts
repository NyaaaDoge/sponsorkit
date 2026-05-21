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
    const visibleSponsors = sponsors
      .sort((a, b) => getAmount(b) - getAmount(a))

    composer.addSpan(20)

    if (visibleSponsors.length) {
      composer
        .addTitle('赞助者')
        .addSpan(10)

      await composer.addSponsorGrid(visibleSponsors, tierPresets.medium)
    }

    composer.addSpan(20)
  },
})

function getAmount(sponsor: any) {
  const amount = Number(sponsor.monthlyDollars)
  if (Number.isFinite(amount) && amount > 0)
    return amount

  const total = Number.parseFloat(sponsor.raw?.all_sum_amount)
  if (Number.isFinite(total))
    return total

  return 0
}
