import type { Route } from "./+types/_dashboard.subscription";
import { Page } from "~/components/page";
import { BASKET_TYPES, type BasketType } from "~/lib/types";
import { TypographyH2 } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import data from "~/data/data";
import { DataCard } from "~/components/ui/info";
import { cn } from "~/lib/utils";
import { useFetcher } from "react-router";
import type { action } from "./api.subscribe-bot";
import { Spinner } from "components/ui/shadcn-io/spinner";
import { Input } from "~/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { IconAI } from "~/components/ui/icon";
import { SuggestMealDialog } from "~/components/ai/suggest-meal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import products from "~/data/products";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { mergeMapData } from "~/components/farm-map/util";

export async function loader({ context }: Route.LoaderArgs) {
  return {};
}

type BasketSubscription = { [k in BasketType]: number };

type Subscription = {
  baskets: BasketSubscription;
} & FinalizeOfferFormValues;

export default function ManageSubscription({
  loaderData,
}: Route.ComponentProps) {
  const [subscription, setSubscription] = useState<null | Subscription>(() => {
    if (typeof localStorage === "undefined") return null;

    const sub = localStorage.getItem("subscription");
    if (sub === null) {
      return null;
    } else {
      return JSON.parse(sub);
    }
  });

  function updateSubscription(sub: Subscription) {
    localStorage.setItem("subscription", JSON.stringify(sub));
    setSubscription(sub);
  }

  return (
    <Page title="Manage Subscription">
      {typeof localStorage === "undefined" ? (
        <Spinner />
      ) : subscription === null ? (
        <CreateSubscription onChange={updateSubscription} />
      ) : (
        <EditSubscription subscription={subscription} />
      )}
    </Page>
  );
}

function CreateSubscription({
  onChange,
}: {
  onChange: (sub: Subscription) => void;
}) {
  const [country, setCountry] = useState<null | string>("pt");
  const farms = country === null ? null : data.farms[country];
  const [farm, setFarm] = useState<null | number>(0);
  const [offer, setOffer] = useState<null | BasketSubscription>(null);

  return farm === null ? (
    <>
      <TypographyH2>Welcome!</TypographyH2>
      <p>
        You're minutes away from connecting with your local community, and
        contribute to a sustainable and fair circular economy.
      </p>

      <TypographyH2>Select your location</TypographyH2>
      <Select
        onValueChange={(v) => {
          setCountry(v);
        }}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select your country..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt">Portugal</SelectItem>
          <SelectItem value="es" disabled>
            Spain
          </SelectItem>
        </SelectContent>
      </Select>

      {farms !== null && (
        <>
          <TypographyH2>Select your local farm</TypographyH2>

          {farms.map((farm, farmId) => (
            <DataCard title={farm.name}>
              <div>
                <span>{farm.address}</span>
                <div className="flex flex-row gap-x-1.5 align-middle my-4">
                  {Object.entries(BASKET_TYPES).map(([basketType, meta]) => {
                    return (
                      <div
                        className={cn(
                          "p-1 rounded-xl",
                          farm.produce.indexOf(basketType as BasketType) != -1
                            ? "bg-accent"
                            : "bg-gray-400/40 text-gray-500/80"
                        )}
                      >
                        <meta.icon size={20} />
                      </div>
                    );
                  })}
                </div>
                <Button onClick={() => setFarm(farmId)}>Continue</Button>
              </div>
            </DataCard>
          ))}
        </>
      )}
    </>
  ) : offer === null ? (
    <ChatBot onSelectOffer={(offer) => setOffer(offer)} />
  ) : (
    offer && <FinalizeOffer offer={offer} onFinalised={onChange} />
  );
}

function ChatBot({
  onSelectOffer,
}: {
  onSelectOffer: (offer: BasketSubscription) => void;
}) {
  let fetcher = useFetcher<typeof action>();
  const history = useRef<Array<any>>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fetcher.data) {
      history.current = [
        ...history.current,
        { role: "assistant", content: [fetcher.data] },
      ];
      scrollRef.current!.scrollTo(0, scrollRef.current!.scrollHeight);
    }
  }, [fetcher.data]);

  const sendMessage = useCallback((message: any) => {
    history.current = [...history.current, message];
    fetcher.submit(
      {
        history: history.current,
      },
      {
        action: "/api/subscribe-bot",
        method: "post",
        encType: "application/json",
      }
    );
    scrollRef.current!.scrollTo(0, scrollRef.current!.scrollHeight);
  }, []);

  useEffect(() => {
    sendMessage({
      role: "user",
      content: [
        { type: "text", text: "The user has opened a new session with you." },
      ],
    });
  }, []);

  return (
    <>
      <TypographyH2>Let's find the perfect subscription for you</TypographyH2>

      <div className="overflow-auto" ref={scrollRef}>
        <div className="">
          {history.current.slice(1).map((msg) => {
            if (msg.role === "user") {
              return <Message source="user">{msg.content[0].content}</Message>;
            } else {
              if (msg.content[0].name === "text_message") {
                return (
                  <Message source="assistant">
                    {msg.content[0].input.message}
                  </Message>
                );
              } else if (msg.content[0].name === "offer") {
                return (
                  <Message source="assistant">
                    {msg.content[0].input.message}
                    <div className="my-2">
                      {Object.entries(BASKET_TYPES).map(([k, basket]) => {
                        return (
                          <div className="flex flex-row gap-x-2">
                            <basket.icon /> {basket.label} -{" "}
                            {msg.content[0].input.offer[k] === 0
                              ? "none"
                              : `${msg.content[0].input.offer[k]} basket${
                                  msg.content[0].input.offer[k] > 1 ? "s" : ""
                                } per week`}
                          </div>
                        );
                      })}
                    </div>

                    <Button
                      onClick={() => onSelectOffer(msg.content[0].input.offer)}
                    >
                      Accept
                    </Button>
                  </Message>
                );
              }
            }
          })}
        </div>

        {fetcher.state !== "idle" ? <Spinner /> : null}
      </div>

      <div className="mt-auto w-full">
        <form
          onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);

            sendMessage({
              role: "user",
              content: [
                {
                  type: "tool_result",
                  tool_use_id:
                    history.current[history.current.length - 1].content[0].id,
                  content: formData.get("message"),
                },
              ],
            });

            e.currentTarget.reset();
            e.preventDefault();
          }}
        >
          <Input
            type="text"
            name="message"
            disabled={fetcher.state !== "idle"}
          />
        </form>
      </div>
    </>
  );
}

const finalizeOfferSchema = z.object({
  fullName: z.string().nonempty("Full name can't be empty"),
  email: z.string().nonempty("Email can't be empty"),
  address: z.string().nonempty("Address can't be empty"),
  phone: z.string().nonempty("Phone number can't be empty"),
});

type FinalizeOfferFormValues = z.infer<typeof finalizeOfferSchema>;

function FinalizeOffer({
  offer,
  onFinalised,
}: {
  offer: BasketSubscription;
  onFinalised: (sub: Subscription) => void;
}) {
  const form = useForm<FinalizeOfferFormValues>({
    resolver: zodResolver(finalizeOfferSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      phone: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: FinalizeOfferFormValues) {
    onFinalised({ ...data, baskets: offer });
  }

  return (
    <>
      <TypographyH2>Let's confirm your subscription</TypographyH2>
      {Object.entries(BASKET_TYPES).map(([k, basket]) => {
        return (
          <div className="flex flex-row gap-x-2">
            <basket.icon /> {basket.label} -{" "}
            {offer[k] === 0
              ? "none"
              : `${offer[k]} basket${offer[k] > 1 ? "s" : ""} per week`}
          </div>
        );
      })}

      <TypographyH2>Input your personal details</TypographyH2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-3"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Subscribe</Button>
        </form>
      </Form>
    </>
  );
}

function Message({
  source,
  children,
}: {
  source: "user" | "assistant";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg mb-2 border-1 border-border",
        source === "user" ? "bg-chat-sent" : "bg-chat-received"
      )}
    >
      <div className="font-semibold mb-2">
        {source === "user" ? "You" : "Agent"}:
      </div>
      {children}
    </div>
  );
}

const CURR_MONTH = 9;
const N_MONTHS = 3;

const MONTH_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const months = [
  ...MONTH_NUMBERS.slice(CURR_MONTH - 1),
  ...MONTH_NUMBERS.slice(0, CURR_MONTH - 1),
].slice(0, N_MONTHS);

function EditSubscription({ subscription }: { subscription: Subscription }) {
  const mergedAllocation = mergeMapData(
    data.allocations.total,
    subscription.baskets
  );

  return (
    <>
      <div
        className={cn("overflow-auto shrink-0 flex flex-col w-full gap-y-4")}
      >
        <FarmMapLegend allocation={mergedAllocation} />

        <TypographyH2>Monthly Schedule</TypographyH2>
        {months.map((month, i) => (
          <MonthCard month={month} defaultCollapsed={i !== 0} />
        ))}
      </div>
    </>
  );
}

function getMonthName(month: number) {
  return MONTH_NAMES[month - 1];
}

function MonthCard({
  month,
  defaultCollapsed,
}: {
  month: number;
  defaultCollapsed?: boolean;
}) {
  const monthCrops = Object.entries(products).filter(([k, v]) => {
    if (!v.seasonal) return true;
    if (v.seasonal) {
      const userZoneCrop = v.zones[data.user.zone];

      if (userZoneCrop.start > userZoneCrop.end) {
        return month >= userZoneCrop.start || month <= userZoneCrop.end;
      } else {
        return userZoneCrop.start <= month && userZoneCrop.end >= month;
      }
    }
  });

  const vegetables = monthCrops.filter(([k, v]) => v.type === "vegetable");
  const fruits = monthCrops.filter(([k, v]) => v.type === "fruit");
  const others = monthCrops.filter(
    ([k, v]) => v.type !== "fruit" && v.type !== "vegetable"
  );

  const availableIngredients = monthCrops.map(([k, v]) => {
    return {
      name: k,
      ...v,
    };
  });

  return (
    <DataCard
      title={getMonthName(month)}
      collapsible
      defaultCollapsed={defaultCollapsed}
    >
      <div className="pt-2 flex flex-col">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              Suggest Meals <IconAI />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-h-[40vh]">
            <SuggestMealDialog
              data={{
                availableIngredients,
              }}
            />
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={3} className="w-[100px]">
                Product
              </TableHead>
              <TableHead colSpan={8}>Nutrition (per 100g)</TableHead>
            </TableRow>
            <TableRow>
              <TableHead rowSpan={2}> Energy</TableHead>
              <TableHead colSpan={2}>Fat</TableHead>
              <TableHead colSpan={2}>Carbohydrate</TableHead>
              <TableHead rowSpan={2}>Protein</TableHead>
              <TableHead rowSpan={2}>Sodium</TableHead>
              <TableHead rowSpan={2}>Fiber</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Total</TableHead>
              <TableHead>Saturated</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Sugars</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(
              [
                ["Vegetables", vegetables],
                ["Fruit", fruits],
                ["Others", others],
              ] as const
            ).map(([label, arr]) => {
              return arr.map(([name, p]) => (
                <TableRow>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{p.nutrition.energyKcal} kcal</TableCell>
                  <TableCell>{p.nutrition.fat.totalGrams} g</TableCell>
                  <TableCell>{p.nutrition.fat.saturatesGrams} g</TableCell>
                  <TableCell>{p.nutrition.carbohydrate.totalGrams} g</TableCell>
                  <TableCell>
                    {p.nutrition.carbohydrate.sugarsGrams} g
                  </TableCell>
                  <TableCell>{p.nutrition.proteinGrams} g</TableCell>
                  <TableCell>{p.nutrition.sodiumMilligrams} mg</TableCell>
                  <TableCell>{p.nutrition.fiberGrams} g</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </div>
    </DataCard>
  );
}
