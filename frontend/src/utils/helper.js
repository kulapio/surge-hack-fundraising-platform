import bn from '@/utils/bn'
import { BIGNUMBER_ZERO } from '@/constants'

export const numberWithComma = function (value, format = 8) {
  try {
    if (typeof value === 'string' || typeof value === 'number') {
      value = bn(value)
    }
    if (!value || value.isZero()) return 0
    const stringNumber = value.toString()
    const numeralString = stringNumber.split('.')[0]
    if (value.isLessThan(bn('0.0000001'))) { // In case value less than 0.0000001 will show value without formatting.
      return value.toFormat()
    }
    const numOfDecimal = numeralString.length <= format ? format - numeralString.length : 0 // In case value more than 99,999,999 will show value without decimal.
    return value.toFormat(numOfDecimal)
  } catch (e) {
    return BIGNUMBER_ZERO.toFormat(format)
  }
}
