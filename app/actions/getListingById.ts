import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function getListingById({ listingId }: IParams) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },

      include: {
        user: true,
      },
    });

    if (!listing) return null;

    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
