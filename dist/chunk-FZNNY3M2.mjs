import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-X7DEMKN4.mjs";

// src/routes/delete-event.ts
import { z } from "zod";
async function deletEvent(app) {
  app.withTypeProvider().delete("/events/:eventId/delete", {
    schema: {
      params: z.object({
        eventId: z.string().uuid()
      }),
      summary: "deletes an event",
      tags: ["events"]
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    try {
      await prisma.event.delete({
        where: {
          id: eventId
        }
      });
    } catch (error) {
      throw new BadRequest("Event Id invalid");
    }
    return reply.status(200);
  });
}

export {
  deletEvent
};
