import { Page } from "~/components/page";

export default function () {
  return (
    <Page title="About Us" className="max-w-[50em]">
      <img src="/images/crops.jpg" />

      <p>
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
    </Page>
  );
}
