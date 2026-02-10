"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Profile, TournamentHistory } from "@/lib/types";

export default function PlayerProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [tournaments, setTournaments] = useState<TournamentHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const supabase = createClient();

    useEffect(() => {
        const fetchPlayer = async () => {
            if (!supabase || !params.id) {
                setLoading(false);
                return;
            }

            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", params.id as string)
                .single();

            if (profileData) setProfile(profileData);

            const { data: tournamentsData } = await supabase
                .from("tournament_history")
                .select("*")
                .eq("profile_id", params.id as string)
                .order("tournament_date", { ascending: false });

            if (tournamentsData) setTournaments(tournamentsData);
            setLoading(false);
        };

        fetchPlayer();
    }, [supabase, params.id]);

    const getMedalEmoji = (result: string | null) => {
        if (!result) return "";
        const lower = result.toLowerCase();
        if (lower.includes("gold") || lower.includes("1st") || lower.includes("winner")) return "🥇";
        if (lower.includes("silver") || lower.includes("2nd") || lower.includes("runner")) return "🥈";
        if (lower.includes("bronze") || lower.includes("3rd")) return "🥉";
        return "🏆";
    };

    const getResultColor = (result: string | null) => {
        if (!result) return "text-[#e8f2f2]/40";
        const lower = result.toLowerCase();
        if (lower.includes("gold") || lower.includes("1st") || lower.includes("winner"))
            return "text-yellow-400";
        if (lower.includes("silver") || lower.includes("2nd") || lower.includes("runner"))
            return "text-gray-300";
        if (lower.includes("bronze") || lower.includes("3rd"))
            return "text-amber-600";
        return "text-[#c5e8a1]";
    };

    // Stats
    const singlesResults = tournaments.filter((t) => t.singles_result).length;
    const doublesResults = tournaments.filter((t) => t.doubles_result).length;
    const mixedResults = tournaments.filter((t) => t.mixed_doubles_result).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121919] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#237c99]/30 border-t-[#237c99] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#e8f2f2]/60">Loading player profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#121919] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl mb-4">🏓</div>
                    <h2 className="text-xl font-bold text-[#e8f2f2] mb-2">
                        Player Not Found
                    </h2>
                    <p className="text-[#e8f2f2]/40 mb-6">
                        This player profile doesn&apos;t exist or has been removed.
                    </p>
                    <Link
                        href="/players"
                        className="bg-[#237c99] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1a5d73] transition-all"
                    >
                        ← Back to Players
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121919] relative">
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#237c99]/6 blur-3xl" />
                <div className="absolute bottom-0 -left-40 w-80 h-80 rounded-full bg-[#c5e8a1]/6 blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#121919]/95 backdrop-blur-sm border-b border-[#237c99]/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Image
                                src="/dinkSyndicateLogo.jpg"
                                alt="The Dink Syndicate"
                                width={44}
                                height={44}
                                className="rounded-full"
                            />
                        </Link>
                        <div>
                            <h1 className="text-[#e8f2f2] font-bold text-lg">
                                Player Profile
                            </h1>
                            <p className="text-[#e8f2f2]/40 text-xs">
                                The Dink Syndicate
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/players"
                        className="px-4 py-2 text-sm text-[#e8f2f2]/60 hover:text-[#c5e8a1] border border-[#e8f2f2]/10 hover:border-[#c5e8a1]/30 rounded-xl transition-all"
                    >
                        ← All Players
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
                {/* Hero Card */}
                <div className="bg-gradient-to-br from-[#1a2424] via-[#1e2a2a] to-[#1a2828] border border-[#237c99]/20 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl shadow-black/30 relative overflow-hidden">
                    {/* Decorative circle */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#237c99]/5 blur-2xl" />

                    <div className="flex flex-col sm:flex-row items-start gap-6 relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#237c99] to-[#c5e8a1] flex items-center justify-center text-4xl font-bold text-[#121919] shadow-lg shadow-[#237c99]/20 shrink-0">
                            {profile.name[0]?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-3xl font-bold text-[#e8f2f2]">
                                    {profile.name}
                                </h2>
                                {profile.has_sponsorship && (
                                    <span className="text-xs bg-yellow-500/15 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/20 font-medium">
                                        ⭐ Sponsored
                                    </span>
                                )}
                            </div>

                            {/* Location */}
                            {(profile.city || profile.state || profile.country) && (
                                <p className="text-sm text-[#e8f2f2]/50 mb-3">
                                    📍{" "}
                                    {[profile.city, profile.state, profile.country]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            )}

                            {/* Bio */}
                            {profile.bio && (
                                <p className="text-sm text-[#e8f2f2]/60 leading-relaxed max-w-xl mb-4">
                                    {profile.bio}
                                </p>
                            )}

                            {/* Quick tags */}
                            <div className="flex flex-wrap gap-2">
                                {profile.age && (
                                    <span className="text-xs bg-[#e8f2f2]/5 text-[#e8f2f2]/50 px-3 py-1.5 rounded-lg border border-[#e8f2f2]/10">
                                        Age {profile.age}
                                    </span>
                                )}
                                {profile.gender && (
                                    <span className="text-xs bg-[#e8f2f2]/5 text-[#e8f2f2]/50 px-3 py-1.5 rounded-lg border border-[#e8f2f2]/10">
                                        {profile.gender}
                                    </span>
                                )}
                                {profile.dominant_hand && (
                                    <span className="text-xs bg-[#237c99]/10 text-[#237c99] px-3 py-1.5 rounded-lg border border-[#237c99]/15">
                                        🏓 {profile.dominant_hand} Handed
                                    </span>
                                )}
                                {profile.dupr_id && (
                                    <span className="text-xs bg-[#c5e8a1]/10 text-[#c5e8a1] px-3 py-1.5 rounded-lg border border-[#c5e8a1]/15">
                                        DUPR: {profile.dupr_id}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sponsorship Details */}
                    {profile.has_sponsorship && profile.sponsorship_details && (
                        <div className="mt-6 bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-4 py-3">
                            <p className="text-xs text-yellow-400/70 font-medium mb-1">
                                Sponsored by
                            </p>
                            <p className="text-sm text-yellow-400 font-semibold">
                                {profile.sponsorship_details}
                            </p>
                        </div>
                    )}
                </div>

                {/* Stats + Next Tournament Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {/* Stats */}
                    <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-[#c5e8a1] mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-[#c5e8a1]/10 flex items-center justify-center text-xs">
                                📊
                            </span>
                            Career Stats
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#e8f2f2]">
                                    {tournaments.length}
                                </p>
                                <p className="text-[10px] text-[#e8f2f2]/35 mt-1">
                                    Tournaments
                                </p>
                            </div>
                            <div className="text-center border-x border-[#e8f2f2]/5">
                                <p className="text-2xl font-bold text-[#237c99]">
                                    {singlesResults}
                                </p>
                                <p className="text-[10px] text-[#e8f2f2]/35 mt-1">
                                    Singles Entries
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#c5e8a1]">
                                    {doublesResults + mixedResults}
                                </p>
                                <p className="text-[10px] text-[#e8f2f2]/35 mt-1">
                                    Doubles Entries
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Next Tournament */}
                    <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-[#c5e8a1] mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-[#c5e8a1]/10 flex items-center justify-center text-xs">
                                📅
                            </span>
                            Next Tournament
                        </h3>
                        {profile.next_tournament ? (
                            <div className="bg-[#237c99]/8 border border-[#237c99]/15 rounded-xl p-4">
                                <p className="text-lg font-semibold text-[#e8f2f2]">
                                    {profile.next_tournament}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 rounded-full bg-[#c5e8a1] animate-pulse" />
                                    <span className="text-xs text-[#c5e8a1]">Upcoming</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-[#e8f2f2]/30 text-sm">
                                    No upcoming tournament listed
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tournament History */}
                <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-[#c5e8a1] mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-[#c5e8a1]/10 flex items-center justify-center text-sm">
                            🏆
                        </span>
                        Tournament History
                        <span className="ml-auto text-sm text-[#e8f2f2]/30 font-normal">
                            {tournaments.length} total
                        </span>
                    </h3>

                    {tournaments.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-3">🏓</div>
                            <p className="text-[#e8f2f2]/40 text-sm">
                                No tournament history recorded yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tournaments.map((t, index) => (
                                <div
                                    key={t.id}
                                    className="relative pl-8 pb-4 last:pb-0"
                                >
                                    {/* Timeline line */}
                                    {index < tournaments.length - 1 && (
                                        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-[#237c99]/15" />
                                    )}
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#237c99]/15 border-2 border-[#237c99]/30 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-[#237c99]" />
                                    </div>

                                    <div className="bg-[#121919]/40 border border-[#237c99]/10 rounded-xl p-5 hover:border-[#237c99]/25 transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                                            <h4 className="text-base font-semibold text-[#e8f2f2]">
                                                {t.tournament_name}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1 sm:mt-0 text-xs text-[#e8f2f2]/35">
                                                {t.tournament_date && (
                                                    <span>
                                                        {new Date(t.tournament_date).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </span>
                                                )}
                                                {t.location && <span>📍 {t.location}</span>}
                                            </div>
                                        </div>

                                        {/* Results Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="bg-[#1a2424]/80 rounded-lg p-3 border border-[#237c99]/8">
                                                <p className="text-[10px] text-[#e8f2f2]/30 font-medium uppercase tracking-wider mb-1">
                                                    Singles
                                                </p>
                                                {t.singles_result ? (
                                                    <p
                                                        className={`text-sm font-semibold ${getResultColor(
                                                            t.singles_result
                                                        )}`}
                                                    >
                                                        {getMedalEmoji(t.singles_result)}{" "}
                                                        {t.singles_result}
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-[#e8f2f2]/20">—</p>
                                                )}
                                            </div>
                                            <div className="bg-[#1a2424]/80 rounded-lg p-3 border border-[#237c99]/8">
                                                <p className="text-[10px] text-[#e8f2f2]/30 font-medium uppercase tracking-wider mb-1">
                                                    Doubles
                                                </p>
                                                {t.doubles_result ? (
                                                    <p
                                                        className={`text-sm font-semibold ${getResultColor(
                                                            t.doubles_result
                                                        )}`}
                                                    >
                                                        {getMedalEmoji(t.doubles_result)}{" "}
                                                        {t.doubles_result}
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-[#e8f2f2]/20">—</p>
                                                )}
                                            </div>
                                            <div className="bg-[#1a2424]/80 rounded-lg p-3 border border-[#237c99]/8">
                                                <p className="text-[10px] text-[#e8f2f2]/30 font-medium uppercase tracking-wider mb-1">
                                                    Mixed Doubles
                                                </p>
                                                {t.mixed_doubles_result ? (
                                                    <p
                                                        className={`text-sm font-semibold ${getResultColor(
                                                            t.mixed_doubles_result
                                                        )}`}
                                                    >
                                                        {getMedalEmoji(t.mixed_doubles_result)}{" "}
                                                        {t.mixed_doubles_result}
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-[#e8f2f2]/20">—</p>
                                                )}
                                            </div>
                                        </div>

                                        {t.notes && (
                                            <p className="mt-3 text-xs text-[#e8f2f2]/30 italic border-t border-[#e8f2f2]/5 pt-3">
                                                💬 {t.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
