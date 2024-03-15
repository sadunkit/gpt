import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/wss", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }
  const ws = ctx.upgrade();

  ws.onopen = () => {
    console.log("Connected to client");
    ws.send("Hello from server!");
  };

  ws.onmessage = (m) => {
	if (m.data === "ping") {
		ws.send("pong");
		return;
	} else {
		console.log("Got message from client: ", m.data);
	}
  };

  ws.onclose = () => console.log("Disconncted from client");
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen();
