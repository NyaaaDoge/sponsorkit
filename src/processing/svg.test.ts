import { Buffer } from 'node:buffer'
import { describe, expect, it } from 'vitest'
import { genSvgImage } from './svg'

describe('genSvgImage', () => {
  it('uses unique clip paths for repeated images at different positions', () => {
    const image = Buffer.from('same-avatar').toString('base64')

    const first = genSvgImage(10, 20, 50, 0.5, image, 'webp')
    const second = genSvgImage(70, 20, 50, 0.5, image, 'webp')

    const firstId = first.match(/clipPath id="([^"]+)"/)?.[1]
    const secondId = second.match(/clipPath id="([^"]+)"/)?.[1]

    expect(firstId).toBeDefined()
    expect(secondId).toBeDefined()
    expect(firstId).not.toBe(secondId)
    expect(first).toContain(`clip-path="url(#${firstId})"`)
    expect(second).toContain(`clip-path="url(#${secondId})"`)
  })
})
