export default function() {// :((((
  const NODELIST_FOREACH_NOT_SUPPORTED = !window.NodeList.prototype.forEach
  const PROMISE_NOT_EXIST = !window.Promise
  const NOT_USING_WINDOW_SCROLLY = (window.scrollY===undefined)
  return !(NODELIST_FOREACH_NOT_SUPPORTED||PROMISE_NOT_EXIST||NOT_USING_WINDOW_SCROLLY)
}
