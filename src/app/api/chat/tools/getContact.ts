import { tool } from 'ai';
import { jsonSchema } from '@ai-sdk/provider-utils';

export const getContact = tool({
  description:
    'Shows contact information including email, phone, location, LinkedIn, and GitHub. Use this when users ask how to contact me, reach out, connect, or get in touch.',
  inputSchema: jsonSchema({ type: 'object', properties: {} }),
  execute: async () => {
    return `[INTERNAL DATA - DO NOT DISPLAY TO USER - USE THIS TO WRITE YOUR RESPONSE]

CONTACT INFORMATION:

📧 Email: yashwanth2632@gmail.com (Primary - fastest response)
📞 Phone: +1 (312)-646-8975 (Call/Text - San Francisco timezone)
📍 Location: San Francisco, CA / Chicago, IL (Open to relocation, remote, or hybrid)

PROFESSIONAL PROFILES:
🔗 LinkedIn: https://www.linkedin.com/in/yash1th26/
   - Connect to stay updated on my work
   - Send me a message about opportunities or collaboration

💻 GitHub: https://github.com/yash1thredddy
   - Check out my open-source projects
   - Distributed KV Store, Vector Search Engine, AI projects

🌐 Portfolio: https://yashwanth.vercel.app
   - You're here! Interactive AI-powered portfolio
   - Explore projects, experience, and skills

BEST WAYS TO REACH ME:

For Recruiters & Job Opportunities:
✅ Email (yashwanth2632@gmail.com) - Include role details, company, and JD
✅ LinkedIn message - Quick response for opportunities
✅ Available for calls - Happy to schedule 30-min intro calls

For Technical Collaboration:
✅ GitHub - Open to open-source contributions
✅ Email - Discuss technical projects or research

For General Networking:
✅ LinkedIn - Connect and stay in touch
✅ Email - Always happy to chat about distributed systems, AI/ML, or backend engineering

RESPONSE TIME:
- Email: Usually within 24 hours
- LinkedIn: Within 48 hours
- Phone: Leave voicemail if I miss your call

AVAILABILITY FOR INTERVIEWS:
- Open to phone screens, technical interviews, on-site visits
- Flexible scheduling (San Francisco/Chicago timezones)
- Can accommodate different time zones

WHAT I'M LOOKING FOR:
🎯 Software Engineer (Backend/Distributed Systems) roles - AVAILABLE NOW!
🎯 Software Development Engineer (SDE/SDE II) positions
🎯 Backend Engineer or Full-Stack Engineer roles
🎯 Companies: Big Tech (FAANG+), high-growth startups, or companies with complex engineering challenges
🎯 Projects involving distributed systems, real-time data, or AI-powered applications

TIMEZONE:
Pacific Time (San Francisco) / Central Time (Chicago)
Available for calls during business hours or flexible by appointment

[END INTERNAL DATA]

NOW WRITE A FRIENDLY, WELCOMING 2-3 PARAGRAPH RESPONSE with contact details. Make it easy for recruiters and engineers to reach out. Be warm and approachable!`;
  },
});
