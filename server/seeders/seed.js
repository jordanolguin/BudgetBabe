const db = require("../config/connection");
const { User, MonthlyRecord } = require("../models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await MonthlyRecord.deleteMany({});

    await User.create(userSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("seeding done! 🌱");
  process.exit(0);
});
