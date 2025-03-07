import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import AdminAboutForm from "@/ui/Admin/About/AboutForm";

import { getBiography } from "@/actions/about";

export default withPageAuthRequired(
  async function AdminAboutPage() {
    const biography = await getBiography();
    return (
      <main>
        <div className="mx-6 md:mx-auto w-fit">
          <Link
            href="/admin"
            className="font-bold text-customblue-300 font-m2 text-3xl"
          >
            Retour au menu admin
          </Link>
        </div>
        <AdminAboutForm biography={biography} />
      </main>
    );
  },
  { returnTo: "/api/auth/login" },
);
