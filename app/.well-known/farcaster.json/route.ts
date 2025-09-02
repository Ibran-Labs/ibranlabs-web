function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    accountAssociation: {
      header: "eyJmaWQiOjEzMTg0NDcsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMjMxODU5MTJiMEE3OTEyMzM3M2U3MTgyNDQ5ZjgyZjdiMDVkOTlGIn0",
      payload: "eyJkb21haW4iOiJpYnJhbi1maW5hbmNlLnZlcmNlbC5hcHAifQ",
      signature: "MHg0MjM5MjM1NDdmYzk1MjIyYTM2MTNmZjQ1NjQzNzg3OTQ4YWViOTEzMGMxMjdiMzE3ZTZjYzQxM2NlNGMzMjI1MGM1NTU2YWYxNmRkNDdjOTBlMzQ2ZjI2MmY2OWZkMmQzNzUwZmFhNzc3MmVhMWI3NDcyMGQ5OWFmZDc3ODc1MzFi",
    },
  "frame": {
    "name": "ibranlabs-mini-apps",
    "homeUrl": "https://ibran-finance.vercel.app",
    "iconUrl": "https://ibran-finance.vercel.app/ibran.png",
    "version": "1",
    "imageUrl": "https://ibran-finance.vercel.app/ibran.png",
    "subtitle": "ibran",
    "webhookUrl": "https://ibran-finance.vercel.app/api/webhook",
    "description": "ibran",
    "splashImageUrl": "https://ibran-finance.vercel.app/ibran.png",
    "primaryCategory": "finance",
    "splashBackgroundColor": "#000000",
  },

    baseBuilder: {
      allowedAddresses: ["0xDCde6D1373e56a262DD06bf37572562D055d9888"],
    },
  });
}
