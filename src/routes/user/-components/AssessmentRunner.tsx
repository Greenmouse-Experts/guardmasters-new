import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  ClipboardList,
  Clock,
  Loader2,
  Minus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import type {
  AttemptResponse,
  LessonSub,
  QuestionsResponse,
} from "#/types/learn.ts";

interface AnswerEntry {
  question: string;
  choice: number;
}

interface Props {
  sub: LessonSub;
  courseId: string;
  done: boolean;
  onClose: () => void;
}

// Drives a single assessment end-to-end inside a modal: intro → quiz → result.
// Already-completed assessments jump straight to the result review.
export default function AssessmentRunner({
  sub,
  courseId,
  done,
  onClose,
}: Props) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">(
    done ? "result" : "intro",
  );

  // Reset when switching to a different assessment or once it's submitted.
  useEffect(() => {
    setPhase(done ? "result" : "intro");
  }, [sub.id, done]);

  if (phase === "intro") {
    return <Intro sub={sub} onStart={() => setPhase("quiz")} />;
  }

  if (phase === "quiz") {
    return (
      <Quiz
        sub={sub}
        courseId={courseId}
        onSubmitted={() => setPhase("result")}
      />
    );
  }

  return <Results sub={sub} courseId={courseId} onClose={onClose} />;
}

function Intro({ sub, onStart }: { sub: LessonSub; onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
        <ClipboardList className="h-8 w-8" />
      </span>
      <h3 className="text-lg font-semibold text-accent">{sub.title}</h3>
      <p className="text-sm text-base-content/60">
        Duration:{" "}
        <span className="font-semibold text-base-content">
          {sub.duration} min{sub.duration !== 1 ? "s" : ""}
        </span>
      </p>
      <p className="max-w-sm text-sm leading-relaxed text-base-content/55">
        The timer starts as soon as you begin. Your answers are submitted
        automatically when the time runs out.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-2 w-full max-w-xs rounded-md bg-accent py-3 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90"
      >
        Start Assessment
      </button>
    </div>
  );
}

function Quiz({
  sub,
  courseId,
  onSubmitted,
}: {
  sub: LessonSub;
  courseId: string;
  onSubmitted: () => void;
}) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<QuestionsResponse>({
    queryKey: ["assessment-questions", sub.id],
    queryFn: async () => {
      const resp = await apiClient.get(
        `/orders/assessment-questions/${sub.id}`,
        { headers: { "Course-Request-Id": courseId } },
      );
      return resp.data;
    },
    retry: 0,
  });

  const questions = data?.data ?? [];
  const [answers, setAnswers] = useState<AnswerEntry[]>([]);
  const [index, setIndex] = useState(0);

  const submittedRef = useRef(false);
  const submit = useMutation({
    mutationFn: async () => {
      await apiClient.post(
        "/orders/attempt",
        { attempt: answers, courseContentSub: sub.id },
        { headers: { "Course-Request-Id": courseId } },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-course", courseId] });
      onSubmitted();
    },
    onError: (err: any) => {
      submittedRef.current = false;
      toast.error(
        err?.response?.data?.message ?? "Could not submit your answers.",
      );
    },
  });

  function handleSubmit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submit.mutate();
  }

  function selectOption(questionId: string, choice: number) {
    setAnswers((prev) => [
      ...prev.filter((a) => a.question !== questionId),
      { question: questionId, choice },
    ]);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-base-content/50">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading questions...
      </div>
    );
  }

  if (isError || questions.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-base-content/55">
        No questions are available for this assessment.
      </p>
    );
  }

  const question = questions[index];
  const selected = answers.find((a) => a.question === question.id)?.choice;
  const isLast = index === questions.length - 1;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Timer minutes={sub.duration} onTimeout={handleSubmit} />
        <p className="text-sm font-medium text-base-content/60">
          {questions.length} Question{questions.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="rounded-lg border border-base-300 p-5">
        <p className="text-xs tracking-wide text-base-content/45 uppercase">
          Question {index + 1} of {questions.length}
        </p>
        <p className="mt-2 font-medium text-accent">{question.question}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {question.options.map((option, i) => {
            // Match the platform convention: choices are 1-based.
            const value = i + 1;
            const active = selected === value;
            return (
              <button
                type="button"
                key={i}
                onClick={() => selectOption(question.id, value)}
                className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                  active
                    ? "border-secondary bg-secondary/10 text-accent"
                    : "border-base-300 hover:bg-base-200"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    active ? "border-secondary" : "border-base-content/30"
                  }`}
                >
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                  )}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-md border border-base-300 px-6 py-2 text-sm font-medium text-base-content/70 transition-colors hover:bg-base-200 disabled:invisible"
        >
          Prev
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submit.isPending}
            className="flex items-center gap-2 rounded-md bg-secondary px-6 py-2 text-sm font-medium text-secondary-content transition-colors hover:bg-secondary/90 disabled:opacity-60"
          >
            {submit.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {submit.isPending ? "Submitting" : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            className="rounded-md bg-secondary px-6 py-2 text-sm font-medium text-secondary-content transition-colors hover:bg-secondary/90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function Timer({
  minutes,
  onTimeout,
}: {
  minutes: number;
  onTimeout: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, minutes) * 60);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const low = timeLeft <= 30;

  return (
    <span
      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold ${
        low ? "bg-error/10 text-error" : "bg-base-200 text-base-content/70"
      }`}
    >
      <Clock className="h-4 w-4" />
      {mm}:{ss}
    </span>
  );
}

function Results({
  sub,
  courseId,
  onClose,
}: {
  sub: LessonSub;
  courseId: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useQuery<AttemptResponse>({
    queryKey: ["assessment-attempt", sub.id],
    queryFn: async () => {
      const resp = await apiClient.get(`/orders/fetch-attempts/${sub.id}`, {
        headers: { "Course-Request-Id": courseId },
      });
      return resp.data;
    },
    retry: 0,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-base-content/50">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading your result...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="py-16 text-center text-sm text-error">
        Could not load this attempt.
      </p>
    );
  }

  const { result, attempt } = data.data;

  return (
    <div className="space-y-5">
      {/* Score summary */}
      <div className="rounded-lg bg-base-200 py-5 text-center">
        <p className="text-xs tracking-wide text-base-content/50 uppercase">
          Your Score
        </p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <p className="text-2xl font-bold text-accent">
            <span className="text-secondary">{result.score}</span>/{result.total}
          </p>
          <Minus className="h-4 w-4 text-base-content/40" />
          <p className="text-2xl font-bold text-accent">{result.percent}%</p>
        </div>
      </div>

      {/* Reviewed questions */}
      <ol className="space-y-4">
        {attempt.map((answer, index) => {
          const q = answer.assessmentQuestion;
          const correct = answer.choice === q.correctOption;
          return (
            <li key={answer.id} className="rounded-lg border border-base-300 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-accent">
                  {index + 1}. {q.question}
                </p>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    correct
                      ? "bg-success/15 text-success"
                      : "bg-error/15 text-error"
                  }`}
                >
                  {correct ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div
                  className={`rounded-md border px-3 py-2 ${
                    correct
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-error/40 bg-error/10 text-error"
                  }`}
                >
                  <p className="text-xs text-base-content/55">Your answer</p>
                  <p className="font-medium">{q.options[answer.choice]}</p>
                </div>
                {!correct && (
                  <div className="rounded-md border border-success/40 bg-success/10 px-3 py-2 text-success">
                    <p className="text-xs text-base-content/55">
                      Correct answer
                    </p>
                    <p className="font-medium">{q.options[q.correctOption]}</p>
                  </div>
                )}
              </div>

              <p className="mt-2 text-xs text-base-content/45">
                {q.point} point{q.point !== 1 ? "s" : ""}
              </p>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-md bg-accent py-3 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90"
      >
        Close
      </button>
    </div>
  );
}
