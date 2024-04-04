import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../utils/prisma";
import { BadRequest } from "./_errors/bad-request";

export default async function registerForEvent(app: FastifyInstance) {
    app
     .withTypeProvider<ZodTypeProvider>()
     .post("/events/:eventId/attendees", {
        schema: {
            summary: "Register an attendee",
            tags: ["attendees"],
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

        const attendeeFromEmail = await prisma.attendee.findUnique({
            where:{ 
                eventId_email: {
                    email,
                    eventId
                }
            }
        })

        if(attendeeFromEmail !== null){
            throw new BadRequest("Email already register on this event")
        }

       const [event, maximumAmountOfAttendeesInAEvent] = await Promise.all([
            prisma.event.findUnique({
                where: {
                    id: eventId
                }
            }),

            prisma.attendee.count({
                where: {
                    eventId
                }
            })

        ])


        if(event?.maximunAtendees &&  maximumAmountOfAttendeesInAEvent >= event?.maximunAtendees){
            throw new BadRequest("Maximum number of attendees for this event reached")
        }

        const attendee = await prisma.attendee.create({
            data:{
                email,
                name,
                eventId
            }
        })

        return reply.status(201).send({message: "Attendee inserted In a event with Sucess", attendeeId: attendee.id})
     })

}