import { Schema, model, type InferSchemaType } from "mongoose";

const deliverySchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    riderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    assignedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    pickedUpAt: {
      type: Date,
      default: null,
    },

    outForDeliveryAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    deliveryNote: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

deliverySchema.index({
  riderId: 1,
  createdAt: -1,
});

export type Delivery = InferSchemaType<typeof deliverySchema>;

export const DeliveryModel = model<Delivery>("Delivery", deliverySchema);