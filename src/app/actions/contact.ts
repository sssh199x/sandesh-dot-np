"use server";

import { Resend } from "resend";

interface ContactResult {
  success: boolean;
  message: string;
}

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactResult> {
  const { name, email, message } = formData;

  // Validate
  if (!name || name.length < 2) {
    return { success: false, message: "Please enter your name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email." };
  }
  if (!message || message.length < 10) {
    return { success: false, message: "Message must be at least 10 characters." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, message: "Server configuration error." };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "sandeshhamal5890@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send. Please try again." };
  }
}
