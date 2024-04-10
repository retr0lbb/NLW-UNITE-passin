import {
  getSluged
} from "./chunk-UDEVG7DK.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-X7DEMKN4.mjs";

// src/routes/event/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(5),
        details: z.string().nullable(),
        maximunAtendees: z.number().int().positive().nullable(),
        eventDate: z.string(),
        limitDateToSubscribe: z.string()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid(),
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const {
      details,
      maximunAtendees,
      title,
      eventDate,
      limitDateToSubscribe
    } = request.body;
    const dateEventDate = new Date(eventDate);
    const datelimitDateToSubscribe = new Date(limitDateToSubscribe);
    if (dateEventDate < datelimitDateToSubscribe) {
      throw new BadRequest("Limit date do subscribe cannot be greater them event date");
    }
    if (dateEventDate < /* @__PURE__ */ new Date()) {
      throw new BadRequest("Event Date cannot be in the past");
    }
    if (datelimitDateToSubscribe < /* @__PURE__ */ new Date()) {
      throw new BadRequest("Limit Date for subscription cannot be in the past");
    }
    const slug = getSluged(title);
    const eventWithTheSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithTheSameSlug !== null) {
      throw new BadRequest("Event with the same title already exists");
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximunAtendees,
        slug,
        eventDate: dateEventDate,
        limitDateToSubscribe: datelimitDateToSubscribe
      }
    });
    return reply.status(201).send({ message: "Event created with sucess", eventId: event.id });
  });
}

export {
  createEvent
};
