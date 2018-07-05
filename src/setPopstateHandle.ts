export function setPopstateHandle(mutate: Function) {
  const handle = (e) => {
    mutate()
  }

  addEventListener('popstate', handle)

  return () => {
    removeEventListener('popstate', handle)
  }
}
