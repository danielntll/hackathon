import { parse } from "date-fns";

import { differenceInDays } from "date-fns";
import { typeExpirationData } from "../types/typeExpirationData";

export function daysUntilExpiration(
  expirationDate?: string
): typeExpirationData {
  try {
    if (!expirationDate) return { days: 0, color: "primary" };
    const exp = parse(expirationDate, "dd/MM/yyyy", new Date());
    if (isNaN(exp.getTime())) return { days: 0, color: "primary" };
    const today = new Date();
    const daysUntilExpiration = differenceInDays(exp, today);
    if (daysUntilExpiration <= 0)
      return { days: daysUntilExpiration, color: "danger" };
    if (daysUntilExpiration <= 3)
      return { days: daysUntilExpiration, color: "warning" };
    return { days: daysUntilExpiration, color: "primary" };
  } catch (error) {
    console.error("Error calculating expiration days:", error);
    return { days: 0, color: "primary" };
  }
}
