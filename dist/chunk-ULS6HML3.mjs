import {
  prisma
} from "./chunk-X7DEMKN4.mjs";

// src/routes/get-event-attendees.ts
import { z } from "zod";
async function getEventAttendees(app) {
  app.withTypeProvider().get("/events/:eventId/attendees", {
    schema: {
      summary: "Get event attendees",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      querystring: z.object({
        query: z.string().nullish(),
        pageIndex: z.string().nullable().default("0").transform(Number)
      }),
      response: {
        200: z.object({
          attendees: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              email: z.string().email(),
              createdAt: z.date(),
              checkedInAt: z.date().nullable()
            })
          ),
          attendeesAmount: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { pageIndex, query } = request.query;
    const [eventAttendees, attendees] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        },
        select: {
          _count: {
            select: {
              attendees: true
            }
          }
        }
      }),
      prisma.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          checkIn: {
            select: {
              createdAt: true
            }
          }
        },
        where: query ? {
          eventId,
          name: {
            contains: query
          }
        } : {
          eventId
        },
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          createdAt: "desc"
        }
      })
    ]);
    return reply.send({
      attendees: attendees.map((attendee) => {
        return {
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          createdAt: attendee.createdAt,
          checkedInAt: attendee.checkIn?.createdAt ?? null
        };
      }),
      attendeesAmount: eventAttendees?._count.attendees ? eventAttendees?._count.attendees : 0
    });
  });
}

export {
  getEventAttendees
};
