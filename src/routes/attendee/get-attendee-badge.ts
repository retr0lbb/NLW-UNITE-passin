import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../utils/prisma";
import { BadRequest } from "../_errors/bad-request";

export default async function getAttendeeBadge(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .get("/attendees/:attendeesId/badge", {
        schema: {
            summary: "Get an attendee badge",
            tags: ["attendees"],
            params: z.object({
                attendeesId: z.coerce.number().int().positive()
            }),
            response: {
                200: z.object({
                    badge: z.object({
                        id: z.number().int().positive(),
                        name: z.string(),
                        email: z.string().email(),
                        eventTitle: z.string(),
                        checkInURL: z.string().url(),
                        eventDate: z.date()
                    })
                })
            }
        }
    }, async(request, reply) => {
        
        const { attendeesId } = request.params

        const attendee = await prisma.attendee.findUnique({
            select: {
                email: true,
                name: true,
                id: true,
                event: {
                    select: {
                        title: true,
                        details: true,
                        id: true,
                        eventDate: true
                    }
                }
            },
            where: {
                id: attendeesId
            }
        })

        if(attendee === null){
            throw new BadRequest("Attendee not found.")
        }

        const baseUrl = `${request.protocol}://${request.hostname}`;
        const checkInURL = new URL(`/attendees/${attendeesId}/check-in`, baseUrl)

        return reply.send({ 
            badge: {
                id: attendee.id,
                name: attendee.name,
                email: attendee.email,
                eventTitle: attendee.event.title,
                checkInURL: checkInURL.toString(),
                eventDate: attendee.event.eventDate
            }
        })
    })
}