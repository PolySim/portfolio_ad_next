import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AboutType } from "@/model/aboutModel";
import Link from "next/link";
import AdminAboutForm from "@/ui/Admin/About/AboutForm";

const getBiography = async () => {
  "use server";
  try {
    return await fetch(`${process.env.API_URL}/api/about`, {
      method: "GET",
      next: { tags: ["about"] },
    }).then((res) => res.json() as Promise<AboutType>);
  } catch (e) {
    return { fr: "", en: "" };
  }
};

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
