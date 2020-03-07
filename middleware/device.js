export default function({ store }) {
  store.dispatch(
    'setIsMobile',
    process.client ? window.matchMedia('(max-width: 768px)').matches : false
  )
}
