import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

interface GenerateJobResponse {
  statusCode: number;
  message?: string;
  data?: {
    jobId?: string;
    certificateId?: string;
    certificateNumber?: string;
    certificateUrl?: string;
    issuedAt?: string;
  };
}

interface JobStatusResponse {
  statusCode: number;
  message?: string;
  data?: {
    status: "completed" | "processing" | "failed";
    progress?: number;
    error?: string;
    certificate?: {
      certificateId: string;
      certificateNumber: string;
      certificateUrl: string;
      issuedAt: string;
    };
  };
}

const POLL_INTERVAL_MS = 5000;

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
  const [certificate, setCertificate] = useState<CertificateResponse | null>(
    null,
  );

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

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState<number | null>(
    null,
  );
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollCount = useRef(0);

  const pollJobStatus = useCallback(async (jobId: string) => {
    try {
      const { data } = await apiClient.get<JobStatusResponse>(
        `certificates/generate/${jobId}/status`,
      );
      const statusData = data.data;

      if (statusData?.status === "completed" && statusData.certificate) {
        const cert = statusData.certificate;
        setCertificate({
          id: cert.certificateId,
          certificateNumber: cert.certificateNumber,
          certificateUrl: cert.certificateUrl,
          issuedAt: cert.issuedAt,
          createdDate: cert.issuedAt,
        });
        setIsGenerating(false);
        setGenerationError(null);
        toast.success(data.message ?? "Certificate ready!");
        return;
      }

      if (statusData?.status === "failed") {
        setIsGenerating(false);
        setGenerationError(statusData.error ?? "Certificate generation failed.");
        return;
      }

      pollCount.current += 1;
      setGenerationProgress(statusData?.progress ?? null);
      pollTimer.current = setTimeout(
        () => pollJobStatus(jobId),
        POLL_INTERVAL_MS,
      );
    } catch (err) {
      setIsGenerating(false);
      setGenerationError(extract_message(err));
    }
  }, []);

  const runGenerate = useCallback(async () => {
    try {
      const { data } = await apiClient.post<GenerateJobResponse>(
        "certificates/generate",
        { courseId: id },
      );

      const certData = data.data;

      if (certData?.certificateUrl) {
        setCertificate({
          id: certData.certificateId ?? "",
          certificateNumber: certData.certificateNumber ?? "",
          certificateUrl: certData.certificateUrl,
          issuedAt: certData.issuedAt ?? "",
          createdDate: certData.issuedAt ?? "",
        });
        setIsGenerating(false);
        setGenerationError(null);
        toast.success(data.message ?? "Certificate ready.");
        return;
      }

      if (certData?.jobId) {
        pollJobStatus(certData.jobId);
        return;
      }

      setIsGenerating(false);
      setGenerationError(data.message ?? "Unexpected response from server.");
    } catch (err) {
      setIsGenerating(false);
      setGenerationError(extract_message(err));
    }
  }, [id, pollJobStatus]);

  const startGenerate = useCallback(() => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGenerationError(null);
    setGenerationProgress(null);
    pollCount.current = 0;
    setCertificate(null);
    modalRef.current?.open();
    runGenerate();
  }, [isGenerating, runGenerate]);

  useEffect(() => {
    if (certificate) {
      modalRef.current?.open();
    }
  }, [certificate]);

  useEffect(
    () => () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    },
    [],
  );

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
          onClick={startGenerate}
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

      <Modal
        ref={modalRef}
        title={
          certificate
            ? "Your Certificate"
            : generationError
              ? "Generation Failed"
              : "Generating Certificate"
        }
      >
        {isGenerating && !certificate && !generationError && (
          <GeneratingView
            progress={generationProgress}
            pollCount={pollCount.current}
          />
        )}
        {generationError && (
          <ErrorView
            message={generationError}
            onRetry={startGenerate}
            onClose={() => {
              setGenerationError(null);
              modalRef.current?.close();
            }}
          />
        )}
        {certificate && <CertificateView certificate={certificate} />}
      </Modal>
    </section>
  );
}

function GeneratingView({
  progress,
  pollCount,
}: {
  progress: number | null;
  pollCount: number;
}) {
  const message =
    pollCount <= 1
      ? "Preparing your certificate..."
      : pollCount <= 3
        ? "Still working on it..."
        : "Almost done, thanks for your patience!";

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <Loader2 className="h-14 w-14 animate-spin text-secondary" />
        <h3 className="text-lg font-semibold text-accent">
          Generating Your Certificate
        </h3>
        <p className="text-base-content/60">{message}</p>
      </div>
      {progress != null ? (
        <progress
          className="progress progress-secondary w-full"
          value={progress}
          max={100}
        />
      ) : (
        <progress className="progress progress-secondary w-full" />
      )}
      <p className="text-center text-sm text-base-content/40">
        This may take a moment. Please don't close this page.
      </p>
    </div>
  );
}

function ErrorView({
  message,
  onRetry,
  onClose,
}: {
  message: string;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
          <Award className="h-7 w-7" />
        </span>
        <h3 className="text-lg font-semibold text-accent">
          Certificate generation failed
        </h3>
        <p className="text-base-content/60">{message}</p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="btn flex-1 gap-2 rounded-md border-none bg-base-200 py-3 font-medium text-base-content hover:bg-base-300"
        >
          Close
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="btn flex-1 gap-2 rounded-md border-none bg-secondary py-3 font-medium text-secondary-content hover:bg-secondary/90"
        >
          Try Again
        </button>
      </div>
    </div>
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
