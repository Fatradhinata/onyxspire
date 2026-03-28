"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "identity" | "security" | "api" | "notif"
  >("identity");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    level: 0,
    text: "Awaiting input",
    color: "var(--text-3)",
  });
  const [revealedKeys, setRevealedKeys] = useState<{
    [key: string]: { visible: boolean; timer: number | null };
  }>({
    key1: { visible: false, timer: null },
    key2: { visible: false, timer: null },
  });
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      enabled: true,
      title: "Critical Vulnerability Detected",
      desc: "Fires when a CVSS ≥9.0 vulnerability is found on a scanned target.",
      channels: { email: true, telegram: true, webpush: true },
    },
    {
      id: 2,
      enabled: true,
      title: "Active Session from New Device",
      desc: "Fires when a login is detected from an unrecognized device or location.",
      channels: { email: true, telegram: true, webpush: false },
    },
    {
      id: 3,
      enabled: false,
      title: "API Key Used from Unknown IP",
      desc: "Fires when your API key is consumed from an unwhitelisted IP address.",
      channels: { email: true, telegram: false, webpush: false },
    },
    {
      id: 4,
      enabled: true,
      title: "Scan Cooldown Expired",
      desc: "Notifies when your scan quota cooldown timer has reset and is ready.",
      channels: { email: false, telegram: true, webpush: true },
    },
    {
      id: 5,
      enabled: true,
      title: "Billing & Subscription",
      desc: "Invoice receipts, renewal reminders, and plan change confirmations.",
      channels: { email: true, telegram: false, webpush: false },
    },
    {
      id: 6,
      enabled: false,
      title: "Weekly Security Digest",
      desc: "A summary of all scans, findings, and platform updates from the past 7 days.",
      channels: { email: true, telegram: false, webpush: false },
    },
  ]);

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength({
        level: 0,
        text: "Awaiting input",
        color: "text-slate-400",
      });
      return;
    }
    let score = 0;
    if (password.length > 5) score++;
    if (password.length > 8 && /[0-9]/.test(password)) score++;
    if (password.length > 10 && /[^a-zA-Z0-9]/.test(password)) score++;

    const states = [
      { text: "VULNERABLE", color: "text-red-500" },
      { text: "ACCEPTABLE", color: "text-amber-500" },
      { text: "HARDENED", color: "text-green-500" },
    ];
    const idx = Math.max(0, score - 1);
    setPasswordStrength({
      level: score || 1,
      text: states[idx].text,
      color: states[idx].color,
    });
  }, [password]);

  // API Key reveal timer
  useEffect(() => {
    Object.keys(revealedKeys).forEach((keyId) => {
      const keyState = revealedKeys[keyId];
      if (keyState.visible && keyState.timer !== null) {
        const timer = setInterval(() => {
          setRevealedKeys((prev) => {
            const currentState = prev[keyId];
            if (
              currentState &&
              currentState.timer !== null &&
              currentState.timer > 0
            ) {
              return {
                ...prev,
                [keyId]: { ...currentState, timer: currentState.timer - 1 },
              };
            } else if (
              currentState &&
              currentState.timer !== null &&
              currentState.timer <= 0
            ) {
              clearInterval(timer);
              return { ...prev, [keyId]: { visible: false, timer: null } };
            }
            return prev;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    });
  }, [revealedKeys]);

  const handleRevealKey = useCallback((keyId: string, fullKey: string) => {
    setRevealedKeys((prev) => {
      if (prev[keyId].visible) return prev;
      return { ...prev, [keyId]: { visible: true, timer: 10 } };
    });
  }, []);

  const handleCopyKey = useCallback((key: string, keyId: string) => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopyFeedback((prev) => ({ ...prev, [keyId]: true }));
    setTimeout(() => {
      setCopyFeedback((prev) => ({ ...prev, [keyId]: false }));
    }, 2000);
  }, []);

  const toggleNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
    );
  }, []);

  const toggleChannel = useCallback(
    (id: number, channel: "email" | "telegram" | "webpush") => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                channels: { ...n.channels, [channel]: !n.channels[channel] },
              }
            : n,
        ),
      );
    },
    [],
  );

  const getChannelClass = (
    isActive: boolean,
    type: "email" | "telegram" | "webpush",
  ) => {
    if (!isActive) return "bg-slate-100 text-slate-400 border border-slate-200";
    if (type === "email")
      return "bg-sky-100 text-sky-600 border border-sky-200";
    if (type === "telegram")
      return "bg-indigo-100 text-indigo-600 border border-indigo-200";
    return "bg-green-100 text-green-600 border border-green-200";
  };

  return (
    <>

      <div className="font-[var(--font-inter)] bg-[#f8fafc] text-slate-800 h-screen overflow-hidden flex">
        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          {/* Background Grid */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(14, 165, 233, 0.045) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(14, 165, 233, 0.045) 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px",
            }}
          />

          {/* Header */}
          <header className="relative z-10 h-16 bg-[#f8fafc]/88 backdrop-blur-[16px] border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
            <div>
              <div className="font-amarillo text-[0.95rem] font-bold text-slate-900">
                User Settings & Security Profile
              </div>
              <div className="font-mono-custom text-[11px] text-slate-400 uppercase tracking-[0.1em] mt-0.5">
                Identity Management / Access Control
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="w-[34px] h-[34px] bg-white border border-slate-200 rounded-lg flex items-center justify-center cursor-pointer text-slate-400 hover:border-sky-500 hover:text-sky-500 transition-colors">
                <svg
                  className="w-[15px] h-[15px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="w-[34px] h-[34px] bg-white border border-slate-200 rounded-lg flex items-center justify-center cursor-pointer text-slate-400 hover:border-sky-500 hover:text-sky-500 transition-colors">
                <svg
                  className="w-[15px] h-[15px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="relative z-10 flex-1 overflow-y-auto p-7">
            {/* Profile Hero */}
            <div className="bg-white border border-slate-200 rounded-[1.25rem] p-6 flex items-center gap-5 mb-5 shadow-[0_1px_4px_rgba(15,23,42,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-indigo-500" />
              <div className="w-[60px] h-[60px] rounded-[1rem] bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center font-mono-custom text-[1.1rem] font-bold text-white flex-shrink-0 shadow-[0_0_0_3px_rgba(14,165,233,0.2),0_4px_16px_rgba(14,165,233,0.25)]">
                FN
              </div>
              <div className="flex-1">
                <div className="font-mono-custom text-[1.05rem] font-bold text-slate-900">
                  Fines Need Hug
                </div>
                <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                  admin@tenant.com
                </div>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="font-mono-custom text-[11px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-600 border border-sky-200 uppercase tracking-[0.08em]">
                    Pro Tier
                  </span>
                  <span className="font-mono-custom text-[11px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-600 border border-green-200 uppercase tracking-[0.08em]">
                    ● Active
                  </span>
                  <span className="font-mono-custom text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-600 border border-indigo-200 uppercase tracking-[0.08em]">
                    Developer
                  </span>
                </div>
              </div>
              <div className="font-mono-custom text-[11px] text-slate-400 uppercase tracking-[0.08em] text-right">
                Member since
                <br />
                Mar 2025
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-[0.875rem] p-1.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              {[
                {
                  id: "identity",
                  label: "Personal Identity",
                  icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                },
                {
                  id: "security",
                  label: "Security Guard",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  id: "api",
                  label: "API & Integration",
                  icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                },
                {
                  id: "notif",
                  label: "Notifications",
                  icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 py-2.5 px-2 font-mono-custom text-[12px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] cursor-pointer transition-colors flex items-center justify-center gap-1 ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  }`}
                >
                  <svg
                    className="w-[13px] h-[13px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={tab.icon}
                    />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Personal Identity */}
            {activeTab === "identity" && (
              <div className="animate-[fadeIn_0.22s_ease]">
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Operational Identity */}
                  <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Operational Identity
                        </div>
                        <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                          Update your public-facing credentials
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Full Name
                        </label>
                        <input
                          className="w-full bg-slate-100 border border-slate-200 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-slate-900 outline-none focus:border-sky-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-colors"
                          type="text"
                          defaultValue="Fines Need Hug"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Username / Handle
                        </label>
                        <input
                          className="w-full bg-slate-100 border border-slate-200 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-slate-900 outline-none focus:border-sky-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-colors"
                          type="text"
                          defaultValue="@finesneedhug"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Role Classification
                        </label>
                        <input
                          className="w-full bg-slate-100 border border-slate-200 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-slate-900 outline-none focus:border-sky-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-colors"
                          type="text"
                          defaultValue="Developer"
                        />
                      </div>
                      <div className="flex gap-2.5 mt-5">
                        <button className="inline-flex items-center gap-1 font-mono-custom text-[12px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-slate-900 text-white px-4 py-2.5 cursor-pointer transition-colors hover:bg-sky-500 shadow-[0_2px_8px_rgba(15,23,42,0.18)] hover:shadow-[0_4px_14px_rgba(14,165,233,0.3)]">
                          Save Changes
                        </button>
                        <button className="inline-flex items-center gap-1 font-mono-custom text-[12px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-white text-slate-600 border border-slate-200 px-4 py-2.5 cursor-pointer transition-colors hover:border-sky-500 hover:text-sky-500">
                          Discard
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comms Channel */}
                  <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Comms Channel
                        </div>
                        <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                          Email & contact configuration
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Primary Email
                        </label>
                        <input
                          className="w-full bg-slate-100 border border-slate-200 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-slate-900 outline-none focus:border-sky-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-colors"
                          type="email"
                          defaultValue="admin@tenant.com"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Recovery Email
                        </label>
                        <input
                          className="w-full bg-slate-100 border border-slate-200 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-slate-900 outline-none focus:border-sky-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-colors"
                          type="email"
                          placeholder="backup@domain.com"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Telegram Handle
                        </label>
                        <input
                          className="w-full bg-slate-100 border border-slate-200 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-slate-900 outline-none focus:border-sky-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] transition-colors"
                          type="text"
                          placeholder="@handle"
                        />
                      </div>
                      <div className="flex gap-2.5 mt-5">
                        <button className="inline-flex items-center gap-1 font-mono-custom text-[12px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-slate-900 text-white px-4 py-2.5 cursor-pointer transition-colors hover:bg-sky-500 shadow-[0_2px_8px_rgba(15,23,42,0.18)] hover:shadow-[0_4px_14px_rgba(14,165,233,0.3)]">
                          Update Comms
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        Danger Zone
                      </div>
                      <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                        Irreversible account operations — proceed with caution
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        Decommission Account
                      </div>
                      <div className="font-mono-custom text-[11px] text-slate-400 mt-0.5">
                        Permanently delete your account, all scan data, and API
                        keys.
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-1 font-mono-custom text-[12px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-white text-red-500 border border-red-200 px-3.5 py-[0.45rem] cursor-pointer transition-colors hover:bg-red-50 hover:border-red-500">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Security Guard */}
            {activeTab === "security" && (
              <div className="animate-[fadeIn_0.22s_ease]">
                {/* Security Score */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Security Score
                        </div>
                        <div className="font-mono-custom text-[11px] text-slate-400 mt-0.5">
                          Enable MFA to reach 100%
                        </div>
                      </div>
                      <div className="font-mono-custom text-[14px] font-bold text-sky-500">
                        68
                        <span className="text-[0.85rem] text-slate-400">
                          /100
                        </span>
                      </div>
                    </div>
                    <div className="h-[6px] bg-slate-100 rounded-[99px] overflow-hidden">
                      <div
                        className="h-full rounded-[99px] bg-gradient-to-r from-sky-500 to-indigo-500 transition-[width] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative"
                        style={{ width: "68%" }}
                      >
                        <div className="absolute right-0 -top-[3px] w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_var(--indigo)]" />
                      </div>
                    </div>
                    <div className="flex gap-6 mt-3.5 flex-wrap">
                      <div className="flex items-center gap-1.5 font-mono-custom text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-slate-400">Password Set</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono-custom text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-slate-400">Email Verified</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono-custom text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-slate-400">MFA Inactive</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono-custom text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="text-slate-400">
                          Hardware Key — Not set
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {/* Password */}
                  <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Cryptographic Password
                        </div>
                        <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                          Update your access key
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Current Password
                        </label>
                        <input
                          className="w-full bg-slate-900 border border-white/8 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-sky-500 outline-none tracking-[0.12em] focus:border-sky-500/40 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.08)] transition-colors"
                          type="password"
                          placeholder="••••••••••••"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          New Password
                        </label>
                        <input
                          className="w-full bg-slate-900 border border-white/8 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-sky-500 outline-none tracking-[0.12em] focus:border-sky-500/40 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.08)] transition-colors"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Generate secure key..."
                        />
                      </div>
                      <div className="mb-3.5">
                        <div className="flex justify-between mb-1.5">
                          <span className="font-mono-custom text-[9px] text-slate-400">
                            Security Level:
                          </span>
                          <span
                            className={`font-mono-custom text-[9px] font-bold ${passwordStrength.color}`}
                          >
                            {passwordStrength.text}
                          </span>
                        </div>
                        <div className="flex gap-0.5 h-1">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-[99px] transition-colors duration-300"
                              style={{
                                backgroundColor:
                                  i <= passwordStrength.level
                                    ? passwordStrength.text === "VULNERABLE"
                                      ? "#ef4444"
                                      : passwordStrength.text === "ACCEPTABLE"
                                        ? "#f59e0b"
                                        : "#22c55e"
                                    : "var(--border)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block font-mono-custom text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
                          Confirm Password
                        </label>
                        <input
                          className="w-full bg-slate-900 border border-white/8 rounded-[0.625rem] px-3.5 py-[0.65rem] font-mono-custom text-[12px] text-sky-500 outline-none tracking-[0.12em] focus:border-sky-500/40 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.08)] transition-colors"
                          type="password"
                          placeholder="Repeat key..."
                        />
                      </div>
                      <button className="inline-flex items-center justify-center gap-1 font-mono-custom text-[12px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-slate-900 text-white px-4 py-2.5 cursor-pointer transition-colors hover:bg-sky-500 shadow-[0_2px_8px_rgba(15,23,42,0.18)] hover:shadow-[0_4px_14px_rgba(14,165,233,0.3)] mt-2 w-full">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* MFA */}
                  <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Multi-Factor Authentication
                        </div>
                        <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                          Add layers to your fortress
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      {[
                        {
                          label: "OTP via Authenticator App",
                          desc: "TOTP-based 6-digit codes (Google Auth, Authy)",
                        },
                        {
                          label: "FIDO2 / Hardware Key",
                          desc: "YubiKey or any WebAuthn device",
                        },
                        {
                          label: "Backup Codes",
                          desc: "One-time recovery codes for lockout",
                          checked: true,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between py-3.5 ${i < 2 ? "border-b border-slate-100" : ""}`}
                        >
                          <div className="flex-1">
                            <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                              {item.label}
                            </div>
                            <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                          <label className="relative w-11 h-6 flex-shrink-0 ml-4 cursor-pointer">
                            <input
                              type="checkbox"
                              className="opacity-0 absolute w-0 h-0"
                              defaultChecked={item.checked}
                            />
                            <span className="absolute inset-0 bg-slate-200 rounded-[99px] transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:w-[18px] after:h-[18px] after:rounded-full after:bg-white after:shadow-[0_1px_4px_rgba(0,0,0,0.15)] after:transition-transform peer-checked:bg-sky-500 peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                      ))}
                      <div className="mt-4 p-3 bg-amber-100/70 border border-amber-200 rounded-[0.625rem]">
                        <div className="font-mono-custom text-[11px] font-bold text-amber-600 mb-0.5">
                          ⚠ MFA Not Active
                        </div>
                        <div className="font-mono-custom text-[9px] text-slate-400">
                          Activate OTP or Hardware Key to increase your Security
                          Score to 100.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        Active Session Monitoring
                      </div>
                      <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                        Devices with active access to your account
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-1 font-mono-custom text-[11px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-white text-red-500 border border-red-200 px-3 py-1 cursor-pointer transition-colors hover:bg-red-50 hover:border-red-500">
                      Terminate All Others
                    </button>
                  </div>
                  {[
                    {
                      id: "8A9B",
                      device: "Chrome 122 on Windows 11",
                      loc: "Malang, ID · 192.168.1.44",
                      current: true,
                      time: "Now",
                      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    },
                    {
                      id: "3F7C",
                      device: "Safari on iPhone 15 Pro",
                      loc: "Jakarta, ID · 10.0.0.22",
                      current: false,
                      time: "2h ago",
                      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                    },
                    {
                      id: "1D0X",
                      device: "Firefox 121 on Linux",
                      loc: "Singapore, SG · 103.28.54.xx",
                      current: false,
                      time: "14m ago",
                      unknown: true,
                      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 px-5 py-3.5 border-b border-slate-100 hover:bg-sky-50/30 transition-colors last:border-b-0"
                    >
                      <div
                        className={`w-[34px] h-[34px] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0 ${session.unknown ? "text-red-500 bg-red-50/70 border-red-200/80" : ""}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={session.icon}
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-mono-custom font-bold text-[12px] tracking-[0.06em] ${session.unknown ? "text-red-500" : "text-sky-500"}`}
                        >
                          [SESSION_ID: {session.id}]
                          {session.unknown && " ⚠ UNKNOWN"}
                        </div>
                        <div className="text-slate-900 text-[12px]">
                          {session.device}
                        </div>
                        <div className="text-slate-400 text-[12px] mt-0.5">
                          📍 {session.loc}
                        </div>
                      </div>
                      {session.current ? (
                        <span className="text-[11px] text-green-600 font-bold bg-green-100 border border-green-200 px-1.5 py-0.5 rounded">
                          ● CURRENT
                        </span>
                      ) : (
                        <button className="inline-flex items-center gap-1 font-mono-custom text-[11px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-white text-red-500 border border-red-200 px-3 py-1 cursor-pointer transition-colors hover:bg-red-50 hover:border-red-500 ml-2.5">
                          TERMINATE
                        </button>
                      )}
                      <div
                        className={`text-[12px] text-slate-400 whitespace-nowrap ${session.unknown ? "text-red-500" : ""}`}
                      >
                        {session.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: API & Integration */}
            {activeTab === "api" && (
              <div className="animate-[fadeIn_0.22s_ease]">
                {/* API Keys */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        API Key Management
                      </div>
                      <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                        Authorization tokens — never exposed in plaintext
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-1 font-mono-custom text-[11px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-slate-900 text-white px-3 py-1 cursor-pointer transition-colors hover:bg-sky-500 shadow-[0_2px_8px_rgba(15,23,42,0.18)]">
                      <svg
                        className="w-[11px] h-[11px]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Generate Key
                    </button>
                  </div>

                  {/* Key 1 */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Production Key
                        </div>
                        <div className="font-mono-custom text-[9px] text-slate-400 mt-0.5">
                          Created 2026-01-15 · Last used 3h ago
                        </div>
                      </div>
                      <span className="font-mono-custom text-[9px] text-green-600 bg-green-100 border border-green-200 px-1.5 py-0.5 rounded">
                        ACTIVE
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-white/7 rounded-[0.75rem] px-4 py-3.5 flex items-center gap-3 font-mono-custom text-[0.75rem] text-sky-500 tracking-[0.1em]">
                      <svg
                        className="w-[14px] h-[14px] text-sky-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {revealedKeys.key1.visible
                          ? "onyx_sk_8f4a2b9c1d3e5f6a7b8c9d0e1f2a3b4c"
                          : "onyx_sk_••••••••••••••••••••••••••••••••••••"}
                      </div>
                      {revealedKeys.key1.timer !== null && (
                        <span className="text-[11px] text-amber-500 font-bold bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded whitespace-nowrap">
                          Hiding in {revealedKeys.key1.timer}s
                        </span>
                      )}
                      <button
                        onClick={() =>
                          handleRevealKey(
                            "key1",
                            "onyx_sk_8f4a2b9c1d3e5f6a7b8c9d0e1f2a3b4c",
                          )
                        }
                        className="bg-none border-none cursor-pointer text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        <svg
                          className="w-[14px] h-[14px]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          handleCopyKey(
                            "onyx_sk_8f4a2b9c1d3e5f6a7b8c9d0e1f2a3b4c",
                            "key1",
                          )
                        }
                        className="bg-none border-none cursor-pointer text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        {copyFeedback.key1 ? (
                          <svg
                            className="w-[14px] h-[14px]"
                            fill="none"
                            stroke="#22c55e"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-[14px] h-[14px]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Key 2 */}
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          Staging Key
                        </div>
                        <div className="font-mono-custom text-[9px] text-slate-400 mt-0.5">
                          Created 2026-02-03 · Last used 2d ago
                        </div>
                      </div>
                      <span className="font-mono-custom text-[9px] text-amber-600 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">
                        READ-ONLY
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-white/7 rounded-[0.75rem] px-4 py-3.5 flex items-center gap-3 font-mono-custom text-[0.75rem] text-sky-500 tracking-[0.1em]">
                      <svg
                        className="w-[14px] h-[14px] text-sky-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {revealedKeys.key2.visible
                          ? "onyx_sk_rk92ms3lt7px8nq1vd6cf4ow5ue0ybai"
                          : "onyx_sk_••••••••••••••••••••••••••••••••••••"}
                      </div>
                      {revealedKeys.key2.timer !== null && (
                        <span className="text-[11px] text-amber-500 font-bold bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded whitespace-nowrap">
                          Hiding in {revealedKeys.key2.timer}s
                        </span>
                      )}
                      <button
                        onClick={() =>
                          handleRevealKey(
                            "key2",
                            "onyx_sk_rk92ms3lt7px8nq1vd6cf4ow5ue0ybai",
                          )
                        }
                        className="bg-none border-none cursor-pointer text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        <svg
                          className="w-[14px] h-[14px]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          handleCopyKey(
                            "onyx_sk_rk92ms3lt7px8nq1vd6cf4ow5ue0ybai",
                            "key2",
                          )
                        }
                        className="bg-none border-none cursor-pointer text-slate-400 hover:text-sky-500 transition-colors"
                      >
                        {copyFeedback.key2 ? (
                          <svg
                            className="w-[14px] h-[14px]"
                            fill="none"
                            stroke="#22c55e"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-[14px] h-[14px]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Webhooks */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        Webhook Endpoints
                      </div>
                      <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                        POST callbacks for scan events and alerts
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-1 font-mono-custom text-[11px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-white text-slate-600 border border-slate-200 px-3 py-1 cursor-pointer transition-colors hover:border-sky-500 hover:text-sky-500">
                      Add Endpoint
                    </button>
                  </div>
                  {[
                    {
                      url: "https://api.foelfox.com/hooks/onyxspire",
                      events: "scan.completed · vuln.critical",
                      status: "200 OK",
                      statusColor: "green",
                    },
                    {
                      url: "https://hooks.slack.com/services/T00/B00/xxxx",
                      events: "scan.completed",
                      status: "TIMEOUT",
                      statusColor: "amber",
                    },
                  ].map((webhook, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-5 py-3 border-b border-slate-100 last:border-b-0 font-mono-custom text-[12px]"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${webhook.statusColor === "green" ? "bg-green-500" : "bg-amber-500"}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-900 overflow-hidden text-ellipsis whitespace-nowrap">
                          {webhook.url}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          Events: {webhook.events}
                        </div>
                      </div>
                      <span
                        className={`font-mono-custom text-[9px] ${webhook.statusColor === "green" ? "text-green-600 bg-green-100 border border-green-200" : "text-amber-600 bg-amber-100 border border-amber-200"} px-1.5 py-0.5 rounded`}
                      >
                        {webhook.status}
                      </span>
                      <button className="inline-flex items-center gap-1 font-mono-custom text-[11px] font-bold uppercase tracking-[0.06em] rounded-[0.625rem] bg-white text-red-500 border border-red-200 px-3 py-1 cursor-pointer transition-colors hover:bg-red-50 hover:border-red-500 ml-2">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Notifications */}
            {activeTab === "notif" && (
              <div className="animate-[fadeIn_0.22s_ease]">
                {/* Critical Security Alerts */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        Critical Security Alerts
                      </div>
                      <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                        Triggers for high-severity scan events
                      </div>
                    </div>
                  </div>
                  {notifications.slice(0, 3).map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start gap-4 px-5 py-3.5 border-b border-slate-100 last:border-b-0"
                    >
                      <div
                        onClick={() => toggleNotification(notif.id)}
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 border-2 rounded-[6px] cursor-pointer flex items-center justify-center transition-colors ${
                          notif.enabled
                            ? "bg-sky-500 border-sky-500"
                            : "bg-transparent border-slate-200"
                        }`}
                      >
                        {notif.enabled && (
                          <svg
                            className="w-[11px] h-[11px] text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          {notif.title}
                        </div>
                        <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                          {notif.desc}
                        </div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {(["email", "telegram", "webpush"] as const).map(
                            (channel) => (
                              <span
                                key={channel}
                                onClick={() => toggleChannel(notif.id, channel)}
                                className={`font-mono-custom text-[11px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors select-none ${getChannelClass(notif.channels[channel], channel)}`}
                              >
                                {channel === "email"
                                  ? "Email"
                                  : channel === "telegram"
                                    ? "Telegram"
                                    : "Web Push"}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Administrative & Operational */}
                <div className="bg-white border border-slate-200 rounded-[1rem] overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.05)] mb-4">
                  <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                        Administrative & Operational
                      </div>
                      <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                        Routine system and billing notifications
                      </div>
                    </div>
                  </div>
                  {notifications.slice(3).map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start gap-4 px-5 py-3.5 border-b border-slate-100 last:border-b-0"
                    >
                      <div
                        onClick={() => toggleNotification(notif.id)}
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 border-2 rounded-[6px] cursor-pointer flex items-center justify-center transition-colors ${
                          notif.enabled
                            ? "bg-sky-500 border-sky-500"
                            : "bg-transparent border-slate-200"
                        }`}
                      >
                        {notif.enabled && (
                          <svg
                            className="w-[11px] h-[11px] text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-mono-custom text-[12px] font-bold text-slate-900">
                          {notif.title}
                        </div>
                        <div className="font-mono-custom text-[12px] text-slate-400 mt-0.5">
                          {notif.desc}
                        </div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {(["email", "telegram", "webpush"] as const).map(
                            (channel) => (
                              <span
                                key={channel}
                                onClick={() => toggleChannel(notif.id, channel)}
                                className={`font-mono-custom text-[11px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors select-none ${getChannelClass(notif.channels[channel], channel)}`}
                              >
                                {channel === "email"
                                  ? "Email"
                                  : channel === "telegram"
                                    ? "Telegram"
                                    : "Web Push"}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
