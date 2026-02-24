import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useRouter } from "next/router";

export function Insights() {
  const router = useRouter();

  return (
    <>
      <Analytics />
      <SpeedInsights route={router.pathname} />
    </>
  );
}
