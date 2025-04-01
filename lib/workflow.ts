import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,//for workflows
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});//for queueing tasks via Upstash 

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken}),
    },
    body: {
      from: "Bookwise <onboarding@resend.dev>",
      to: [email],
      subject,
      html: message,
    },
  });
};
