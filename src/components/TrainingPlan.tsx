import React from "react";
import { TrainingPlanResponse } from "@/models/trainingPlanResponse";

interface TrainingPlanProps {
  data: TrainingPlanResponse;
}

const TrainingPlan = ({ data }: TrainingPlanProps) => {
  console.log("TrainingPlan component received data:", data);

  const renderPlan = (plan: any) => {
    console.log("Rendering plan:", plan);
    if (!plan || typeof plan !== "object" || Object.keys(plan).length === 0) {
      console.log("No valid training plan data available.");
      return <p>No valid training plan data available.</p>;
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {Object.keys(plan).map((week, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{week}</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.keys(plan[week]).map((workoutKey, dayIndex) => (
                <div key={dayIndex} className="p-4 bg-gray-100 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">{workoutKey}</h3>
                  <p>{plan[week][workoutKey]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div className="h-full overflow-y-auto">{renderPlan(data.training_plan)}</div>;
};

export default TrainingPlan;
