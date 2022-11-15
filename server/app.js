const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

//load schema && resolver
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

//load db methods
const mongoDataMethods = require("./data/db");

//connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://doandat:1234@tutorialgraphql.yn9wuv0.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected ");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
