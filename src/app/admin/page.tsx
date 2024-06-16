import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ReportType } from "@/model/reportModel";
import Link from "next/link";

async function getPages() {
  "use server";
  try {
    const reports = await fetch(`${process.env.API_URL}/api/pages`, {
      method: "GET",
    }).then((res) => res.json() as Promise<ReportType[]>);
    return [
      ...reports,
      { index: 3, title: "Portfolio" },
      { index: 1, title: "Portrait" },
      { index: 2, title: "Publication" },
      { index: 0, title: "Nouveau reportage" },
      { title: "A_propos" },
      { title: "Ordre_des_reportages" },
    ];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default withPageAuthRequired(
  async function AdminPage() {
    const pages = await getPages();

    return (
      <main>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {pages.map((page) => (
            <Link
              href={
                page.index === undefined
                  ? `/admin/${page.title}`
                  : `/admin/portfolio/${page.index}`
              }
              key={page.title}
              className="rounded-lg shadow p-6 group hover:bg-customblue-300 transition"
            >
              <h2 className="text-2xl font-helvetica group-hover:text-white transition">
                {page.title}
              </h2>
            </Link>
          ))}
        </div>
      </main>
    );
  },
  { returnTo: "/api/auth/login" },
);
