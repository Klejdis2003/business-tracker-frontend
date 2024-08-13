import Container from "@/components/ui/layout/container";
import { ANALYTICS_SERVICE } from "@/service/definitions";
import ResponsiveItemDisplay from "@/components/items/responsive-item-display";
export default async function Page() {
  const analytics = (await ANALYTICS_SERVICE.getAnalyticsData()).data;

  return (
    <Container className={"space-y-8 p-8"}>
      <Container
        className={"space-x-8  align-middle justify-center"}
        flexType={"row"}
      >
        <></>
      </Container>
      <ResponsiveItemDisplay />
    </Container>
  );
}
