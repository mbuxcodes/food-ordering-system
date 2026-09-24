import { Schema, model, type InferSchemaType } from "mongoose";

const cartItemSchema = new Schema(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type CartItem = InferSchemaType<typeof cartItemSchema>;

export type Cart = InferSchemaType<typeof cartSchema>;

export const CartModel = model<Cart>("Cart", cartSchema);