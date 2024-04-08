import {
  errorHandler
} from "./chunk-SD2OABSU.mjs";
import "./chunk-SV6FI4MD.mjs";
import {
  registerForEvent
} from "./chunk-HDNDPVHD.mjs";
import {
  checkIn
} from "./chunk-CULOND5S.mjs";
import {
  createEvent
} from "./chunk-ISXJODSP.mjs";
import "./chunk-UDEVG7DK.mjs";
import {
  deletEvent
} from "./chunk-FZNNY3M2.mjs";
import {
  getAttendeeBadge
} from "./chunk-S3EEM54A.mjs";
import {
  getEventAttendees
} from "./chunk-HYO4XBM4.mjs";
import {
  getEvent
} from "./chunk-US2CHGF3.mjs";
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
app.register(deletEvent);
app.setErrorHandler(errorHandler);
app.get("/", async () => {
  return "Welcome to my api";
});
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("server running at port 3333");
});
