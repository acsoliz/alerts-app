import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const alertSchema = z.object({
    id: z.string(),
    type: z.string(),
    subtype: z.string(),
    value: z.string(),
    status: z.string(),
});

export type Alert = z.infer<typeof alertSchema>;
