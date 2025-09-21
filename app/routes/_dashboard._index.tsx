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
        <Link to={"/allocation"}>View Production</Link>
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
      {/*       <p>
        <strong>Welcome to FairCrop</strong>, the platform that connects
        consumers directly with local farms through Community-Supported
        Agriculture (CSA) programs. Our service allows you to find and subscribe
        to a farm share in your area, securing your portion of the upcoming
        harvest.
      </p>

      <p>
        Community-Supported Agriculture (CSA) is a food production and
        distribution system where consumers buy "shares" in a farm's harvest in
        advance. This membership model provides the farm with operating capital
        at the beginning of the growing season. In exchange, members receive a
        regular distribution of the farm's produce throughout the season.
      </p>

      <p>
        The contents of each distribution, or "basket," vary based on the
        seasonal availability of crops. This model establishes a direct
        relationship between the producer and the consumer. Members receive
        fresh, locally-grown food and gain a better understanding of seasonal
        agriculture. For farmers, the CSA model secures a reliable market and
        income stream while fostering a connection with the community they feed.
      </p>

      <p>
        Subscribers to a CSA acknowledge a shared risk with the farmer. A poor
        harvest due to weather or other factors may result in smaller shares,
        just as a bountiful harvest is passed on to the members. This principle
        of shared investment is fundamental to the CSA model.
      </p>
 */}{" "}
    </Page>
  );
}
