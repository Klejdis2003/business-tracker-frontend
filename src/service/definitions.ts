import { ItemService } from "@/service/item-service";
import AuthService from "@/service/auth-service";

import { getConfiguredAxios } from "@/service/axios-config";
import AnalyticsService from "@/service/analytics-service";

export const businessApiClient = getConfiguredAxios();
export const AUTH_SERVICE = new AuthService(businessApiClient);
export const ITEM_SERVICE = new ItemService(businessApiClient);
export const ANALYTICS_SERVICE = new AnalyticsService(businessApiClient);
