import {
  errorHandler
} from "./chunk-SD2OABSU.mjs";
import "./chunk-3URWXKJX.mjs";
import {
  checkIn
} from "./chunk-CULOND5S.mjs";
import {
  createEvent
} from "./chunk-6HJ5SYEO.mjs";
import "./chunk-UDEVG7DK.mjs";
import {
  getAttendeeBadge
} from "./chunk-O75VA6VT.mjs";
import {
  getEventAttendees
} from "./chunk-4WTNSYQU.mjs";
import {
  getEvent
} from "./chunk-US2CHGF3.mjs";
import {
  registerForEvent
} from "./chunk-ZWL7DUUM.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-X7DEMKN4.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Pass.in",
      description: "Especifica\xE7\xF5es da API para o backend da appication Pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.get("/", async () => {
  return "Welcome to my api";
});
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("server running at port 3333");
});
