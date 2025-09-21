import { Page } from "~/components/page";
import { Link } from "~/components/ui/link";
import { TypographyH2 } from "~/components/ui/typography";

export default function AboutPage() {
  return (
    <Page title="About the Team">
      <TypographyH2>Why does this exist?</TypographyH2>
      <p>
        This project was fully developed in 48 hours, on the 19, 20 and 21 of
        September 2025, by{" "}
        <Link to="https://github.com/lud0v1c">Luís Tonicha</Link> and{" "}
        <Link to="https://github.com/tiagoad">Tiago Dias</Link> (aka.{" "}
        <em>a temporary team name</em>) for the xgeeks{" "}
        <Link to="https://geekathon.dev/">geekathon '25</Link> hackathon at the{" "}
        <Link to="https://en.wikipedia.org/wiki/Est%C3%A1dio_Dr._Magalh%C3%A3es_Pessoa">
          Dr. Magalhães Pessoa Stadium
        </Link>{" "}
        in Leiria, Portugal, under the proposed theme{" "}
        <em>
          "Smart Food Factories: The Future of Food Production Powered by AI"
        </em>
        .
      </p>
      <p>
        We were inspired by witnessing other very real endevours, such as the
        CSA program being run at{" "}
        <Link to="https://www.freixoalimento.com/programa-csa">
          Montado do Freixo do Meio
        </Link>
        , in Montemor-o-Novo, as well as similar or adjacent initiatives which
        exist around the world.
      </p>

      <img src="/images/leiria.jpg" />
    </Page>
  );
}
