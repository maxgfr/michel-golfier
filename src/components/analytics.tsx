import { SpeedInsights } from "@vercel/speed-insights/react";
import { useRouter } from "next/router";

export function Insights() {
  const router = useRouter();

  return <SpeedInsights route={router.pathname} />;
}
