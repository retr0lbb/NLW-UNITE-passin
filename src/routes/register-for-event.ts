import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../utils/prisma";

export async function registerForEvent(app: FastifyInstance) {
    app
     .withTypeProvider<ZodTypeProvider>()
     .post("/events/:eventId/attendees", {
        schema: {
            params: z.object({
                eventId: z.string().uuid()
            }),
            body: z.object({
                name: z.string().min(3),
                email: z.string().email()
            }),
            response: {
                201: z.object({
                    message: z.string(),
                    attendeeId: z.number().int()
                })
            }
        }
     }, async(request, reply) => {
        const { eventId } = request.params;
        const { email, name } = request.body;

     })

}