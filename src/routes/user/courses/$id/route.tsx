import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

interface GenerateResponse {
  jobId?: string;
  certificateUrl?: string;
  id?: string;
  certificateNumber?: string;
  issuedAt?: string;
  createdDate?: string;
  message?: string;
  course?: { title: string };
  student?: { firstName: string; lastName: string };
}

interface JobStatusResponse {
  status: "in_progress" | "completed" | "failed";
  certificate?: CertificateResponse;
  message?: string;
}

interface CourseProgressResponse {
  message?: string;
  data: {
    courseId: string;
    totalContent: number;
    completedContent: number;
    totalAssessments: number;
    completedAssessments: number;
    progress: number;
    isCompleted: boolean;
  };
}

function RouteComponent() {
  const { id } = Route.useParams();
  const modalRef = useRef<ModalHandle>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateResponse | null>(null);

  const items: NavItem[] = [
    { label: "Dashboard", icon: LayoutGrid, to: "/user", exact: true },
    { label: "Course", icon: BookOpen, to: "/user/courses/$id", exact: true },
  ];

  const progressQuery = useQuery({
    queryKey: ["course-progress", id],
    queryFn: async () => {
      const { data } = await apiClient.get<CourseProgressResponse>(
        "/orders/course-progress/" + id,
      );
      return data;
    },
  });

  const isCompleted = progressQuery.data?.data?.isCompleted ?? false;

  // Poll job status every 4 s while a jobId is active.
  const jobStatusQuery = useQuery<JobStatusResponse>({
    queryKey: ["certificate-job", jobId],
    queryFn: async () => {
      const { data } = await apiClient.get<JobStatusResponse>(
        `certificates/generate/${jobId}/status`,
      );
      return data;
    },
    enabled: !!jobId,
    refetchInterval: 4000,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    if (!jobStatusQuery.data) return;
    const { status, certificate: cert, message } = jobStatusQuery.data;
    if (status === "completed") {
      setJobId(null); // stops polling
      if (cert) {
        setCertificate(cert);
        toast.success(message ?? "Certificate ready.");
        modalRef.current?.open();
      } else {
        toast.error("Certificate completed but no data returned.");
      }
    } else if (status === "failed") {
      setJobId(null);
      toast.error(message ?? "Certificate generation failed. Please try again.");
    }
  }, [jobStatusQuery.data]);

  const generateCertificate = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<GenerateResponse>(
        "certificates/generate",
        { courseId: id },
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.jobId) {
        // First-time generation — background job started.
        setJobId(data.jobId);
        toast.info("Generating your certificate in the background…");
      } else if (data.certificateUrl) {
        // Already generated — returned directly.
        setCertificate(data as CertificateResponse);
        toast.success(data.message ?? "Certificate ready.");
        modalRef.current?.open();
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    },
    onError: (err) => {
      toast.error(extract_message(err));
    },
  });

  const isGenerating = generateCertificate.isPending || !!jobId;

  return (
    <section className="flex flex-1 flex-col">
      <header className="flex w-full flex-wrap items-center justify-between gap-3 border-b border-base-300 bg-base-100 px-4 py-2">
        <nav className="flex flex-wrap items-center gap-2">
          {items.map((item) => (
            <NavLink key={item.label} item={item} id={id} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => generateCertificate.mutate()}
          disabled={isGenerating || progressQuery.isLoading || !isCompleted}
          title={
            !isCompleted
              ? "Complete the course to unlock your certificate"
              : undefined
          }
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-accent px-3 py-2  font-medium text-accent-content transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Award className="h-4 w-4" />
          )}
          {isGenerating ? "Generating..." : "Get Certificate"}
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
          <p className=" text-base-content/60">{certificate.course.title}</p>
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
    <div className="flex items-center justify-between gap-4 px-4 py-3 ">
      <dt className="text-base-content/55">{label}</dt>
      <dd className="font-medium text-accent">{value}</dd>
    </div>
  );
}

function NavLink({ item, id }: { item: NavItem; id: string }) {
  const { icon: Icon, label, to, exact } = item;
  const base =
    "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2  font-medium transition-colors sm:px-4";

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
