const mongoose = require("mongoose");

// Table Columns Schema
const ColumnSchema = mongoose.Schema({
  colName: { type: String, required: true },
  data: [{ type: String, required: true }], // Array of data entries for the column
});

// Table Schema
const TableSchema = mongoose.Schema({
  tableName: { type: String, required: true },
  columns: [ColumnSchema] // Array of column objects
});

// Graph Nodes Schema
const NodeSchema = mongoose.Schema({
  label: { type: String, required: true },
  data: { type: String, required: true },
  connections: [{ type: String }] // Array of node labels this node connects to
});

// Graph Schema
const GraphSchema = mongoose.Schema({
  graphName: { type: String, required: true },
  graphType: { type: String, required: true },
  nodes: [NodeSchema] // Array of nodes within the graph
});

// Main Topic Schema
const TopicSchema = mongoose.Schema({
  topicName: { type: String, required: true },
  transcript: { type: String, required: true },
  notes: [{ type: String, required: true, minlength: 1 }], // At least one note is required
  tables: { type: [TableSchema], default: [] }, // Optional array of table objects, default to an empty array
  graphs: { type: [GraphSchema], default: [] } // Optional array of graph objects, default to an empty array
});

module.exports = mongoose.model("Topic", TopicSchema);
