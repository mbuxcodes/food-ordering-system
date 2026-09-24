import { Schema, model, type InferSchemaType } from "mongoose";

const orderItemSchema = new Schema(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const orderDeliveryAddressSchema = new Schema(
  {
    recipientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    addressLine: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    area: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    deliveryInstructions: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    _id: false,
  },
);

const orderPricingSchema = new Schema(
  {
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const orderPaymentSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["COD"],
      required: true,
      default: "COD",
    },

    status: {
      type: String,
      enum: ["PENDING", "CASH_COLLECTED", "PAID"],
      required: true,
      default: "PENDING",
    },

    cashCollectedAt: {
      type: Date,
      default: null,
    },

    cashCollectedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    _id: false,
  },
);

const orderCancellationSchema = new Schema(
  {
    cancelledAt: {
      type: Date,
      default: null,
    },

    cancelledBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items: unknown[]) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    deliveryAddress: {
      type: orderDeliveryAddressSchema,
      required: true,
    },

    pricing: {
      type: orderPricingSchema,
      required: true,
    },

    payment: {
      type: orderPaymentSchema,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "ASSIGNED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      required: true,
      default: "PLACED",
    },

    cancellation: {
      type: orderCancellationSchema,
      default: null,
    },

    placedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    confirmedAt: {
      type: Date,
      default: null,
    },

    preparingAt: {
      type: Date,
      default: null,
    },

    readyAt: {
      type: Date,
      default: null,
    },

    assignedAt: {
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

orderSchema.index({
  customerId: 1,
  createdAt: -1,
});

orderSchema.index({
  status: 1,
  createdAt: 1,
});

export type OrderItem = InferSchemaType<typeof orderItemSchema>;

export type OrderDeliveryAddress = InferSchemaType<
  typeof orderDeliveryAddressSchema
>;

export type OrderPricing = InferSchemaType<typeof orderPricingSchema>;

export type OrderPayment = InferSchemaType<typeof orderPaymentSchema>;

export type OrderCancellation = InferSchemaType<typeof orderCancellationSchema>;

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model<Order>("Order", orderSchema);
