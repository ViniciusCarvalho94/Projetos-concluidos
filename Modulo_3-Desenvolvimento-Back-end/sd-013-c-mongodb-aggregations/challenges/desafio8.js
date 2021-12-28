db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$airline.name", "$$airline_name"] },
              ],
            },
          },
        },
      ],
      as: "airlines_filtered",
    },
  },
  { $unwind: "$airlines_filtered" },
  {
    $match: {
      "airlines_filtered.airplane": { $in: ["380", "747"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
