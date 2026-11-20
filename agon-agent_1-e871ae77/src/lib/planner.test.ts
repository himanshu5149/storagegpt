import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { calculatePlan, type Game } from './planner.ts'
const game = (id: string, size: number, keep = false): Game => ({ id, name: id, size, keep })
describe('calculatePlan', () => {
  it('needs no deletions when enough space exists', () => { const p = calculatePlan([game('a', 60)], 220, 212, 8, 'fewest'); assert.equal(p.enough, true); assert.deepEqual(p.selected, []); assert.equal(p.needed, 0) })
  it('selects one game when sufficient', () => { const p = calculatePlan([game('a', 150), game('b', 20)], 100, 212, 10, 'fewest'); assert.deepEqual(p.selected.map(g => g.id), ['a']); assert.equal(p.freed, 150) })
  it('selects multiple games and can minimize excess', () => { const games = [game('a', 100), game('b', 80), game('c', 60)]; const p = calculatePlan(games, 72, 212, 10, 'fewest'); assert.deepEqual(p.selected.map(g => g.id), ['a', 'c']); assert.equal(p.freed, 160); assert.equal(calculatePlan(games, 72, 212, 10, 'largest').freed, 180) })
  it('never selects Keep games', () => { const p = calculatePlan([game('a', 300, true), game('b', 50)], 0, 212, 10, 'fewest'); assert.equal(p.possible, false); assert.deepEqual(p.selected, []) })
  it('reports an impossible plan when library is too small', () => { const p = calculatePlan([game('a', 15), game('b', 20)], 50, 212, 10, 'largest'); assert.equal(p.possible, false); assert.equal(p.available, 35) })
})
