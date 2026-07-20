import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import { set_profile_value, useProfile } from "#/store/authStore.ts";
import ProfilePhoto from "./-components/ProfilePhoto";

export const Route = createFileRoute("/user/settings/")({
  component: RouteComponent,
});

interface ProfileForm {
  firstName: string;
  lastName: string;
  address: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  bio: string;
}

function RouteComponent() {
  const [profile] = useProfile();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileForm>({
    values: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      address: profile?.address ?? "",
      facebookUrl: profile?.facebookUrl ?? "",
      twitterUrl: profile?.twitterUrl ?? "",
      linkedinUrl: profile?.linkedinUrl ?? "",
      bio: profile?.bio ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: ProfileForm) => {
      await apiClient.post("/auth/update-profile", payload);
      return payload;
    },
    onSuccess: (payload) => {
      if (profile) set_profile_value({ ...profile, ...payload });
      toast.success("Profile updated.");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Could not update profile. Try again.",
      );
    },
  });

  const registrationDate = profile?.createdDate
    ? new Date(profile.createdDate).toLocaleDateString(undefined, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-2xl font-semibold text-accent">My Profile</h1>

      <div className="rounded-lg border border-base-300 bg-base-100 p-6 md:p-8">
        <ProfilePhoto />
      </div>

      {/* Read-only details */}
      <div className="rounded-lg border border-base-300 bg-base-100 p-6 md:p-8">
        <dl className="divide-y divide-base-200">
          <ReadonlyRow label="Registration Date" value={registrationDate} />
          <ReadonlyRow label="Email" value={profile?.email ?? "N/A"} />
          <ReadonlyRow label="Phone Number" value={profile?.phone ?? "N/A"} />
        </dl>
      </div>

      {/* Editable form */}
      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="space-y-6 rounded-lg border border-base-300 bg-base-100 p-6 md:p-8"
      >
        <h2 className="text-lg font-semibold text-accent">Edit Profile</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="First Name" {...register("firstName")} />
          <Field label="Last Name" {...register("lastName")} />
        </div>

        <Field label="Address" {...register("address")} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Facebook Link" {...register("facebookUrl")} />
          <Field label="Twitter Link" {...register("twitterUrl")} />
        </div>

        <Field label="LinkedIn Link" {...register("linkedinUrl")} />

        <div>
          <Label>Bio</Label>
          <textarea
            rows={4}
            {...register("bio")}
            className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-sm bg-secondary px-8 py-3  font-medium text-secondary-content transition-colors hover:bg-secondary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

function ReadonlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:items-center">
      <dt className=" font-medium text-base-content/50">{label}</dt>
      <dd className="text-base-content sm:col-span-2">{value}</dd>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase">
      {children}
    </label>
  );
}

const Field = function Field({
  label,
  ref,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        ref={ref}
        {...props}
        className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
      />
    </div>
  );
};
