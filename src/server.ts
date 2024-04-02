import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event";


const app = fastify()
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)

app.get("/", async() => {
    return "Welcome to my api"
})


app.listen({ port: 3333 })
.then(() => {
    console.log("server running at port 3333")
})

