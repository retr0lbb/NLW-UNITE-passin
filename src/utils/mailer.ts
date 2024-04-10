import nodeMailer, {SendMailOptions} from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


export const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILER_USER,
        pass: process.env.EMAILER_SENDER
    }
})


export interface EmailConfiguration extends SendMailOptions{
    reciver: string
}

export async function sendEmail({reciver, subject, ...rest}: EmailConfiguration) {

    try {
        const info = await transporter.sendMail({
            from: 
            {
                name: "Pass.in",
                address: process.env.EMAILER_USER ?? ""
            },
            to: reciver, 
            subject,
            ...rest
        });

        transporter.close()
        if(!info){
            return "Email not founded"
        }

        return {
            message: "Email sended with sucess",
            info
        }
    } catch (error) {
        if(error){
            throw new Error("An error occored on email sender")
        }   
    }
}

