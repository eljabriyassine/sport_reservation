import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI; // Use the URI from environment variables

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Create a new MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to prevent multiple instances
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // For production, use a single instance
  clientPromise = client.connect();
}

export default clientPromise;
