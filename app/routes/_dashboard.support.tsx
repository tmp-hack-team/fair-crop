import type { Route } from "./+types/_dashboard.subscription";
import { Page } from "~/components/page";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "~/lib/utils";
import { useFetcher } from "react-router";
import type { action } from "./api.subscribe-bot";
import { Spinner } from "components/ui/shadcn-io/spinner";
import { Input } from "~/components/ui/input";
export async function loader({ context }: Route.LoaderArgs) {
  return {};
}

export default function QuestionsAndAnswers({
  loaderData,
}: Route.ComponentProps) {
  return (
    <Page title="AI Support">
      <ChatBot />
    </Page>
  );
}

function ChatBot({}: {}) {
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

  const sendMessage = function (message: any) {
    history.current = [...history.current, message];
    fetcher.submit(
      {
        history: history.current,
      },
      {
        action: "/api/qa-bot",
        method: "post",
        encType: "application/json",
      }
    );
    scrollRef.current!.scrollTo(0, scrollRef.current!.scrollHeight);
  };

  useEffect(() => {
    console.log("USE EFFECT!");

    sendMessage({
      role: "user",
      content: [
        { type: "text", text: "The user has opened a new session with you." },
      ],
    });
  }, []);

  return (
    <>
      <div className="overflow-auto h-full w-full" ref={scrollRef}>
        <div className="">
          {history.current.slice(1).map((msg, i) => {
            if (msg.role === "user") {
              return (
                <Message key={i} source="user">
                  {msg.content[0].text}
                </Message>
              );
            } else {
              console.log(msg);
              return (
                <Message key={i} source="assistant">
                  {msg.content[0].text}
                </Message>
              );
            }
          })}

          {fetcher.state !== "idle" ? (
            <Message source="assistant">
              <Spinner />
            </Message>
          ) : null}
        </div>
      </div>

      <div className="mt-auto w-full">
        <form
          onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);

            sendMessage({
              role: "user",
              content: [
                {
                  type: "text",
                  text: formData.get("message"),
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
