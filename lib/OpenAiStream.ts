import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(payload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            // console.log("done steaming from OpenAiStreams");
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      // let msg = "";

      for await (const chunk of res.body as any) {
        // console.log("chunky", decoder.decode(chunk));
        // msg += decoder.decode(
        //   chunk.data.choices[0].delta.content
        //     ? chunk.data.choices[0].delta.content
        //     : ""
        // );
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  // console.log("stream from OpenAiStreams", stream);
  return stream;
}
