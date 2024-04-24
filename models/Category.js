const mongoose = require("mongoose");

const { Schema, models, model } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  properties: {
    type: [Object],
  },
});

export const Category = models?.Category || model("Category", CategorySchema);
