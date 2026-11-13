import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pt")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      statusCode: 301,
    });
  },
});

