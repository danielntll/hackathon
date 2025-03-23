export type typeOpenFoodNutriScore = {
  nutri_score: "a" | "b" | "c" | "d" | "e";
  nutri_score_data: {
    negative: {
      id: string;
      points: number;
      points_max: number;
      unit: string;
      value: number;
    }[];
    positive: {
      id: string;
      points: number;
      points_max: number;
      unit: string;
      value: number;
    }[];
  };
};
