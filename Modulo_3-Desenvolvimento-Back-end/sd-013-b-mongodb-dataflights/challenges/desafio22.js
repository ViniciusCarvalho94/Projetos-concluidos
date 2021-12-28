db.voos.findOne({ $or: [
    { "empresa.name": { $in: ["DELTA AIRLINES", "AMERICAN AIRLINES"] } },
    { $and: [{ "aeroportoOrigem.sigla": "SBGR" }, { "aeroportoDestino.sigla": "KJFK" }] },
] }, 
{ _id: 0, vooId: 1 });