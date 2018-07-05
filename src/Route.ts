export function Route({ xa: { context, extra }, ...attrs }, children) {
  const location = attrs.location || context.location || extra.location || window.location

  let flags = attrs.flags || null
  let pattern: RegExp | string | undefined = attrs.pattern

  if (null == pattern) {
    pattern = ''
  } else if (pattern instanceof RegExp) {
    flags = flags || (pattern as any).flags || null
    pattern = pattern.source
  }

  pattern = pattern[0] === '^' ? pattern.slice(1) : pattern
  pattern = pattern[0] === '/' ? pattern.slice(1) : pattern
  pattern = new RegExp(`^/${pattern}`, flags)

  const match: any = pattern.exec(location.pathname)

  const child = children[0]

  return match && {
    ...child,
    attributes: {
      ...child.attributes,
      route: {
        location,
        match,
        params: match.groups || {},
        path: match[0],
        pattern,
      }
    }
  }
}
