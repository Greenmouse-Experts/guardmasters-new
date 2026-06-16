import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai/react";
import { getDefaultStore } from "jotai/vanilla";
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  role: "admin" | "staff" | string;
  picture?: string;
  address?: string | null;
  facebookUrl?: string | null;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  bio?: string | null;
  createdDate?: string;
}

export interface ProfileData extends UserData {
  sub: string;
  email: string;
  companyName: string;
  userType: string;
  isOnboarded: boolean;
  iat: number;
  exp: number;
}

export interface AuthUser {
  accessToken: string;
  refreshToken: string;
  user: UserData;
  profile?: ProfileData;
}

function safeParse<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw || raw === "undefined" || raw === "null") return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const user_atom = atomWithStorage<AuthUser | null>(
  "user",
  safeParse<AuthUser>("user"),
);

export const profile_atom = atomWithStorage<ProfileData | null>(
  "profile",
  safeParse<ProfileData>("profile"),
);

export const useAuth = () => {
  const [user, setUser] = useAtom(user_atom);
  return [user, setUser] as const;
};

export const useProfile = () => {
  const [profile, setProfile] = useAtom(profile_atom);
  return [profile, setProfile] as const;
};

export const get_user_value = () => {
  const store = getDefaultStore();
  return store.get(user_atom);
};

export const get_profile_value = () => {
  const store = getDefaultStore();
  return store.get(profile_atom);
};

export const clear_user = () => {
  const store = getDefaultStore();
  store.set(user_atom, null);
  store.set(profile_atom, null);
};

export const set_user_value = (user: AuthUser) => {
  const store = getDefaultStore();
  store.set(user_atom, user);
};

export const set_profile_value = (profile: ProfileData) => {
  const store = getDefaultStore();
  store.set(profile_atom, profile);
};
