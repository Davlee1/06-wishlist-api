const Wishlist = require("../models/wishlist.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllItems = async (req, res) => {
  const items = await Wishlist.find({ createdBy: req.user.userId }).sort(
    "createdAt",
  );
  res.status(StatusCodes.OK).json({ items, count: items.length });
};
const getItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await Wishlist.findOne({
    _id: itemId,
    createdBy: userId,
  });

  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }

  res.status(StatusCodes.OK).json({ item });
};

const createItem = async (req, res) => {

  const item = await Wishlist.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ item });
};
const updateItem = async (req, res) => {
  const {
    body: { item, imageURL, link, description, priority },
    user: { userId },
    params: { id: itemId },
  } = req;

  if (item === "") {
    throw new BadRequestError("Item field cannot be empty");
  }

const update = await Wishlist.findOneAndUpdate(
  { _id: itemId, createdBy: userId },
  req.body,
  { new: true, runValidators: true }
);

  if (!update) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }

  res.status(StatusCodes.OK).json({ update });
};
const deleteItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await Wishlist.findOneAndRemove({ _id: itemId, createdBy: userId });
  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ message: "deleted the item" });
};

module.exports = {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
  getItem,
};
