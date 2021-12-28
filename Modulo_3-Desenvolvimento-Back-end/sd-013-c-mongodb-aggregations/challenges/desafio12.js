db.trips.aggregate([
  {
    $group: {
      _id: {
        weekDay: { $dayOfWeek: "$startTime" },
        station: "$startStationName",
      },
      totalTrips: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$totalTrips",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
