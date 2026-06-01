import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, projectName, inquiryType } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure Nodemailer with environment variables
    // Note: These must be set in .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toEmails = [
      process.env.BUILDER_EMAIL,
      process.env.BUILDER_EMAIL_2,
      process.env.BUILDER_EMAIL_3,
    ].filter(Boolean).join(", ");

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .header { background-color: #0A2540; padding: 30px 40px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 2px; }
          .content { padding: 40px; }
          .content p { color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; }
          .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .details-table th, .details-table td { padding: 15px; border-bottom: 1px solid #edf2f7; text-align: left; }
          .details-table th { width: 35%; color: #718096; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .details-table td { color: #2d3748; font-weight: 500; font-size: 15px; }
          .message-title { margin-top: 35px; margin-bottom: 15px; font-size: 14px; color: #718096; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
          .message-box { background-color: #f8fafc; border-left: 4px solid #0A2540; padding: 25px; border-radius: 0 8px 8px 0; }
          .message-box p { margin: 0; color: #1a202c; white-space: pre-wrap; font-size: 15px; line-height: 1.8; }
          .footer { background-color: #f1f5f9; padding: 20px; text-align: center; color: #a0aec0; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>DOLPHIN BUILDERS</h1>
          </div>
          <div class="content">
            <p>You have received a new inquiry from your website. Here are the details:</p>
            <table class="details-table">
              <tr>
                <th>Name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td><a href="mailto:${email}" style="color: #0A2540; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>${phone || "N/A"}</td>
              </tr>
              <tr>
                <th>Inquiry Type</th>
                <td>${inquiryType || "General Inquiry"}</td>
              </tr>
              <tr>
                <th>Project Context</th>
                <td>${projectName || "General"}</td>
              </tr>
            </table>
            
            <div class="message-title">Client Message</div>
            <div class="message-box">
              <p>${message}</p>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Dolphin Builders & Developers. All rights reserved.<br>
            Automated message from your website's contact form.
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: toEmails,
      subject: `New Enquiry: ${projectName || "General Enquiry"}`,
      html: htmlTemplate,
      replyTo: email,
    };

    // Dispatch real email
    await transporter.sendMail(mailOptions);
    
    console.log("SUCCESS: Inquiry email dispatched to:", toEmails);

    return NextResponse.json(
      { message: "Enquiry sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}
