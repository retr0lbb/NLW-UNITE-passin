import {
  getSluged
} from "./chunk-UDEVG7DK.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-X7DEMKN4.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(5),
        details: z.string().nullable(),
        maximunAtendees: z.number().int().positive().nullable()
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
      title
    } = request.body;
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
        slug
      }
    });
    return reply.status(201).send({ message: "Event created with sucess", eventId: event.id });
  });
}

export {
  createEvent
};
