import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import { set_profile_value, useProfile } from "#/store/authStore.ts";

export default function ProfilePhoto() {
  const [profile] = useProfile();
  const inputRef = useRef<HTMLInputElement>(null);

  const name =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Guest User";
  const initials =
    `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "GU";

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      // 1. Upload the raw image, receive a hosted URL.
      const form = new FormData();
      form.append("image", file);
      const upload = await apiClient.post<{ image: string }>(
        "upload/image",
        form,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      const picture = upload.data.image;

      // 2. Persist the URL on the user's profile.
      await apiClient.post("/auth/update-profile", { picture });
      return picture;
    },
    onSuccess: (picture) => {
      if (profile) set_profile_value({ ...profile, picture });
      toast.success("Profile photo updated.");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Could not update photo. Try again.",
      );
    },
  });

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) mutation.mutate(file);
    e.target.value = "";
  }

  return (
    <div className="flex items-center gap-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelect}
      />

      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-base-300 bg-base-200">
        {profile?.picture ? (
          <img
            src={profile.picture}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-accent">
            {initials}
          </span>
        )}
        {mutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold tracking-wide text-accent uppercase">
          {name}
        </h2>
        <span className="flex items-center gap-2 text-sm font-medium text-success">
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
          Active
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={mutation.isPending}
          className="btn btn-accent"
          aria-label="Change profile photo"
        >
          Update Photo
        </button>
      </div>
    </div>
  );
}
