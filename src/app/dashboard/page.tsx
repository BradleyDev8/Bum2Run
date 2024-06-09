"use client";
import React, { useState, Suspense } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import Loading from "./loading";
import TrainingPlan from "@/components/TrainingPlan";
import CustomDropdown from "@/components/CustomDropdown";

const DashboardPage: React.FC = () => {
  const [raceDistance, setRaceDistance] = useState<string>("");
  const [effortLevel, setEffortLevel] = useState<string>("");
  const [weeklyDistance, setWeeklyDistance] = useState<string>("");
  const [trainingPlan, setTrainingPlan] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGeneratePlan = async () => {
    setLoading(true);
    setTrainingPlan(null);
    try {
      console.log("Requesting training plan with parameters:", {
        raceDistance,
        effortLevel,
        weeklyDistance,
      });
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      setTrainingPlan(data);
    } catch (error) {
      console.error("Error fetching training plan:", error);
    } finally {
      setLoading(false);
    }
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>this is tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CustomDropdown
                label="Select Race Distance"
                options={["5km", "10km", "Half Marathon", "Marathon"]}
                selectedOption={raceDistance}
                setSelectedOption={setRaceDistance}
              />
            </div>
            <div>
              <div className="flex items-center justify-center bg-gray-100 rounded p-2 mb-4 shadow-md">
                <p className="mr-2">Effort Level</p>
                <Info className="w-4 h-4" />
              </div>
              <CustomDropdown
                label="Select Effort Level"
                options={["Beginner", "Intermediate", "Advanced"]}
                selectedOption={effortLevel}
                setSelectedOption={setEffortLevel}
              />
            </div>
            <div>
              <div className="flex items-center justify-center bg-gray-100 rounded p-2 mb-4 shadow-md">
                <p className="mr-2">Weekly Distance</p>
                <Info className="w-4 h-4" />
              </div>
              <CustomDropdown
                label="Select Weekly Distance"
                options={["10km", "20km", "30km", "40km"]}
                selectedOption={weeklyDistance}
                setSelectedOption={setWeeklyDistance}
              />
            </div>
          </div>
        </div>
        <div className="h-screen w-full justify-center align-middle items-center">
          <div className="flex h-[50%] w-full justify-center">
            <div className="w-[90%] justify-center items-center shadow-lg bg-gray-100 rounded-lg p-4">
              <div className="w-full h-full">
                {loading ? (
                  <Loading />
                ) : (
                  trainingPlan && (
                    <Suspense fallback={<Loading />}>
                      <TrainingPlan data={trainingPlan} />
                    </Suspense>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center mt-4">
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
