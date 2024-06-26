import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY )

export async function POST() {
    await resend.emails.send({
        from: '...', // we havve not setup domain in the resend.com website so emails wont be sent
        to: 'jtalha2222@gmail.com',
        subject: '...',
        react: <WelcomeTemplate name="talha" />

    })
}