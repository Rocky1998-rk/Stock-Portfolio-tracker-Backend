

import Holding from "../models/Holding.js";


//....................... GET All Holdings ....................
// ...........................Holding Controller.js.......................

export const getHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({ user: req.user._id });

    // Totals calculate Value....................
    const totalInvested = holdings.reduce((sum, h) => sum + h.gainLoss.invested, 0);
    const totalCurrent = holdings.reduce((sum, h) => sum + h.gainLoss.current, 0);
    const totalAbsolute = totalCurrent - totalInvested;
    const totalPercent = totalInvested ? (totalAbsolute / totalInvested) * 100 : 0;

    res.json({ holdings, totals: { totalInvested, totalCurrent, totalAbsolute, totalPercent }

    });
    
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


//....................... Create Add New Holdings ....................

export const addHolding = async (req, res) => {
  const { symbol, quantity, avgCost, currentPrice } = req.body;

  try {
    const holding = new Holding({
      user: req.user._id,
      symbol: symbol.toUpperCase(),
      quantity,
      avgCost,
      currentPrice,
    });
    await holding.save();
    res.status(201).json({message : "Create Successfully", data:holding});
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//....................... Update Holdings ....................

export const updateHolding = async (req, res) => {
  try {
    const holding = await Holding.findById(req.params.id);
    if (!holding) return res.status(404).json({ error: "Not found" });

    if (holding.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Forbidden" });

    Object.assign(holding, req.body);
    await holding.save();
    res.json(holding);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//....................... Delete Holdings ....................

export const deleteHolding = async (req, res) => {
  try {
    const holding = await Holding.findById(req.params.id);
    if (!holding) return res.status(404).json({ error: "Not found" });

    if (holding.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Forbidden" });

    await holding.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
