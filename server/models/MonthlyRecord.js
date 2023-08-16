const { Schema, model } = require("mongoose");

const monthlyRecordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  incomeStreams: [
    {
      source: String,
      amount: Number,
    },
  ],
  expenses: [
    {
      description: String,
      amount: Number,
    },
  ],
  totalIncome: Number,
  totalExpense: Number,
  savings: Number,
});

const MonthlyRecord = model("MonthlyRecord", monthlyRecordSchema);

module.exports = MonthlyRecord;
