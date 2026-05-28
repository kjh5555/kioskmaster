import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { api, type ApiUser } from "../lib/api";

const STORAGE_DEVICE_ID = "japangi:deviceId";
const STORAGE_ROLE = "japangi:role";

export type UserRole = "elderly" | "guardian";

function getOrCreateDeviceId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_DEVICE_ID);
    if (existing != null && existing.length > 0) return existing;
  } catch {
    // ignore
  }
  // Generate a stable anonymous id for this device. We prefix it so it's
  // obvious in the DB that it's a device-anonymous user (not a real toss
  // user id) and unique enough not to collide across phones.
  const id = `dev_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  try {
    localStorage.setItem(STORAGE_DEVICE_ID, id);
  } catch {
    // ignore
  }
  return id;
}

function readStoredRole(): UserRole {
  try {
    const v = localStorage.getItem(STORAGE_ROLE);
    if (v === "guardian") return "guardian";
  } catch {
    // ignore
  }
  return "elderly";
}

function writeStoredRole(v: UserRole): void {
  try {
    localStorage.setItem(STORAGE_ROLE, v);
  } catch {
    // ignore
  }
}

interface CurrentUserContextValue {
  externalId: string;
  role: UserRole;
  user: ApiUser | null;
  loading: boolean;
  error: string | null;
  setRole: (role: UserRole) => Promise<void>;
  refresh: () => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null);

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [externalId] = useState<string>(getOrCreateDeviceId);
  const [role, setRoleState] = useState<UserRole>(readStoredRole);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ensure = useCallback(
    async (nextRole: UserRole) => {
      setLoading(true);
      setError(null);
      try {
        const u = await api.ensureUser({
          external_id: externalId,
          role: nextRole,
        });
        setUser(u);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    },
    [externalId],
  );

  useEffect(() => {
    void ensure(role);
  }, [ensure, role]);

  const setRole = useCallback(
    async (next: UserRole) => {
      writeStoredRole(next);
      setRoleState(next);
      await ensure(next);
    },
    [ensure],
  );

  const refresh = useCallback(async () => {
    await ensure(role);
  }, [ensure, role]);

  return React.createElement(
    CurrentUserContext.Provider,
    { value: { externalId, role, user, loading, error, setRole, refresh } },
    children,
  );
};

export function useCurrentUser(): CurrentUserContextValue {
  const ctx = useContext(CurrentUserContext);
  if (ctx === null) {
    throw new Error("useCurrentUser must be used inside <CurrentUserProvider>");
  }
  return ctx;
}
