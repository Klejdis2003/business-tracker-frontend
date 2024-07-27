import {HttpClient} from "@/service/tools/http-client";
import {Item} from "@/definitions";
import {axiosHttpClient} from "@/service/definitions";
import {getImageUrlFromBuffer} from "../../util/image-util";

export class ItemService {
    constructor(private httpClient: HttpClient) {}

    async getItems(): Promise<Item[]> {
        const response = await this.httpClient.GET<Item[]>("/items");
        if(response.data) {
            for(const item of response.data) {
                const arrayBuffer = await axiosHttpClient.get<ArrayBuffer>(item.imageUrl, {responseType: "arraybuffer"});
                const fileFormat = item.imageUrl.split(".").pop();
                item.imageUrl = getImageUrlFromBuffer(arrayBuffer.data, fileFormat!);
            }
            return response.data;
        }
        else throw new Error("An error occurred while fetching items");
    }
}
