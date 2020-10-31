export default async function({ store }) {
  console.log('movies middleware!');
  await store.dispatch('checkMovies');
  store.dispatch('setResults');
}
