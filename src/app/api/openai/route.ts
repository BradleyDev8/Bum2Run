import OpenAI from "openai";
import { NextResponse } from "next/server";
import { trainingSchema, Training } from "@/schema/trainingSchema";
import { ChatMessage } from "@/models/chatMessage";
import { TrainingPlanResponse } from "@/models/trainingPlanResponse";

// Create an OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const requestData = await req.json();
  console.log("Received request data:", requestData);
  const validatedData = trainingSchema.safeParse(requestData);

  if (!validatedData.success) {
    console.error("Validation failed:", validatedData.error);
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }

  const { raceDistance, effortLevel, weeklyDistance } = validatedData.data;

  let planDetails = "";

  if (effortLevel === "beginner") {
    planDetails = `
    "weeklySchedule": "Detailed weekly schedule for beginner runners",
    "warmUp": "Warm-up instructions",
    "mainWorkout": "Main workout details",
    "coolDown": "Cool-down instructions",
    "restDays": "Rest day instructions",
    "additionalTips": "Additional tips for beginner runners"
    `;
  } else if (effortLevel === "intermediate") {
    planDetails = `
    "weeklySchedule": "Detailed weekly schedule for intermediate runners",
    "warmUp": "Warm-up instructions",
    "mainWorkout": "Main workout details",
    "coolDown": "Cool-down instructions",
    "restDays": "Rest day instructions",
    "additionalTips": "Additional tips for intermediate runners"
    `;
  } else if (effortLevel === "advanced") {
    planDetails = `
    "weeklySchedule": "Detailed weekly schedule for advanced runners",
    "warmUp": "Warm-up instructions",
    "mainWorkout": "Main workout details",
    "coolDown": "Cool-down instructions",
    "restDays": "Rest day instructions",
    "additionalTips": "Additional tips for advanced runners"
    `;
  }

  const prompt = `
  You are a professional running trainer with over 10 years of experience in designing personalized training plans for runners. Your expertise covers all levels of runners, from beginners to elite athletes. You will create a running training plan based on the following parameters:
  
  1. **Race Distance (km):** ${raceDistance}
  2. **Effort Level:** ${effortLevel}
  3. **Weekly Distance (km):** ${weeklyDistance}
  
  Return the response as a JSON object with the following shape:
  {
    "training_plan": {
      ${planDetails}
    }
  }
  
  Do not return any other information.
  `;

  try {
    const messages: ChatMessage[] = [
      {
        role: "system",
        content: prompt,
      },
    ];

    const chatGPT = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      stream: false,
      temperature: 1,
    });

    console.log("OpenAI response:", chatGPT);

    if (chatGPT.choices && chatGPT.choices[0].message?.content) {
      const output = chatGPT.choices[0].message.content;
      console.log("OpenAI output content:", output);

      try {
        const parsedPlan: TrainingPlanResponse = JSON.parse(output);
        console.log("Parsed training plan:", parsedPlan);
        return NextResponse.json(parsedPlan, { status: 200 });
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        return NextResponse.json({ error: "Error parsing JSON response" }, { status: 500 });
      }
    } else {
      console.error("No content received from OpenAI or response format is incorrect");
      return NextResponse.json({ error: "No content received from OpenAI" }, { status: 500 });
    }
  } catch (err) {
    console.error("Error during OpenAI request:", err);
    return NextResponse.json({ error: "Error during OpenAI request" }, { status: 500 });
  }
}
