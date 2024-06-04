"use client";
import { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Info } from "lucide-react";

const DashboardPage = () => {
  const [raceDistance, setRaceDistance] = useState("");
  const [effortLevel, setEffortLevel] = useState("");
  const [weeklyDistance, setWeeklyDistance] = useState("");
  const [trainingPlan, setTrainingPlan] = useState("");

  const handleGeneratePlan = async () => {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        raceDistance,
        effortLevel,
        weeklyDistance,
      }),
    });

    const data = await response.json();
    setTrainingPlan(data.choices[0].message.content);
  };

  return (
    <MaxWidthWrapper>
      <div className="h-screen w-full">
        <div className="w-full mt-4 h-28">
          <h1 className="text-4xl font-semibold text-center justify-center tracking-tight text-gray-900 sm:text-6xl">
            Get Your Training Plan 🏃
          </h1>
        </div>
        <div className="flex w-full">
          <div className="flex justify-around w-full h-32 text-center">
            <div>
              <div className="flex items-center justify-center bg-gray-100 rounded p-2 mb-4 shadow-md">
                <p className="mr-2">Race Distance</p>
                <Info className="w-4 h-4" />
              </div>
              <Input
                className="shadow-md"
                placeholder="km"
                value={raceDistance}
                onChange={(e) => setRaceDistance(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-center bg-gray-100 rounded p-2 mb-4 shadow-md">
                <p className="mr-2">Effort Level</p>
                <Info className="w-4 h-4" />
              </div>
              <Input
                className="shadow-md"
                placeholder="1-10"
                value={effortLevel}
                onChange={(e) => setEffortLevel(e.target.value)}
              />{" "}
            </div>
            <div>
              <div className="flex items-center justify-center bg-gray-100 rounded p-2 mb-4 shadow-md">
                <p className="mr-2">Weekly Distance</p>
                <Info className="w-4 h-4" />
              </div>
              <Input
                className="shadow-md"
                placeholder="km"
                value={weeklyDistance}
                onChange={(e) => setWeeklyDistance(e.target.value)}
              />{" "}
            </div>
          </div>
        </div>
        <div className=" h-screen w-full justify-center align-middle items-center">
          <div className="flex h-[50%] w-full justify-center">
            <div className="w-[90%] justify-center items-center shadow-lg bg-gray-100 rounded-lg p-4">
              {trainingPlan && (
                <div className="h-80 overflow-y-auto">
                  {trainingPlan.split("\n").map((line, index) => (
                    <p
                      key={index}
                      className={`text-md ${
                        line.startsWith("Monday:") ||
                        line.startsWith("Tuesday:") ||
                        line.startsWith("Wednesday:") ||
                        line.startsWith("Thursday:") ||
                        line.startsWith("Friday:") ||
                        line.startsWith("Saturday:") ||
                        line.startsWith("Sunday:")
                          ? "bg-yellow-100"
                          : ""
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full justify-center mt-2">
            <div className="flex w-[90%] justify-end align-bottom items-end">
              <button onClick={handleGeneratePlan} className={buttonVariants()}>
                Generate Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default DashboardPage;
