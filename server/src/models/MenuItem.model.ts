import { Schema, model, type InferSchemaType } from "mongoose";

const menuItemSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      trim: true,
      maxlength: 2048,
    },

    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    sortOrder: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

menuItemSchema.index({
  categoryId: 1,
  isActive: 1,
  sortOrder: 1,
});

export type MenuItem = InferSchemaType<typeof menuItemSchema>;

export const MenuItemModel = model<MenuItem>("MenuItem", menuItemSchema);