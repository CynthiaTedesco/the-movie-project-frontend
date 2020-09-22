export default async function({ store }) {
  console.log('middleware!');
  await store.dispatch('checkMovies');
  store.dispatch('setResults');
}
