import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { prisma } from "../utils/prisma";

export default async function getAttendeeBadge(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .get("/attendees/:attendeesId/badge", {
        schema: {
            params: z.object({
                attendeesId: z.coerce.number().int().positive()
            }),
            response: {
                200: z.object({
                    badge: z.object({
                        name: z.string(),
                        email: z.string().email(),
                        eventTitle: z.string(),
                        checkInURL: z.string().url()
                    })
                }),
                404: z.object({
                    message: z.string()
                })
            }
        }
    }, async(request, reply) => {
        
        const { attendeesId } = request.params

        const attendee = await prisma.attendee.findUnique({
            select: {
                email: true,
                name: true,

                event: {
                    select: {
                        title: true,
                        details: true,
                        id: true
                    }
                }
            },
            where: {
                id: attendeesId
            }
        })

        if(!attendee){
            return reply.status(404).send({message: "Attendee not found"})
        }

        const baseUrl = `${request.protocol}://${request.hostname}`;
        const checkInURL = new URL(`/attendees/${attendeesId}/check-in`, baseUrl)

        return reply.send({ 
            badge: {
                name: attendee.name,
                email: attendee.email,
                eventTitle: attendee.event.title,
                checkInURL: checkInURL.toString()
            }
        })
    })
}