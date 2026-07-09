import { createServerFn } from "@tanstack/react-start";
import { PILOT_ACCESS_FORM } from "~/components/landing/constants";

export interface PilotAccessRequestInput {
  readonly email: string;
  readonly message: string;
}

export interface PilotAccessRequestResult {
  readonly success: true;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;
const DEFAULT_SMTP_HOST = "smtp.gmail.com";
const DEFAULT_SMTP_PORT = 465;
const DEFAULT_EMAIL_SUBJECT = "HushVoting! pilot access request";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required email environment variable: ${name}`);
  }
  return value;
}

function parseSmtpPort(value: string | undefined): number {
  if (!value) {
    return DEFAULT_SMTP_PORT;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("SMTP_PORT must be a positive integer.");
  }

  return parsed;
}

function parseSmtpSecure(value: string | undefined): boolean {
  if (!value) {
    return true;
  }

  return value.toLowerCase() === "true";
}

function validatePilotAccessRequest(
  data: PilotAccessRequestInput,
): PilotAccessRequestInput {
  const email = data.email.trim();
  const message = data.message.trim();

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    throw new Error("A valid email address is required.");
  }

  if (!message) {
    throw new Error("A message is required.");
  }

  if (message.length > PILOT_ACCESS_FORM.messageMaxLength) {
    throw new Error(
      `Message must be ${PILOT_ACCESS_FORM.messageMaxLength} characters or fewer.`,
    );
  }

  return { email, message };
}

function buildPilotAccessEmailText(data: PilotAccessRequestInput): string {
  return [
    "New HushVoting! pilot access request.",
    "",
    `Requester email: ${data.email}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

export const sendPilotAccessRequest = createServerFn({ method: "POST" })
  .validator((data: PilotAccessRequestInput) =>
    validatePilotAccessRequest(data),
  )
  .handler(async ({ data }): Promise<PilotAccessRequestResult> => {
    const { default: nodemailer } = await import("nodemailer");

    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS").replace(/\s+/g, "");
    const toEmail = getRequiredEnv("PILOT_ACCESS_TO_EMAIL");
    const fromEmail = getRequiredEnv("PILOT_ACCESS_FROM_EMAIL");
    const smtpHost = process.env.SMTP_HOST?.trim() || DEFAULT_SMTP_HOST;
    const smtpPort = parseSmtpPort(process.env.SMTP_PORT);
    const smtpSecure = parseSmtpSecure(process.env.SMTP_SECURE);
    const subjectPrefix = process.env.PILOT_ACCESS_EMAIL_SUBJECT_PREFIX?.trim();
    const subject = subjectPrefix
      ? `${subjectPrefix} ${DEFAULT_EMAIL_SUBJECT}`
      : DEFAULT_EMAIL_SUBJECT;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      text: buildPilotAccessEmailText(data),
    });

    return { success: true };
  });
