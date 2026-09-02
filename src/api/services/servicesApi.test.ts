import { describe, it, expect, afterEach } from 'vitest'
import { getService, listServices } from './servicesApi'
import { ApiRequestError } from '../../types/api'
import { setServerErrorChance } from '../mock/utils'

afterEach(() => {
  setServerErrorChance(0)
})

describe('servicesApi.listServices', () => {
  it('returns all services when no filters are applied', async () => {
    const result = await listServices({ pageSize: 500 })
    expect(result.items.length).toBeGreaterThan(0)
    expect(result.total).toBe(result.items.length)
  })

  it('filters by search term (service list success path)', async () => {
    const q = 'massage'
    const result = await listServices({ search: q })
    // The contract matches against name OR description, so assert the
    // filter contract rather than the shape of any single fixture.
    expect(result.items.length).toBeGreaterThan(0)
    expect(
      result.items.every(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      ),
    ).toBe(true)
  })

  it('returns an empty result set for a search with no matches', async () => {
    const result = await listServices({ search: 'zzz-no-match-zzz' })
    expect(result.items).toEqual([])
    expect(result.total).toBe(0)
  })
})

describe('servicesApi.getService', () => {
  it('returns the service for a valid id', async () => {
    const service = await getService('svc-1')
    expect(service.id).toBe('svc-1')
  })

  it('throws an ApiRequestError with NOT_FOUND for an unknown id (service list/detail error path)', async () => {
    await expect(getService('does-not-exist')).rejects.toBeInstanceOf(ApiRequestError)
    try {
      await getService('does-not-exist')
    } catch (err) {
      expect((err as ApiRequestError).code).toBe('NOT_FOUND')
    }
  })

  it('throws a SERVER_ERROR when server error simulation is enabled', async () => {
    setServerErrorChance(1)
    await expect(listServices()).rejects.toMatchObject({ code: 'SERVER_ERROR' })
  })
})
