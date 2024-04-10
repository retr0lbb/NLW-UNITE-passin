
import exp from "constants"
import { test, expect } from "vitest"

test("Create an event", () => {
    const fakeEvent = {
        title: "TESTEVENT",
        details: "TESTEVENT",
        maximunAtendees: null,
        eventDate: new Date(),
        limitDateToSubscribe: new Date()
    }

    expect(fakeEvent.maximunAtendees).toBeFalsy()

    
})
