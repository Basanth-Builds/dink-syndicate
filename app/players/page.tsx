"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import type { Profile, TournamentHistory } from "@/lib/types";

interface PlayerWithStats extends Profile {
    tournament_count: number;
    latest_tournaments: TournamentHistory[];
}

export default function PlayersDashboard() {
    const [players, setPlayers] = useState<PlayerWithStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "sponsored" | "upcoming">(
        "all"
    );

    const supabase = createClient();

    useEffect(() => {
        const fetchPlayers = async () => {
            if (!supabase) {
                setLoading(false);
                return;
            }

            const { data: profiles } = await supabase
                .from("profiles")
                .select("*")
                .neq("name", "")
                .order("updated_at", { ascending: false });

            if (!profiles) {
                setLoading(false);
                return;
            }

            // Fetch tournament data for each player
            const playersWithStats: PlayerWithStats[] = await Promise.all(
                profiles.map(async (profile) => {
                    const { data: tournaments } = await supabase
                        .from("tournament_history")
                        .select("*")
                        .eq("profile_id", profile.id)
                        .order("tournament_date", { ascending: false })
                        .limit(3);

                    return {
                        ...profile,
                        tournament_count: tournaments?.length || 0,
                        latest_tournaments: tournaments || [],
                    };
                })
            );

            setPlayers(playersWithStats);
            setLoading(false);
        };

        fetchPlayers();
    }, [supabase]);

    const filteredPlayers = players.filter((player) => {
        const matchesSearch =
            player.name.toLowerCase().includes(search.toLowerCase()) ||
            player.city?.toLowerCase().includes(search.toLowerCase()) ||
            player.state?.toLowerCase().includes(search.toLowerCase()) ||
            player.dupr_id?.toLowerCase().includes(search.toLowerCase());

        if (filter === "sponsored") return matchesSearch && player.has_sponsorship;
        if (filter === "upcoming") return matchesSearch && player.next_tournament;
        return matchesSearch;
    });

    // Collect upcoming tournaments from all players
    const upcomingTournaments = players
        .filter((p) => p.next_tournament)
        .map((p) => ({
            playerName: p.name,
            playerId: p.id,
            tournament: p.next_tournament!,
            city: p.city,
        }));

    // Stats
    const totalPlayers = players.length;
    const sponsoredCount = players.filter((p) => p.has_sponsorship).length;
    const upcomingCount = players.filter((p) => p.next_tournament).length;

    const getMedalEmoji = (result: string | null) => {
        if (!result) return null;
        const lower = result.toLowerCase();
        if (lower.includes("gold") || lower.includes("1st") || lower.includes("winner")) return "🥇";
        if (lower.includes("silver") || lower.includes("2nd") || lower.includes("runner")) return "🥈";
        if (lower.includes("bronze") || lower.includes("3rd")) return "🥉";
        return "🏆";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121919] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#237c99]/30 border-t-[#237c99] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#e8f2f2]/60">Loading players...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121919] relative">
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#237c99]/6 blur-3xl" />
                <div className="absolute bottom-0 -left-40 w-96 h-96 rounded-full bg-[#c5e8a1]/6 blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#237c99]/4 blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#121919]/95 backdrop-blur-sm border-b border-[#237c99]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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
                                Players Dashboard
                            </h1>
                            <p className="text-[#e8f2f2]/40 text-xs">
                                The Dink Syndicate Community
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm text-[#e8f2f2]/60 hover:text-[#c5e8a1] border border-[#e8f2f2]/10 hover:border-[#c5e8a1]/30 rounded-xl transition-all"
                    >
                        ← Home
                    </Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-[#1a2424] to-[#1e2a2a] border border-[#237c99]/15 rounded-2xl p-5 group hover:border-[#237c99]/30 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[#237c99]/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                                🏓
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#e8f2f2]">
                                    {totalPlayers}
                                </p>
                                <p className="text-xs text-[#e8f2f2]/40">Total Players</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#1a2424] to-[#1e2a2a] border border-[#237c99]/15 rounded-2xl p-5 group hover:border-[#c5e8a1]/30 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[#c5e8a1]/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                                ⭐
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#c5e8a1]">
                                    {sponsoredCount}
                                </p>
                                <p className="text-xs text-[#e8f2f2]/40">Sponsored Players</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#1a2424] to-[#1e2a2a] border border-[#237c99]/15 rounded-2xl p-5 group hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                                📅
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-400">
                                    {upcomingCount}
                                </p>
                                <p className="text-xs text-[#e8f2f2]/40">
                                    With Upcoming Tournaments
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Tournaments Strip */}
                {upcomingTournaments.length > 0 && (
                    <div className="bg-gradient-to-r from-[#237c99]/10 via-[#1a2424] to-[#c5e8a1]/10 border border-[#237c99]/15 rounded-2xl p-5 mb-8">
                        <h2 className="text-sm font-semibold text-[#c5e8a1] mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#c5e8a1] animate-pulse" />
                            Upcoming Tournament Stops
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {upcomingTournaments.map((t) => (
                                <Link
                                    key={t.playerId}
                                    href={`/players/${t.playerId}`}
                                    className="bg-[#121919]/60 border border-[#237c99]/15 rounded-xl px-4 py-3 hover:border-[#237c99]/40 transition-all group"
                                >
                                    <p className="text-sm font-medium text-[#e8f2f2] group-hover:text-[#c5e8a1] transition-colors">
                                        {t.tournament}
                                    </p>
                                    <p className="text-xs text-[#e8f2f2]/40 mt-1">
                                        {t.playerName}
                                        {t.city ? ` • ${t.city}` : ""}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8f2f2]/30"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, city, state, or DUPR ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-[#1a2424] border border-[#237c99]/15 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/25 focus:outline-none focus:ring-2 focus:ring-[#237c99]/30 focus:border-[#237c99] transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "sponsored", "upcoming"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all capitalize cursor-pointer whitespace-nowrap ${filter === f
                                        ? "bg-[#237c99] text-white shadow-lg shadow-[#237c99]/20"
                                        : "bg-[#1a2424] text-[#e8f2f2]/50 border border-[#237c99]/10 hover:border-[#237c99]/30 hover:text-[#e8f2f2]"
                                    }`}
                            >
                                {f === "all"
                                    ? "All Players"
                                    : f === "sponsored"
                                        ? "⭐ Sponsored"
                                        : "📅 Upcoming"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Players Grid */}
                {filteredPlayers.length === 0 ? (
                    <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-16 text-center">
                        <div className="text-5xl mb-4">🏓</div>
                        <h3 className="text-lg font-semibold text-[#e8f2f2] mb-2">
                            {search || filter !== "all"
                                ? "No players match your search"
                                : "No players registered yet"}
                        </h3>
                        <p className="text-[#e8f2f2]/40 text-sm">
                            {search || filter !== "all"
                                ? "Try adjusting your search or filters."
                                : "Be the first to join! Click Player Login in the navbar."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPlayers.map((player) => (
                            <Link
                                key={player.id}
                                href={`/players/${player.id}`}
                                className="group bg-gradient-to-br from-[#1a2424] to-[#1e2a2a] border border-[#237c99]/15 rounded-2xl p-6 hover:border-[#237c99]/40 hover:shadow-xl hover:shadow-[#237c99]/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Player Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#237c99] to-[#c5e8a1] flex items-center justify-center text-xl font-bold text-[#121919] shrink-0 group-hover:shadow-lg group-hover:shadow-[#237c99]/20 transition-all">
                                        {player.name[0]?.toUpperCase() || "?"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-[#e8f2f2] group-hover:text-[#c5e8a1] transition-colors truncate">
                                            {player.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {player.city && (
                                                <span className="text-xs text-[#e8f2f2]/40">
                                                    📍 {player.city}
                                                    {player.state ? `, ${player.state}` : ""}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {player.dominant_hand && (
                                        <span className="text-[10px] bg-[#237c99]/10 text-[#237c99] px-2.5 py-1 rounded-full border border-[#237c99]/15 font-medium">
                                            {player.dominant_hand} Hand
                                        </span>
                                    )}
                                    {player.dupr_id && (
                                        <span className="text-[10px] bg-[#c5e8a1]/10 text-[#c5e8a1] px-2.5 py-1 rounded-full border border-[#c5e8a1]/15 font-medium">
                                            DUPR: {player.dupr_id}
                                        </span>
                                    )}
                                    {player.has_sponsorship && (
                                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full border border-yellow-500/15 font-medium">
                                            ⭐ Sponsored
                                        </span>
                                    )}
                                    {player.age && (
                                        <span className="text-[10px] bg-[#e8f2f2]/5 text-[#e8f2f2]/40 px-2.5 py-1 rounded-full border border-[#e8f2f2]/10 font-medium">
                                            Age {player.age}
                                        </span>
                                    )}
                                </div>

                                {/* Bio snippet */}
                                {player.bio && (
                                    <p className="text-xs text-[#e8f2f2]/35 mb-4 line-clamp-2 leading-relaxed">
                                        {player.bio}
                                    </p>
                                )}

                                {/* Recent Results */}
                                {player.latest_tournaments.length > 0 && (
                                    <div className="mb-4 space-y-2">
                                        <p className="text-[10px] text-[#e8f2f2]/30 font-semibold uppercase tracking-wider">
                                            Recent Results
                                        </p>
                                        {player.latest_tournaments.slice(0, 2).map((t) => (
                                            <div
                                                key={t.id}
                                                className="bg-[#121919]/40 rounded-lg px-3 py-2 border border-[#237c99]/8"
                                            >
                                                <p className="text-xs font-medium text-[#e8f2f2]/70 truncate">
                                                    {t.tournament_name}
                                                </p>
                                                <div className="flex gap-3 mt-1">
                                                    {t.singles_result && (
                                                        <span className="text-[10px] text-[#c5e8a1]/70">
                                                            {getMedalEmoji(t.singles_result)} S:{" "}
                                                            {t.singles_result}
                                                        </span>
                                                    )}
                                                    {t.doubles_result && (
                                                        <span className="text-[10px] text-[#c5e8a1]/70">
                                                            {getMedalEmoji(t.doubles_result)} D:{" "}
                                                            {t.doubles_result}
                                                        </span>
                                                    )}
                                                    {t.mixed_doubles_result && (
                                                        <span className="text-[10px] text-[#c5e8a1]/70">
                                                            {getMedalEmoji(t.mixed_doubles_result)} MX:{" "}
                                                            {t.mixed_doubles_result}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Next Tournament */}
                                {player.next_tournament && (
                                    <div className="bg-[#237c99]/8 border border-[#237c99]/15 rounded-xl px-3 py-2.5 mb-3">
                                        <p className="text-[10px] text-[#237c99] font-semibold uppercase tracking-wider mb-1">
                                            Next Stop
                                        </p>
                                        <p className="text-xs font-medium text-[#e8f2f2]/80 truncate">
                                            {player.next_tournament}
                                        </p>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-[#e8f2f2]/5">
                                    <span className="text-[10px] text-[#e8f2f2]/25">
                                        {player.tournament_count} tournament
                                        {player.tournament_count !== 1 ? "s" : ""} played
                                    </span>
                                    <span className="text-[10px] text-[#237c99] group-hover:text-[#c5e8a1] font-medium transition-colors flex items-center gap-1">
                                        View Profile
                                        <svg
                                            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
