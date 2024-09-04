export function isEmpty(t) {
  if (t === null || t === undefined || t === '') {
    return true
  }

  if (Array.isArray(t) && t.length === 0) return true

  if (typeof t === 'object' && Object.keys(t).length === 0) return true
}
