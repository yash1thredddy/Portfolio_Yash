
import { tool } from "ai";
import { z } from "zod";


export const getSports = tool({
  description:
    "This tool will show some photos of Yashwanth's hobbies and interests",
  parameters: z.object({}),
  execute: async () => {
    return "Here are some pictures of me enjoying my hobbies!";
  },
});