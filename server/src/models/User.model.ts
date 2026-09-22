import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 30,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["CUSTOMER", "STAFF", "RIDER", "ADMIN"],
      required: true,
      default: "CUSTOMER",
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.index({ isActive: 1, createdAt: -1 });

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>("User", userSchema);
