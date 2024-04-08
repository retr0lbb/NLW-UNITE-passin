import { prisma } from "../src/utils/prisma"
import getSluged from "../src/utils/tools/get-sluged"
 
async function seed() {

    const todayDate = new Date()
    await prisma.event.create({
       data: {
        id: "ea15b680-4105-4ec4-a420-dc0624421622",
        slug: getSluged("Brasil Fur Fest 2025"),
        title: "Brasil Fur Fest 2025",
        details: "A maior convenção furry esta no brasil por mais um ano consecutivo explore a vasta cultura furry e venha se diverti conosco",
        maximunAtendees: 10000,
        eventDate: new Date(todayDate.getFullYear(), todayDate.getMonth() + 2, todayDate.getDate()),
        limitDateToSubscribe: new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate())
       }
    })
}
seed().then(() => {
    console.log("Database Seeded")
    prisma.$disconnect()
})