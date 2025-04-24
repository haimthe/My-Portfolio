import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure these are set correctly in your .env.local
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    console.log("Sending email:");
    console.log("To:", email);
    console.log("From:", fromEmail);
    console.log("Subject:", subject);
    console.log("Message:", message);

    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail], // Send to YOU only, for testing
      subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>New message from {email}</p>
          <p>{message}</p>
        </>
      ),
    });

    console.log("Resend API response:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error });
  }
}
