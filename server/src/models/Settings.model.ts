import { Schema, model, type InferSchemaType } from "mongoose";

const settingsSchema = new Schema(
  {
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 3,
      maxlength: 3,
      default: "PKR",
    },

    timezone: {
      type: String,
      required: true,
      trim: true,
      default: "Asia/Karachi",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Settings = InferSchemaType<typeof settingsSchema>;

export const SettingsModel = model<Settings>("Settings", settingsSchema);