import { NextResponse } from "next/server";

/**
 * Secure POST handler to send contact messages using Resend API.
 * Uses a raw fetch to Resend's REST endpoint so that no extra npm packages are needed.
 */
export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message, turnstileToken } = await request.json();

    // 1. Basic Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 2. Verify Cloudflare Turnstile Token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 403 }
        );
      }
    } else if (turnstileSecret && !turnstileToken) {
      return NextResponse.json(
        { error: "Security verification is required." },
        { status: 403 }
      );
    }

    // 3. Retrieve secure Resend API Key from Server Environment
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Contact API] Error: RESEND_API_KEY is not defined in the environment.");
      return NextResponse.json(
        { error: "Mail server is not properly configured. Check server logs." },
        { status: 500 }
      );
    }

    // 3. Compose email payload
    // Note: On free/unverified Resend tier, we must send FROM "onboarding@resend.dev"
    // and Resend will forward it to the verified email registered under the Resend account.
    const emailPayload = {
      from: "Square World Form <onboarding@resend.dev>",
      to: ["squareworldlogistics@gmail.com"],
      subject: `✉️ New Message from ${name} (Square World Contact Form)`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Square World Logistics Contact Submission</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f8fafc;
              color: #1e293b;
              padding: 24px;
              margin: 0;
            }
            .card {
              background-color: #ffffff;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              padding: 40px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
              max-width: 580px;
              margin: 0 auto;
            }
            .header {
              border-bottom: 1.5px solid #f1f5f9;
              padding-bottom: 24px;
              margin-bottom: 28px;
            }
            .brand {
              font-size: 13px;
              font-weight: 800;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: #0284c7;
              margin: 0 0 6px 0;
            }
            .title {
              font-size: 22px;
              font-weight: 700;
              color: #0f172a;
              margin: 0;
            }
            .meta-grid {
              display: grid;
              gap: 20px;
              margin-bottom: 28px;
            }
            .meta-item {
              margin-bottom: 18px;
            }
            .label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #64748b;
              margin-bottom: 6px;
            }
            .value {
              font-size: 15px;
              font-weight: 500;
              color: #0f172a;
            }
            .value a {
              color: #0284c7;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .message-box {
              background-color: #f8fafc;
              border-left: 4px solid #0284c7;
              padding: 20px;
              border-radius: 6px;
              font-size: 14.5px;
              line-height: 1.6;
              color: #334155;
              font-style: italic;
              white-space: pre-wrap;
              margin-top: 6px;
            }
            .footer {
              font-size: 11px;
              color: #94a3b8;
              text-align: center;
              margin-top: 36px;
              border-top: 1.5px solid #f1f5f9;
              padding-top: 24px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <p class="brand">Square World Logistics</p>
              <h2 class="title">New Client Contact Form</h2>
            </div>
            
            <div class="meta-grid">
              <div class="meta-item">
                <div class="label">Client Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="meta-item">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="meta-item">
                <div class="label">Phone Number</div>
                <div class="value">${phone}</div>
              </div>
              ` : ""}
              
              ${service ? `
              <div class="meta-item">
                <div class="label">Service Interest</div>
                <div class="value" style="text-transform: capitalize;">${service.replace("-", " ")}</div>
              </div>
              ` : ""}
            </div>

            <div class="meta-item">
              <div class="label">Message Details</div>
              <div class="message-box">${message}</div>
            </div>
            
            <div class="footer">
              This message was sent securely from the contact form at Square World Logistics.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 4. Send POST request directly to Resend's REST endpoint
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendResponse.ok) {
      const errorResponse = await resendResponse.text();
      console.error("[Contact API] Resend Error Response:", errorResponse);
      return NextResponse.json(
        { error: "Failed to dispatch email via Resend API." },
        { status: 502 }
      );
    }

    const resendData = await resendResponse.json();
    return NextResponse.json({ success: true, id: resendData.id });
  } catch (error: any) {
    console.error("[Contact API] Internal Server Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
