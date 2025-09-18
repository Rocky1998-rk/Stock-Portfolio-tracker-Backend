import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    avgCost: {
      type: Number,
      required: true,
      min: 0,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { 
    timestamps: true ,
    toJSON: { virtuals: true },   
    toObject: { virtuals: true }
  },
   
);

// virtual field → Gain/Loss calculate

holdingSchema.virtual("gainLoss").get(function () {
  const invested = this.avgCost * this.quantity;
  const current = this.currentPrice * this.quantity;
  return {
    invested,
    current,
    absolute: current - invested,
    percent: invested ? ((current - invested) / invested) * 100 : 0,
  };
});

const Holding = mongoose.model("Holding", holdingSchema);
export default Holding;
