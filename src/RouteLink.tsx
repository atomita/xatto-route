import { x, currentOnly } from 'xatto'
import { VNode } from 'xatto/src/VNode'

function getOrigin(loc, location) {
  const protocol = (loc.protocol && ':' !== loc.protocol) ? loc.protocol : location.protocol
  const host = [loc.hostname, loc.port].filter(Boolean).join(":")
    || [location.hostname, location.port].filter(Boolean).join(":")
  return protocol + "//" + host
}

export function RouteLink({ xa: { extra }, ...props }: any, children) {
  return (
    <a
      {...props}

      onclick={onClick}
      tier={props}
    >
      {children}
    </a>
  ) as VNode
}

function onClick(context, detail, props, event) {
  const newContext = onClickMain(context, detail, props, event)

  if (props.tier.onclick) {
    return props.tier.onclick(context, detail, props, event) || newContext
  }

  return newContext
}

function onClickMain (context, detail, props, event) {
  if (!event.defaultPrevented
    && event.button === 0
    && !event.altKey
    && !event.metaKey
    && !event.ctrlKey
    && !event.shiftKey
    && props.target !== "_blank") {

    const location = props.location || context.location || props.xa.extra.location || window.location
    if (getOrigin(location, location) === getOrigin(event.currentTarget, location)) {
      event.preventDefault()

      const href = props.href
      const pathname = location.pathname
      if (href !== pathname) {
        history.pushState(pathname, "", href)

        return {}  // mutate
      }
    }
  }
}
