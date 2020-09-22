export default [
  {
    order: 0,
    key: 'UniversePage',
    component: 'Universes',
    question: 'In what universe is your movie played?',

    answer: 'You cannot go wrong with a good old {winner} movie',
    header: 'Story /<br /> Universes',
    keyword: 'universe',
  },
  {
    order: 1,
    key: 'GenrePage',
    component: 'Genres',
    question: 'What is the genre of your movie?',

    answer: 'You cannot go wrong with a good old {winner} movie',
    header: 'Story / <br/> Genres',
    keyword: 'genres',
    singleKeyword: 'genre_name',
    hasMany: true
  },
  {
    order: 2,
    key: 'OriginPage',
    component: 'Origins',
    question: 'Where does your story come from?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Story /<br /> Origin',
    keyword: 'story_origin',
  },
  {
    order: 3,
    key: 'SeriePage',
    component: 'Series',
    question: 'Is your movie part of a bigger story?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Story /<br /> Serie',
    keyword: 'serie',
  },
  {
    order: 4,
    key: 'LanguagePage',
    component: 'Languages',
    question: 'In what language should you tell the story?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Story /<br /> Language',
    keyword: 'languages',
    singleKeyword: 'language_name',
    hasMany: true
  },
  {
    order: 5,
    key: 'LeadActorGenderPage',
    component: 'LeadActorGenders',
    question: 'Who should your story resolve around?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Story /<br /> Lead Gender',
    keyword: 'characters',
    singleKeyword: 'gender',
    hasMany: true
  },
  {
    order: 6,
    key: 'LeadActorAgePage',
    component: 'LeadActorAges',
    question: 'Who should your story resolve around?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Story /<br /> Lead Age',
    keyword: 'characters',
    singleKeyword: 'age',
    hasMany: true
  },
  {
    order: 7,
    key: 'BudgetPage',
    component: 'Budgets',
    question: 'How much will you have to invest?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> Budget',
    keyword: 'budget'
  },
  {
    order: 8,
    key: 'DirectorGenderPage',
    component: 'DirectorGenders',
    question: 'Who should direct youre movie?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> Director Gender',
    keyword: 'directors',
    singleKeyword: 'gender',
    hasMany: true
  },
  {
    order: 9,
    key: 'DirectorAgePage',
    component: 'DirectorAges',
    question: 'Who should direct youre movie?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> Director Age',
    keyword: 'directors',
    singleKeyword: 'age',
    hasMany: true
  },
  {
    order: 10,
    key: 'CountryPage',
    component: 'Countries',
    question: 'Where should you produce the movie?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> country',
    keyword: 'producers',
    singleKeyword: 'country',
    hasMany: true
  },
  {
    order: 11,
    key: 'CinematographyPage',
    component: 'Cinematographies',
    question: 'Should your movie be live action or an animation?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> Cinematography',
    keyword: 'cinematography'
  },
  {
    order: 12,
    key: 'LengthPage',
    component: 'Lengths',
    question: 'How long should your movie be?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> Length',
    keyword: 'length'
  },
  {
    order: 13,
    key: 'WordCountPage',
    component: 'Words',
    question: 'How much dialogue should there be?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Production /<br /> Word Count',
    keyword: 'word_count',
    keywordFn: (movie) => Math.round(movie.word_count / movie.length)
  },
  {
    order: 14,
    key: 'ReleaseMonthPage',
    component: 'Months',
    question: 'When should you release your movie?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Release /<br /> Month',
    keyword: "release_date",
    keywordFn: (movie) => movie.release_date.split("-")[1]
  },
  {
    order: 15,
    key: 'DistributionCompaniesPage',
    component: 'DistributionCompanies',
    question: 'Who should be responsible for the distribution?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Release /<br /> Distribution Company',
    keyword: 'distribution_company'
  },
  {
    order: 16,
    key: 'RestrictionPage',
    component: 'Restrictions',
    question: 'Who is your audience?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Release /<br /> Restrictions',
    keyword: 'restrictions',
    singleKeyword: 'restriction_name',
    hasMany: true
  },
  {
    order: 17,
    key: 'PosterPage',
    component: 'Posters',
    question: 'How should the poster of the movie look?',
    answer: 'Lorem ipsum dolor sit amet',
    header: 'Release /<br /> Poster',
    keyword: 'poster',
    keywordFn: (movie) => movie.poster.poster_type ? movie.poster.poster_type.name : ""
  },
]
