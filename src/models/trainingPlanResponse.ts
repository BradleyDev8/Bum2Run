export interface TrainingPlanResponse {
  training_plan: {
    [key: string]: {
      [workoutKey: string]: string;
    };
  };
}
