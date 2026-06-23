import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ExternalLink,
  LayoutGrid,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { extract_message } from "#/helpers/apihelpers.tsx";

export const Route = createFileRoute("/user/courses/$id")({
  component: RouteComponent,
});

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
  exact?: boolean;
}

interface CertificateResponse {
  id: string;
  certificateNumber: string;
  certificateUrl: string;
  issuedAt: string;
  createdDate: string;
  message?: string;
  course?: { title: string };
  student?: { firstName: string; lastName: string };
}

function RouteComponent() {
  const { id } = Route.useParams();
  const modalRef = useRef<ModalHandle>(null);

  const items: NavItem[] = [
    { label: "Dashboard", icon: LayoutGrid, to: "/user", exact: true },
    { label: "Course", icon: BookOpen, to: "/user/courses/$id", exact: true },
  ];

  const generateCertificate = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.get<CertificateResponse>(
        "certificates/course/" + id,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Certificate generated successfully.");
      modalRef.current?.open();
    },
    onError: (err) => {
      toast.error(extract_message(err));
    },
  });

  const certificate = generateCertificate.data;

  return (
    <section className="flex flex-1 flex-col">
      <header className="flex w-full items-center justify-between gap-3 border-b border-base-300 bg-base-100 px-4 py-2">
        <nav className="flex items-center gap-2">
          {items.map((item) => (
            <NavLink key={item.label} item={item} id={id} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => generateCertificate.mutate()}
          disabled={generateCertificate.isPending}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {generateCertificate.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Award className="h-4 w-4" />
          )}
          {generateCertificate.isPending ? "Generating..." : "Get Certificate"}
        </button>
      </header>

      <main className="pt-6">
        <Outlet />
      </main>

      <Modal ref={modalRef} title="Your Certificate">
        {certificate && <CertificateView certificate={certificate} />}
      </Modal>
    </section>
  );
}

function CertificateView({
  certificate,
}: {
  certificate: CertificateResponse;
}) {
  const studentName = [
    certificate.student?.firstName,
    certificate.student?.lastName,
  ]
    .filter(Boolean)
    .join(" ");
  const issued = new Date(certificate.issuedAt || certificate.createdDate);
  const issuedLabel = Number.isNaN(issued.getTime())
    ? ""
    : issued.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <Award className="h-7 w-7" />
        </span>
        <h3 className="text-lg font-semibold text-accent">
          Certificate Issued
        </h3>
        {certificate.course?.title && (
          <p className="text-sm text-base-content/60">
            {certificate.course.title}
          </p>
        )}
      </div>

      <dl className="divide-y divide-base-300 rounded-lg border border-base-300">
        <Row label="Certificate No." value={certificate.certificateNumber} />
        {studentName && <Row label="Awarded to" value={studentName} />}
        {issuedLabel && <Row label="Issued" value={issuedLabel} />}
      </dl>

      {/* PDF preview */}
      <iframe
        src={certificate.certificateUrl}
        title="Certificate preview"
        className="h-80 w-full rounded-lg border border-base-300"
      />

      <a
        href={certificate.certificateUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-block h-auto gap-2 rounded-md border-none bg-secondary py-3 font-medium text-secondary-content hover:bg-secondary/90"
      >
        Open Certificate
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-base-content/55">{label}</dt>
      <dd className="font-medium text-accent">{value}</dd>
    </div>
  );
}

function NavLink({ item, id }: { item: NavItem; id: string }) {
  const { icon: Icon, label, to, exact } = item;
  const base =
    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors";

  return (
    <Link
      to={to}
      params={{ id }}
      activeOptions={{ exact: !!exact }}
      activeProps={{ className: `${base} bg-accent text-accent-content` }}
      inactiveProps={{
        className: `${base} text-base-content/60 hover:bg-base-200 hover:text-base-content`,
      }}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
