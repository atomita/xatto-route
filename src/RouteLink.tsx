import { x } from 'xatto'

function getOrigin(loc, location) {
  const protocol = (loc.protocol && ':' !== loc.protocol) ? loc.protocol : location.protocol
  const host = [loc.hostname, loc.port].filter(Boolean).join(":")
    || [location.hostname, location.port].filter(Boolean).join(":")
  return protocol + "//" + host
}

export function RouteLink({ xa: { extra }, ...attrs }, children) {
  const href = attrs.href
  const onclick = attrs.onclick

  attrs.onclick = (e, ctx, ext) => {
    if (onclick) {
      onclick(e, ctx, ext)
    }

    if (!e.defaultPrevented
      && e.button === 0
      && !e.altKey
      && !e.metaKey
      && !e.ctrlKey
      && !e.shiftKey
      && attrs.target !== "_blank") {

      return (mutate, context) => {
        const location = attrs.location || context.location || extra.location || window.location

        if (getOrigin(location, location) === getOrigin(e.currentTarget, location)) {
          e.preventDefault()

          const pathname = location.pathname
          if (href !== pathname) {
            history.pushState(pathname, "", href)

            mutate()
          }
        }
      }
    }
  }

  return (
    <a {...attrs}>
      {children}
    </a>
  )
}
