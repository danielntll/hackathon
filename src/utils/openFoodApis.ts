import { enumPantryUnit } from "../enums/enumPantryUnit";
import { typeOpenFoodNutriScore } from "../types/type__OpenFood__NutriScore";
import {
  typeOpenFoodBasicInfo,
  typeOpenFoodQuantityUnitInfo,
} from "../types/typeOpenFoodBasicInfo";

export const getBasicProductInfo = async (
  id: string
): Promise<typeOpenFoodBasicInfo> => {
  const baseUrl = import.meta.env.VITE_OPENFOODFACTS_API_URL;
  const productNameApiUrl = `${baseUrl}/product/${id}?product_type=all&fields=product_name`;
  const productImageApiUrl = `${baseUrl}/product/${id}?product_type=all&fields=image_url`;
  const productBrandTagsApiUrl = `${baseUrl}/product/${id}?product_type=all&fields=brands_tags`;
  try {
    const [nameResponse, imageResponse, brandResponse] = await Promise.all([
      fetch(productNameApiUrl),
      fetch(productImageApiUrl),
      fetch(productBrandTagsApiUrl),
    ]);

    const [nameData, imageData, brandData] = await Promise.all([
      nameResponse.json(),
      imageResponse.json(),
      brandResponse.json(),
    ]);

    const basicInfo: typeOpenFoodBasicInfo = {
      name: nameData.product.product_name,
      image_url: imageData.product.image_url,
      brands_tags: brandData.product.brands_tags,
    };

    return basicInfo;
  } catch (error) {
    console.error("Error fetching data from OpenFoodFacts:", error);
    throw error;
  }
};

export const getProductQuantityUnitInfo = async (
  id: string
): Promise<typeOpenFoodQuantityUnitInfo> => {
  const baseUrl = import.meta.env.VITE_OPENFOODFACTS_API_URL;
  const productQuantityUnitApiUrl = `${baseUrl}/product/${id}?product_type=all&fields=product_quantity_unit`;
  const productQuantityApiUrl = `${baseUrl}/product/${id}?product_type=all&fields=product_quantity`;
  try {
    const [quantityUnitResponse, quantityResponse] = await Promise.all([
      fetch(productQuantityUnitApiUrl),
      fetch(productQuantityApiUrl),
    ]);

    const [quantityUnitData, quantityData] = await Promise.all([
      quantityUnitResponse.json(),
      quantityResponse.json(),
    ]);

    const quantityUnitInfo: typeOpenFoodQuantityUnitInfo = {
      product_quantity_unit: quantityUnitData.product
        .product_quantity_unit as enumPantryUnit,
      product_quantity: quantityData.product.product_quantity,
    };

    return quantityUnitInfo;
  } catch (error) {
    console.error("Error fetching data from OpenFoodFacts:", error);
    throw error;
  }
};

export const getProductNutriScore = async (
  id: string
): Promise<typeOpenFoodNutriScore> => {
  const baseUrl = import.meta.env.VITE_OPENFOODFACTS_API_URL;
  const productNutriScoreApiUrl = `${baseUrl}/product/${id}?product_type=all&fields=nutriscore_data`;
  try {
    const response = await fetch(productNutriScoreApiUrl);
    const data = await response.json();
    console.log(data);
    const nutriScore: typeOpenFoodNutriScore = {
      nutri_score: data.product.nutriscore_data.grade,
      nutri_score_data: data.product.nutriscore_data.components,
    };
    return nutriScore;
  } catch (error) {
    console.error("Error fetching data from OpenFoodFacts:", error);
    throw error;
  }
};
