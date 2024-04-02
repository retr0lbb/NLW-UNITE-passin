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
            response: {}
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

        return reply.send({ attendee })
    })
}