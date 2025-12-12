
import { tool } from "ai";
import { jsonSchema } from "@ai-sdk/provider-utils";


export const getSports = tool({
  description:
    "This tool will show some photos of Yashwanth's hobbies and interests",
  inputSchema: jsonSchema({ type: "object", properties: {} }),
  execute: async () => {
    return "Here are some pictures of me enjoying my hobbies!";
  },
});
