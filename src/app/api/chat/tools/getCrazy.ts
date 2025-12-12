
import { tool } from "ai";
import { jsonSchema } from "@ai-sdk/provider-utils";


export const getCrazy = tool({
  description:
    "This tool will tell the craziest thing I've ever done. Use it when the user asks something like: 'What's the craziest thing you've ever done?'",
  inputSchema: jsonSchema({ type: "object", properties: {} }),
  execute: async () => {
    return "Built an AI-native portfolio that answers questions better than I do 🤖. Recruiters didn’t know whether to hire me or the bot. 😅";
  },
});
