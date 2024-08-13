import { Item } from "@/type-definitions";
import { businessApiClient } from "@/service/definitions";
import { getImageUrlFromBuffer } from "@/util/image-util";
import { AxiosInstance } from "axios";

export class ItemService {
  constructor(private httpClient: AxiosInstance) {}
  private async replaceItemUrl(item: Item) {
    const arrayBuffer = await businessApiClient.get<ArrayBuffer>(
      item.imageUrl,
      {
        responseType: "arraybuffer",
      },
    );
    const fileFormat = item.imageUrl.split(".").pop();
    item.imageUrl = getImageUrlFromBuffer(arrayBuffer.data, fileFormat!);
  }

  async getItems(): Promise<Item[]> {
    const response = await this.httpClient.get<Item[]>("/items");
    if (response.data) {
      for (const item of response.data) {
        await this.replaceItemUrl(item);
      }
      return response.data;
    } else throw new Error("An error occurred while fetching items");
  }
}
