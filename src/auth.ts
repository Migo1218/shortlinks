import { Lucia } from "lucia";
import { adapter } from "./db/adapter";

interface UserAttributes {
  username: string;
  github_id: string;
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes: UserAttributes) => {
    return {
      username: attributes.username
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
