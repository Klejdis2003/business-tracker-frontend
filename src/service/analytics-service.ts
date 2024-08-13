import { AxiosInstance } from "axios";
import { Analytics } from "@/type-definitions";

export default class AnalyticsService {
  constructor(private httpClient: AxiosInstance) {}

  async getAnalyticsData() {
    return await this.httpClient.get<Analytics>("/analytics");
  }
}
