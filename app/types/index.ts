import { Listing, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null | undefined;
};

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
