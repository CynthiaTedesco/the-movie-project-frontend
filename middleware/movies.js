export default function({ store }) {
  console.log('middleware!');
  store.dispatch('checkMovies');
}
