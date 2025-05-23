import { z } from "zod";
import { emailSchema } from "./auth.schema";

export const fullNameSchema = z.string().max(255);
export const contactNumberSchema = z.string().min(11).max(15);
export const inquiryTypeSchema = z.string().max(255);
export const messageSchema = z.string();

export const sendInquirySchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  contactNumber: contactNumberSchema,
  inquiryType: inquiryTypeSchema,
  message: messageSchema,
});
