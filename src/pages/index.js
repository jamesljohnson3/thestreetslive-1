import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/layouts/index';
import {
  CallToAction,
  Features,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
} from '@/sections/index';
import { jitsuClient } from '@jitsu/sdk-js'

const Home = () => {
  const jitsu = jitsuClient({
    key: "js.y8cs68u245tm88812ogjbx.lexjddoo45eoapayedi1ob",
    tracking_host: "https://api.unlimitednow.site"
  });

  jitsu.id({
  });
  //track page views
  jitsu.track('mysite-page');



  return (
    <LandingLayout>
      <Meta
        title="My | Unlimited Now Site"
        description="Live. Grind. Surf."
      />
      <Hero />
      <Pricing />
      <Features />

      <Guides />
      <Testimonial />
      <CallToAction />
      <Footer />
    </LandingLayout>
  );
};

export default Home;
