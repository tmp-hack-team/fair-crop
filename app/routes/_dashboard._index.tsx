import { Link } from "react-router";
import { Page } from "~/components/page";
import { Button } from "~/components/ui/button";
import { TypographyH2 } from "~/components/ui/typography";

export default function () {
  return (
    <Page title="About CSA" className="max-w-[50em]">
      <img src="/images/crops.jpg" />
      <TypographyH2>What is CSA?</TypographyH2>
      <p>
        CSA (Community Supported Agriculture) aims to connect consumers directly
        with local farmers. By purchasing a share of the season's produce in
        advance, CSA members directly support local farmers and receive a
        Harvest Basket filled with fresh, local, sustainably grown veggies on a
        weekly basis.
      </p>
      <Button size="lg" asChild>
        <Link to={"/production"}>View Production</Link>
      </Button>
      <TypographyH2 className="mt-4">How can I get involved?</TypographyH2>
      <p>
        Our platform offers a simple, streamlined way to connect with your local
        farmer. We ensure the integrity and sustainability of all the
        co-producers who work with us, and do our best to create a viable
        alternative, striving to best the traditional consumer market in all
        aspects.
      </p>
      <Button size="lg" asChild>
        <Link to={"/subscription"}>Sign Up Today</Link>
      </Button>
      <TypographyH2 className="mt-4">How do I learn more?</TypographyH2>
      <p>
        Our AI assistant is ready 24/7 to answer all your questions about
        FairCrop, and CSA in general. Press <em>AI Support</em> in the Sidebar
        or click the button below to clarify all your questions and doubts!
      </p>
      <Button size="lg" asChild>
        <Link to={"/support"}>24/7 Support</Link>
      </Button>
    </Page>
  );
}
