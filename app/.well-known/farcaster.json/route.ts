import { DAO_CONFIG } from '../../../lib/config';

export async function GET() {
  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
      "payload": "eyJkb21haW4iOiJwdXJwbGUuY29uc3RydWN0aW9uIn0",
      "signature": "MHg4YjM0NGJiMTVjZTBkZTI0NmNhMGE1Mjk3ZGQ0MzA3ZjQwOTAwOGRlNzI4NjI3ZDc4NzQ4MGM3ZjAwNGU4Y2VjMzFkNjgyMGE4ODA3OTJkNjFhYmViZjBjOGQ4NjUyYTdmZGIxMmY3MWU0OWM4MWI3YmQxODkxYTExNjZiNjE5YzFi"
    },
    frame: {
      version: "0.0.0",
      name: "Purple DAO",
      iconUrl: DAO_CONFIG.shareGraphic,
      splashImageUrl: DAO_CONFIG.shareGraphic,
      splashBackgroundColor: "#FFFFFF",
      homeUrl: DAO_CONFIG.url,
    },
  };

  return Response.json(config);
}