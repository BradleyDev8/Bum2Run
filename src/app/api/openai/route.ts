import OpenAI from "openai";

// Create an OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { raceDistance, effortLevel, weeklyDistance } = await req.json();

  const prompt = `
  You are a professional running trainer with over 10 years of experience in designing personalized training plans for runners. Your expertise covers all levels of runners, from beginners to elite athletes. You will create a running training plan based on the following parameters:

  1. **Race Distance (km):** ${raceDistance}
  2. **Effort Level:** ${effortLevel}
  3. **Weekly Distance (km):** ${weeklyDistance}

  ### Training Plan Guidelines:
  - **Beginner Runners:** Provide a gradual build-up plan with a focus on building endurance and avoiding injury. Include rest days and low-intensity runs.
  - **Intermediate Runners:** Create a plan that includes a mix of endurance, speed, and tempo runs to improve overall performance and prepare for the target race distance.
  - **Advanced Runners:** Design a high-intensity plan with advanced workouts, including interval training, hill sprints, and long runs. Focus on fine-tuning performance and achieving peak race condition.

  ### Weekly Schedule:
  Provide a detailed weekly schedule with specific activities for each day. Ensure the plan includes:
  - **Warm-Up:** Dynamic stretches and easy jogging to prepare the body for the workout.
  - **Main Workout:** Specify the type of workout (e.g., long run, interval training, tempo run) with detailed instructions.
  - **Cool-Down:** Static stretching and light jogging to aid in recovery.
  - **Rest Days:** Include rest days or cross-training days as needed.
  - **Additional Tips:** Provide tips on nutrition, hydration, recovery, and injury prevention.

  Provide a similarly detailed training plan based on the user-provided parameters.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    stream: false,
    temperature: 1,
  });

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
}
