// @ts-ignore
class ResizeObserverStub {
  observe () { }
  unobserve () { }
  disconnect () { }
}
window.ResizeObserver ??= ResizeObserverStub

