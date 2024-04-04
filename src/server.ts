import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod"
import createEvent from "./routes/create-event";
import registerForEvent from "./routes/register-for-event";
import getEvent from "./routes/get-event";
import getAttendeeBadge from "./routes/get-attendee-badge";
import checkIn from "./routes/check-in";
import getEventAttendees from "./routes/get-event-attendees";


const app = fastify()

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: "Pass.in",
            description: "Especificações da API para o backend da appication Pass.in",
            version: "1.0.0"
        }
    },
    transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.get("/", async() => {
    return "Welcome to my api"
})


app.listen({ port: 3333 })
.then(() => {
    console.log("server running at port 3333")
})

