import bignumber from 'bignumber.js'

export default function (number) {
  let context = bignumber(number)
  context = Object.assign(context, {
    toBase (decimal = 18) {
      const humanNumber = context.dividedBy(this.baseInWei(decimal))
      return Object.assign(bignumber(context), humanNumber)
    },
    toWei (decimal = 18) {
      const amount = context.multipliedBy(this.baseInWei(decimal))
      return Object.assign(bignumber(context), amount)
    },
    gweiToWei () {
      const b = bignumber('10').pow(9)
      const amount = context.multipliedBy(b)
      return Object.assign(bignumber(context), amount)
    },
    baseInWei (decimal) {
      return bignumber(10).exponentiatedBy(decimal)
    }
  })
  return context
}
