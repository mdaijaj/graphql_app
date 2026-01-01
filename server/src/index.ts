import express from "express";
import cors from "cors";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import todoSchema from "./module/todo/todoSchema.js";
import todoResolver from "./module/todo/todoResolver.js";

const app = express();
const PORT = 8000;

// Express routes
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.send("Welcome to the Todo GraphQL API");
});

// Apollo Server with standalone server
const apolloServer = new ApolloServer({
    typeDefs: todoSchema,
    resolvers: todoResolver,
});

const startServer = async () => {
    try {
        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Express Server: http://localhost:${PORT}`);
        });

        // Start Apollo Server on different port
        const { url } = await startStandaloneServer(apolloServer, {
            listen: { port: 4000 },
        });

        console.log(`🚀 GraphQL Server: ${url}`);
    } catch (error) {
        console.error("❌ Server error:", error);
        process.exit(1);
    }
};

startServer();