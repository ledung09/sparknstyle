import { Metadata } from "next";
import HomeBanner from "./components/banner";
import HomeBrand from "./components/brand/brand";
import RoleDirector from "@/components/custom/role-director";
import { Card } from "@/components/ui/card";
import SimplicityCard from "./components/cards";
import NeedHelpSection from "./components/need-help";
import BestSeller from "./components/best-seller";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata: Metadata = {
  title: "Spark & Style",
  description:
    "Spark & Style offers chic glasses and trendy accessories to elevate your look. Discover stylish, curated pieces that help you express your unique style. Shop now and spark your style today!",
};

export default function Page() {
  return (
    <main>
      <div className="container max-w-screen-lg">
        <RoleDirector />
        <BlurFade delay={0.25} inView>
          <HomeBrand />
        </BlurFade>
        <BlurFade delay={0.25 *1.5} inView>
          <BestSeller />
        </BlurFade>
      </div>

      <BlurFade delay={0.25 * 2} inView>
        <SimplicityCard />
      </BlurFade>
      <BlurFade delay={0.25 * 2.5} inView>
        <NeedHelpSection />
      </BlurFade>
    </main>
  );
}
