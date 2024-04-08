import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../utils/prisma";
import { BadRequest } from "./_errors/bad-request";

export default async function deletEvent(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .delete("/events/:eventId/delete", {
        schema: {
            params: z.object({
                eventId: z.string().uuid()
            })
        }
    }, async(request, reply) => {
        const { eventId } = request.params
        try {
            await prisma.event.delete({
                where: {
                    id: eventId
                }
            })
        } catch (error) {
            throw  new BadRequest("Event Id invalid")
        }
        return reply.status(200)
    })
}