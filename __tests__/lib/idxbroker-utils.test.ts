import { idxbrokerUtils } from '@/lib/idxbroker-api'

describe('idxbrokerUtils', () => {
  describe('formatPrice', () => {
    it('formats price with dollar sign and commas', () => {
      expect(idxbrokerUtils.formatPrice(100000)).toBe('$100,000')
      expect(idxbrokerUtils.formatPrice(1234567)).toBe('$1,234,567')
      expect(idxbrokerUtils.formatPrice(500000)).toBe('$500,000')
    })

    it('handles zero price', () => {
      expect(idxbrokerUtils.formatPrice(0)).toBe('$0')
    })

    it('handles very large prices', () => {
      expect(idxbrokerUtils.formatPrice(10000000)).toBe('$10,000,000')
    })

    it('rounds decimal prices to whole numbers', () => {
      // formatPrice uses maximumFractionDigits: 0, so it rounds decimals
      expect(idxbrokerUtils.formatPrice(100000.50)).toBe('$100,001')
      expect(idxbrokerUtils.formatPrice(100000.49)).toBe('$100,000')
    })
  })
})

