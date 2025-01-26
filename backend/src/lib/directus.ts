import { createDirectus, rest } from "@directus/sdk";

const directusClient = createDirectus("http://localhost:8055").with(rest());

export default directusClient;
