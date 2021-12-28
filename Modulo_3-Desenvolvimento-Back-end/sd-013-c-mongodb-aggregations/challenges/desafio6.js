db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /(Won)\s\d\s(Oscar)/i,
      },
    },
  },
  {
    $group: {
      _id: null,
      max_rating: { $max: "$imdb.rating" },
      min_rating: { $min: "$imdb.rating" },
      avg_rating: { $avg: "$imdb.rating" },
      dev_rating: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$max_rating",
      menor_rating: "$min_rating",
      media_rating: { $round: ["$avg_rating", 1] },
      desvio_padrao: { $round: ["$dev_rating", 1] },
    },
  },
]);
