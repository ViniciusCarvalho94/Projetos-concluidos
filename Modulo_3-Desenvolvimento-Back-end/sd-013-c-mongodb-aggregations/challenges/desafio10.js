db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      averageTime: {
        $avg: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "hour",
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$averageTime", 2],
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
