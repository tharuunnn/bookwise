import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
  //for workflow, this is what is used to cause the trigger after a user is added into the db(it is used for long running tasks like email after login blabla).
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
}); //for queueing tasks via Upstash and it sis for short lived tasks like sending an email.

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await qstashClient.publishJSON({
      api: {
        name: "email",
        provider: resend({ token: config.env.resendToken }),
      },
      body: {
        from: "Bookwise <no-reply@send.bookborrow.online>", //this is the email that will be sending the emails
        to: [email],
        subject,
        html: message,
      },
    });
    console.log("Email queued:", response); //this is to check if the email is sent successfully or not. If it is not sent successfully then it will be sent again in the next month.
  } catch (err) {
    console.error("Email sending error:", err);
  }
};
