import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-X7DEMKN4.mjs";

// src/routes/event/get-event.ts
import { z } from "zod";
async function getEvent(app) {
  app.withTypeProvider().get("/events/:eventId", {
    schema: {
      summary: "Get an especific event",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        200: z.object({
          event: z.object({
            id: z.string().uuid(),
            title: z.string(),
            details: z.string().nullable(),
            maximunAttendees: z.number().int().nullable(),
            attendeesAmount: z.number().int()
          })
        })
      }
    }
  }, async (request, reply) => {
    try {
      const { eventId } = request.params;
      const event = await prisma.event.findUnique({
        select: {
          details: true,
          title: true,
          id: true,
          maximunAtendees: true,
          eventDate: true,
          _count: {
            select: {
              attendees: true
            }
          }
        },
        where: {
          id: eventId
        }
      });
      if (event === null) {
        throw new BadRequest("Event not found");
      }
      return reply.send({ event: {
        id: event.id,
        title: event.title,
        details: event.details,
        maximunAttendees: event.maximunAtendees,
        attendeesAmount: event._count.attendees
      } });
    } catch (error) {
      console.log(error);
    }
  });
}

export {
  getEvent
};
