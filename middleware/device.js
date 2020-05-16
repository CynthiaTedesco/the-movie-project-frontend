export default function({ store }) {
  //TODO remove?
  store.dispatch(
    'setIsMobile',
    process.client ? window.matchMedia('(max-width: 768px)').matches : false
  )
}
