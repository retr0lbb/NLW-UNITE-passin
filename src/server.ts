import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod"
import {
    checkIn, 
    createEvent, 
    getAttendeeBadge, 
    getEvent, 
    getEventAttendees, 
    registerForEvent
} from "./routes"
import { errorHandler } from "./utils/error-handling";



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

app.setErrorHandler(errorHandler)

app.get("/", async() => {
    return "Welcome to my api"
})


app.listen({ port: 3333 })
.then(() => {
    console.log("server running at port 3333")
})

