import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function AdminPage() {
    return <main>Hello world</main>;
  },
  { returnTo: "/api/auth/login" },
);
