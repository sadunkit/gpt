import { assertEquals } from "https://deno.land/std@0.216.0/assert/mod.ts";

Deno.test(async function websocketTest() {
  const result = await new Promise((resolve) => {
    const ws = new WebSocket("ws://localhost:4488/wss");
    ws.onopen = () => {
      console.log("Connected to server");

      setInterval(() => {
        ws.send("ping");
      }, 1000);
    };
    ws.onmessage = (m) => {
      if (m.data === "pong") {
        console.log("Got pong from server");
        return;
      }
      console.log("Got message from server: ", m.data);
      ws.send(`Some message ${crypto.randomUUID()}`);
    };
    ws.onclose = () => {
      console.log("Disconnected from server");
      resolve(1);
    };
  });

  assertEquals(result, 1);
});
