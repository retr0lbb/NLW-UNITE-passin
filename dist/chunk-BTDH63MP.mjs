import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-X7DEMKN4.mjs";

// src/routes/get-attendee-badge.ts
import { z } from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get("/attendees/:attendeesId/badge", {
    schema: {
      summary: "Get an attendee badge",
      tags: ["attendees"],
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
        })
      }
    }
  }, async (request, reply) => {
    const { attendeesId } = request.params;
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
    });
    if (attendee === null) {
      throw new BadRequest("Attendee not found.");
    }
    const baseUrl = `${request.protocol}://${request.hostname}`;
    const checkInURL = new URL(`/attendees/${attendeesId}/check-in`, baseUrl);
    return reply.send({
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event.title,
        checkInURL: checkInURL.toString()
      }
    });
  });
}

export {
  getAttendeeBadge
};
