import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod"
import fastifyCors from "@fastify/cors";
import {
    checkIn, 
    createEvent, 
    deletEvent, 
    getAttendeeBadge, 
    getEvent, 
    getEventAttendees, 
    registerForEvent
} from "./routes"
import { errorHandler } from "./utils/error-handling";

const app = fastify()

app.register(fastifyCors, {
    origin: "*",

})

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
app.register(deletEvent)

app.setErrorHandler(errorHandler)

app.get("/", async() => {
    return "Welcome to my api"
})


app.listen({ port: 3333, host: "0.0.0.0" })
.then(() => {
    console.log("server running at port 3333")
})

