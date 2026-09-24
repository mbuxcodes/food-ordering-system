import { Schema, model, type InferSchemaType } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    image: {
      type: String,
      trim: true,
      maxlength: 2048,
    },

    sortOrder: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

categorySchema.index({ isActive: 1, sortOrder: 1 });

export type Category = InferSchemaType<typeof categorySchema>;

export const CategoryModel = model<Category>("Category", categorySchema);
