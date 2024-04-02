import fastify from "fastify";
import { z } from "zod"
import { PrismaClient} from "@prisma/client"

const prisma = new PrismaClient({
    log: ['query']
})
const app = fastify()

/* 
*    SOAP, REST
*    
*    EU ODEIO O CORS COM TODAS A MINHAS FORÇAS
*    CORS É ALGO DO CAPETA, CORS É INDIGNO E DEVE SER
*    DESTRUIDO COM OS PODERES DIVINOS DA PROGRAMAÇÃO E
*    PROTOTIPAÇÃO UwU
*
*    HEADERS -> wow my font is awesome
*/

app.get("/", async() => {
    return "Welcome to my api"
})
app.post("/events", async( request, reply ) => {
    
    const eventsBodySchema = z.object({
        title: z.string().min(5),
        details: z.string().nullable(),
        maximunAtendees: z.number().int().positive().nullable()
    })
    
    const {details, maximunAtendees, title} = eventsBodySchema.parse(request.body)
    const slug = new Date().toISOString()


    const event = await prisma.event.create({
        data: {
            title,
            details,
            maximunAtendees,
            slug
        }
    })

    return reply.status(201).send({message: "Event created with sucess",event: event.id})
})

app.listen({ port: 3333 })
.then(() => {
    console.log("server running at port 3333")
})

