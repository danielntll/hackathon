export type typeOpenFoodNutriScore = {
  nutri_score: "a" | "b" | "c" | "d" | "e";
  nutri_score_data: {
    negative: typeOpenFoodNutriScoreData[];
    positive: typeOpenFoodNutriScoreData[];
  };
};

export type typeOpenFoodNutriScoreData = {
  id: string;
  points: number;
  points_max: number;
  unit: string;
  value: number;
};
