db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      number_films: { $sum: 1 },
      avg_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: "$_id",
      numeroFilmes: "$number_films",
      mediaIMDB: { $round: ["$avg_rating", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
