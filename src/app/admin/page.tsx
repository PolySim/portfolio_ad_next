import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddReportModal from "@/ui/Admin/Home/AddReportModal";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteReport from "@/ui/Admin/Home/DeleteReport";
import { getReports } from "@/actions/page";

export default withPageAuthRequired(
  async function AdminPage() {
    const reports = await getReports();
    const pages = [
      ...reports,
      { index: 3, title: "Portfolio" },
      { index: 1, title: "Portrait" },
      { index: 2, title: "Publication" },
      { index: 0, title: "Nouveau reportage" },
      { title: "A_propos" },
      { title: "Ordre_des_reportages" },
    ];

    return (
      <main>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {pages.map((page) =>
            page.index === 0 ? (
              <Dialog key={page.title}>
                <DialogTrigger asChild>
                  <div className="rounded-lg shadow-sm p-6 group hover:bg-customblue-300 transition cursor-pointer">
                    <h2 className="text-2xl font-helvetica group-hover:text-white transition">
                      {page.title}
                    </h2>
                  </div>
                </DialogTrigger>
                <AddReportModal />
              </Dialog>
            ) : (
              <div
                key={page.title}
                className="flex justify-between gap-4 rounded-lg shadow-sm p-6 group hover:bg-customblue-300 transition"
              >
                <h2 className="text-2xl font-helvetica group-hover:text-white transition">
                  {page.title}
                </h2>
                <div className="flex gap-4">
                  <Button asChild variant="default">
                    <Link
                      href={
                        page.index === undefined
                          ? `/admin/${page.title}`
                          : `/admin/portfolio/${page.index}`
                      }
                    >
                      <SquareArrowOutUpRight />
                    </Link>
                  </Button>
                  {page.index && page.index > 3 && (
                    <DeleteReport id={page.index} />
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </main>
    );
  },
  { returnTo: "/api/auth/login" },
);
