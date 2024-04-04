import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../utils/prisma"
import { FastifyInstance } from "fastify";
import getSluged from "../utils/tools/get-sluged";


export default async function createEvent(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .post("/events", {
        schema: {
            body: z.object({
                title: z.string().min(5),
                details: z.string().nullable(),
                maximunAtendees: z.number().int().positive().nullable()
            }),

            response: {
                201: z.object({
                    eventId: z.string().uuid(),
                    message: z.string()
                })
            }

        }
    }, async( request, reply ) => {
        
        const { 
            details, 
            maximunAtendees, 
            title 
        } = request.body;
        
        const slug = getSluged(title)


        const eventWithTheSameSlug = await prisma.event.findUnique({
            where: {
                slug
            }
        })

        if(eventWithTheSameSlug !== null){
            throw new Error("Event with the same title already exists")
        }

        const event = await prisma.event.create({
            data: {
                title,
                details,
                maximunAtendees,
                slug
            }
        })        
        return reply.status(201).send({message: "Event created with sucess", eventId: event.id})
        
    })
}