const Job = require("../models/Wishlist");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllItems = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "got all items" });
};
const getItem = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "got the items" });
};
const createItem = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "created the item" });
};
const updateItem = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "updated the item" });
};
const deleteItem = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "deleted the item" });
};

module.exports = {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
  getItem,
};
