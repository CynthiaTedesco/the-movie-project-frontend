export default function({ store }) {
  // TODO fix this, not working!!
  store.dispatch(
    'setIsMobile',
    process.client ? window.matchMedia('(min-width: 1000px)') : false
  );
}
