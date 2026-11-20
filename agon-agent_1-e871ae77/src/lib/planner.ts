export type Game = { id: string; name: string; size: number; keep: boolean }
export type PlanMode = 'fewest' | 'largest'
export type Plan = { needed: number; available: number; selected: Game[]; freed: number; enough: boolean; possible: boolean }
const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100

export function calculatePlan(games: Game[], free: number, target: number, buffer: number, mode: PlanMode): Plan {
  const needed = round(Math.max(0, target + buffer - free))
  const eligible = games.filter(g => !g.keep && Number.isFinite(g.size) && g.size > 0).sort((a, b) => b.size - a.size || a.id.localeCompare(b.id))
  const available = round(eligible.reduce((sum, g) => sum + g.size, 0))
  if (needed === 0) return { needed, available, selected: [], freed: 0, enough: true, possible: true }
  if (available + 0.000001 < needed) return { needed, available, selected: [], freed: 0, enough: false, possible: false }
  const greedy: Game[] = []
  let sum = 0
  for (const game of eligible) { greedy.push(game); sum += game.size; if (sum + 0.000001 >= needed) break }
  if (mode === 'largest' || eligible.length > 24) return { needed, available, selected: greedy, freed: round(sum), enough: false, possible: true }
  // The largest-first prefix proves the minimum possible number of deletions.
  // For small libraries, find the tightest total among subsets of that cardinality.
  const count = greedy.length
  let best = greedy, bestSum = sum
  function search(start: number, chosen: Game[], total: number): void {
    const missing = count - chosen.length
    if (!missing) { if (total + 0.000001 >= needed && total < bestSum - 0.000001) { best = [...chosen]; bestSum = total } return }
    if (eligible.length - start < missing || total >= bestSum) return
    for (let i = start; i <= eligible.length - missing; i++) {
      if (total + eligible.slice(i, i + missing).reduce((n, g) => n + g.size, 0) + 0.000001 < needed) break
      search(i + 1, [...chosen, eligible[i]], total + eligible[i].size)
    }
  }
  search(0, [], 0)
  return { needed, available, selected: best, freed: round(bestSum), enough: false, possible: true }
}
