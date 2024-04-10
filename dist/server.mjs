import "./chunk-SV6FI4MD.mjs";
import {
  createEvent
} from "./chunk-FA7E3SRA.mjs";
import {
  deletEvent
} from "./chunk-OYVDOAPW.mjs";
import {
  getEventAttendees
} from "./chunk-46FBRRH2.mjs";
import {
  getEvent
} from "./chunk-OA2R4A54.mjs";
import "./chunk-UDEVG7DK.mjs";
import {
  checkIn
} from "./chunk-CULOND5S.mjs";
import {
  errorHandler
} from "./chunk-SD2OABSU.mjs";
import {
  getAttendeeBadge
} from "./chunk-IKILV2CC.mjs";
import {
  registerForEvent
} from "./chunk-ZE6AGR7L.mjs";
import "./chunk-SRO7UIHQ.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-X7DEMKN4.mjs";
import "./chunk-PLIMMGR5.mjs";

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
