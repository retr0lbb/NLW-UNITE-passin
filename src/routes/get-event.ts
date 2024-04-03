import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../utils/prisma";

export default async function getEvent(app:FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .get("/events/:eventId", {
        schema: {
            params: z.object({
                eventId: z.string().uuid()
            }),
            response: {
                200: {
                    event: z.object({
                        id: z.string().uuid(),
                        title: z.string(),
                        details: z.string().nullable(),
                        maximunAttendees: z.number().int().nullable(),
                        attendeesAmount: z.number().nullable()
                    })
                }
            }
        }
    }, async(request, reply) => {

        try {
            const { eventId } = request.params;

            const event = await prisma.event.findUnique({
                select: {
                    details: true,
                    title: true,
                    id: true,
                    maximunAtendees: true,
                    _count: {
                        select: {
                            attendees: true
                        }
                    }
                },
                where: {
                    id: eventId
                }
            })
            if(!event){
                return reply.status(404).send({message: "Event Not Found"})
            }
    
    
            return reply.send({ event: {
                id: event.id,
                title: event.title,
                details: event.details,
                maximunAttendees: event.maximunAtendees,
                attendeesAmount: event._count.attendees
            } })   
        } catch (error) {
            console.log(error)
        }
    })
}