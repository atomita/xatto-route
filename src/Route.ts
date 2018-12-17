import { x } from 'xatto'

export function Route({ xa: { context, extra }, ...props }: any, children) {
  const location = props.location || context.location || extra.location || document.location || window.location

  let flags = props.flags || ''
  let pattern: RegExp | string | undefined = props.pattern

  if (null == pattern) {
    pattern = ''
  } else if (pattern instanceof RegExp) {
    flags = flags || (pattern as any).flags || ''
    pattern = pattern.source
  }

  pattern = pattern[0] === '^' ? pattern.slice(1) : pattern
  pattern = pattern[0] === '/' ? pattern.slice(1) : pattern
  pattern = new RegExp(`^/${pattern}`)

  const match: any = pattern.exec(location.pathname)

  if (!match) {
    return false
  }

  const route = {
    location,
    match,
    params: match.groups || {},
    path: match[0],
    pattern,
  }

  return x(x, {}, children.map(child => {
    child.props.route = route
    return child
  }))
}
