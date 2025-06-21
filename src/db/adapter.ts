import mongoose from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

await mongoose.connect(
  "mongodb+srv://shortilink:KDR4DE9C@cluster0.i3vhxiw.mongodb.net/?appName=linkishort",
  {
    dbName: "linkishort",
  }
);

const LinkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    short_id: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: String,
    },
    qr: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
    },
  } as const,
  { _id: false }
);

const SessionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  { _id: false }
);

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

export const Link =
  mongoose.model["Link"] || mongoose.model("Link", LinkSchema);

export const User =
  mongoose.model["User"] || mongoose.model("User", UserSchema);

export const Session =
  mongoose.model["Session"] || mongoose.model("Session", SessionSchema);
