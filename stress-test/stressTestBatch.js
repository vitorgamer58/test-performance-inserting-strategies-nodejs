import http from "k6/http";
import { Rate, Trend, Counter } from "k6/metrics";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "1s", target: 100 },
    { duration: "10s", target: 100 },
    { duration: "1s", target: 0 },
  ],
};

let successRate = new Rate("successful_requests");
let failureRate = new Rate("failed_requests");
let errorRate = new Rate("error_requests");
let duration = new Trend("Duration", true);
let insertedItens = new Counter("inserted_itens");

const url = "http://127.0.0.1:3000/information";
const payload = JSON.stringify({
  itens: Array.from({ length: 1000 }, () =>
    Object({
      nome: `${Math.random()}`,
      email: `${Math.random()}`,
      tipo: "Person",
      telefone: "",
    })
  ),
});

export default function () {
  const res = http.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });

  successRate.add(res.status == 200);
  failureRate.add(res.status === 0);
  errorRate.add(res.status !== 200 && res.status !== 0);
  duration.add(res.timings.duration);

  if (res.status == 200) insertedItens.add(res.json().createdItens);

  sleep(1);
}
