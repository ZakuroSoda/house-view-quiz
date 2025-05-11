import type { Route } from "./+types/home";
import { Quiz } from "../quiz/quiz";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The House View Quiz" },
    { name: "description", content: "A finance quiz infused with risk management principles" },
  ];
}

export default function Play() {
  return <Quiz />;
}
