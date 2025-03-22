import { typeOpenFoodBasicInfo } from "../types/typeOpenFoodBasicInfo";

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
