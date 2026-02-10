"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Profile, TournamentHistory } from "@/lib/types";

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [tournaments, setTournaments] = useState<TournamentHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"profile" | "tournaments">(
        "profile"
    );
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);
    const [showTournamentForm, setShowTournamentForm] = useState(false);
    const [editingTournament, setEditingTournament] =
        useState<TournamentHistory | null>(null);

    const supabase = createClient();
    const router = useRouter();

    const fetchProfile = useCallback(async () => {
        if (!supabase) {
            router.push("/login");
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (profileData) setProfile(profileData);

        const { data: tournamentsData } = await supabase
            .from("tournament_history")
            .select("*")
            .eq("profile_id", user.id)
            .order("tournament_date", { ascending: false });

        if (tournamentsData) setTournaments(tournamentsData);
        setLoading(false);
    }, [supabase, router]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile || !supabase) return;

        setSaving(true);
        setMessage(null);

        const { error } = await supabase
            .from("profiles")
            .update({
                name: profile.name,
                age: profile.age,
                gender: profile.gender,
                dominant_hand: profile.dominant_hand,
                dupr_id: profile.dupr_id,
                bio: profile.bio,
                city: profile.city,
                state: profile.state,
                country: profile.country,
                has_sponsorship: profile.has_sponsorship,
                sponsorship_details: profile.has_sponsorship
                    ? profile.sponsorship_details
                    : null,
                next_tournament: profile.next_tournament,
                updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({ type: "success", text: "Profile saved successfully!" });
        }
        setSaving(false);
    };

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const handleTournamentSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile || !editingTournament || !supabase) return;

        setSaving(true);
        setMessage(null);

        if (editingTournament.id && !editingTournament.id.startsWith("new-")) {
            // Update existing
            const { error } = await supabase
                .from("tournament_history")
                .update({
                    tournament_name: editingTournament.tournament_name,
                    tournament_date: editingTournament.tournament_date,
                    location: editingTournament.location,
                    singles_result: editingTournament.singles_result,
                    doubles_result: editingTournament.doubles_result,
                    mixed_doubles_result: editingTournament.mixed_doubles_result,
                    notes: editingTournament.notes,
                })
                .eq("id", editingTournament.id);

            if (error) {
                setMessage({ type: "error", text: error.message });
            } else {
                setMessage({
                    type: "success",
                    text: "Tournament updated successfully!",
                });
            }
        } else {
            // Insert new
            const { error } = await supabase.from("tournament_history").insert({
                profile_id: profile.id,
                tournament_name: editingTournament.tournament_name,
                tournament_date: editingTournament.tournament_date,
                location: editingTournament.location,
                singles_result: editingTournament.singles_result,
                doubles_result: editingTournament.doubles_result,
                mixed_doubles_result: editingTournament.mixed_doubles_result,
                notes: editingTournament.notes,
            });

            if (error) {
                setMessage({ type: "error", text: error.message });
            } else {
                setMessage({ type: "success", text: "Tournament added successfully!" });
            }
        }

        setSaving(false);
        setShowTournamentForm(false);
        setEditingTournament(null);
        fetchProfile();
    };

    const handleDeleteTournament = async (id: string) => {
        if (!supabase) return;
        if (!confirm("Are you sure you want to delete this tournament entry?"))
            return;

        const { error } = await supabase
            .from("tournament_history")
            .delete()
            .eq("id", id);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({
                type: "success",
                text: "Tournament entry deleted successfully!",
            });
            fetchProfile();
        }
    };

    const startNewTournament = () => {
        setEditingTournament({
            id: "new-" + Date.now(),
            profile_id: profile?.id || "",
            tournament_name: "",
            tournament_date: null,
            location: null,
            singles_result: null,
            doubles_result: null,
            mixed_doubles_result: null,
            notes: null,
            created_at: new Date().toISOString(),
        });
        setShowTournamentForm(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121919] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#237c99]/30 border-t-[#237c99] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#e8f2f2]/60">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121919] relative">
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#237c99]/8 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#c5e8a1]/8 blur-3xl" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#121919]/95 backdrop-blur-sm border-b border-[#237c99]/20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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
                                Manage your Dink Syndicate profile
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-sm text-[#e8f2f2]/60 hover:text-red-400 border border-[#e8f2f2]/10 hover:border-red-400/30 rounded-xl transition-all cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-xl border text-sm animate-fade-in-up ${message.type === "success"
                            ? "bg-[#c5e8a1]/10 border-[#c5e8a1]/30 text-[#c5e8a1]"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Profile Header Card */}
                <div className="bg-gradient-to-br from-[#1a2424] to-[#1a2828] border border-[#237c99]/20 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl shadow-black/20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#237c99] to-[#c5e8a1] flex items-center justify-center text-3xl font-bold text-[#121919] shadow-lg shadow-[#237c99]/20 shrink-0">
                            {profile?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-[#e8f2f2]">
                                {profile?.name || "Set up your profile"}
                            </h2>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {profile?.city && (
                                    <span className="text-xs bg-[#237c99]/10 text-[#237c99] px-3 py-1 rounded-full border border-[#237c99]/20">
                                        📍 {profile.city}
                                        {profile.state ? `, ${profile.state}` : ""}
                                    </span>
                                )}
                                {profile?.dominant_hand && (
                                    <span className="text-xs bg-[#c5e8a1]/10 text-[#c5e8a1] px-3 py-1 rounded-full border border-[#c5e8a1]/20">
                                        🏓 {profile.dominant_hand} Handed
                                    </span>
                                )}
                                {profile?.dupr_id && (
                                    <span className="text-xs bg-[#237c99]/10 text-[#237c99] px-3 py-1 rounded-full border border-[#237c99]/20">
                                        DUPR: {profile.dupr_id}
                                    </span>
                                )}
                                {profile?.has_sponsorship && (
                                    <span className="text-xs bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/20">
                                        ⭐ Sponsored
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-[#1a2424] p-1 rounded-xl border border-[#237c99]/10 mb-6">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === "profile"
                            ? "bg-[#237c99] text-white shadow-lg shadow-[#237c99]/20"
                            : "text-[#e8f2f2]/60 hover:text-[#e8f2f2]"
                            }`}
                    >
                        Profile Details
                    </button>
                    <button
                        onClick={() => setActiveTab("tournaments")}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === "tournaments"
                            ? "bg-[#237c99] text-white shadow-lg shadow-[#237c99]/20"
                            : "text-[#e8f2f2]/60 hover:text-[#e8f2f2]"
                            }`}
                    >
                        Tournament History ({tournaments.length})
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && profile && (
                    <form onSubmit={handleProfileSave}>
                        <div className="space-y-6">
                            {/* Personal Info */}
                            <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6 sm:p-8">
                                <h3 className="text-lg font-semibold text-[#c5e8a1] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#c5e8a1]/10 flex items-center justify-center text-sm">
                                        👤
                                    </span>
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) =>
                                                setProfile({ ...profile, name: e.target.value })
                                            }
                                            required
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            min="10"
                                            max="100"
                                            value={profile.age || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    age: e.target.value ? parseInt(e.target.value) : null,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Gender
                                        </label>
                                        <select
                                            value={profile.gender || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    gender: (e.target.value as Profile["gender"]) || null,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">
                                                Prefer not to say
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Dominant Hand
                                        </label>
                                        <select
                                            value={profile.dominant_hand || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    dominant_hand:
                                                        (e.target
                                                            .value as Profile["dominant_hand"]) || null,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        >
                                            <option value="">Select hand</option>
                                            <option value="Right">Right</option>
                                            <option value="Left">Left</option>
                                            <option value="Ambidextrous">Ambidextrous</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            DUPR ID
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.dupr_id || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    dupr_id: e.target.value || null,
                                                })
                                            }
                                            placeholder="Your DUPR rating ID"
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            value={profile.bio || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    bio: e.target.value || null,
                                                })
                                            }
                                            rows={3}
                                            placeholder="Tell us about your pickleball journey..."
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6 sm:p-8">
                                <h3 className="text-lg font-semibold text-[#c5e8a1] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#c5e8a1]/10 flex items-center justify-center text-sm">
                                        📍
                                    </span>
                                    Location
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.city || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    city: e.target.value || null,
                                                })
                                            }
                                            placeholder="Your city"
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.state || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    state: e.target.value || null,
                                                })
                                            }
                                            placeholder="Your state"
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.country || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    country: e.target.value || null,
                                                })
                                            }
                                            placeholder="Your country"
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sponsorship */}
                            <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6 sm:p-8">
                                <h3 className="text-lg font-semibold text-[#c5e8a1] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#c5e8a1]/10 flex items-center justify-center text-sm">
                                        ⭐
                                    </span>
                                    Sponsorship & Tournaments
                                </h3>

                                <div className="space-y-5">
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={profile.has_sponsorship}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        has_sponsorship: e.target.checked,
                                                    })
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#121919] border border-[#237c99]/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#237c99]/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#e8f2f2]/40 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#237c99] peer-checked:after:bg-white" />
                                        </label>
                                        <span className="text-sm text-[#e8f2f2]/70">
                                            Active Sponsorship
                                        </span>
                                    </div>

                                    {profile.has_sponsorship && (
                                        <div>
                                            <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                Sponsorship Details
                                            </label>
                                            <input
                                                type="text"
                                                value={profile.sponsorship_details || ""}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        sponsorship_details: e.target.value || null,
                                                    })
                                                }
                                                placeholder="Name of sponsor(s)"
                                                className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                            Next Tournament Stop
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.next_tournament || ""}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    next_tournament: e.target.value || null,
                                                })
                                            }
                                            placeholder="e.g. National Championship 2026 - Delhi"
                                            className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full py-4 bg-gradient-to-r from-[#237c99] to-[#1a5d73] text-white font-semibold rounded-xl hover:from-[#1a5d73] hover:to-[#237c99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#237c99]/20 hover:shadow-[#237c99]/40 cursor-pointer text-lg"
                            >
                                {saving ? "Saving..." : "Save Profile"}
                            </button>
                        </div>
                    </form>
                )}

                {/* Tournaments Tab */}
                {activeTab === "tournaments" && (
                    <div className="space-y-6">
                        {/* Add Tournament Button */}
                        <button
                            onClick={startNewTournament}
                            className="w-full py-4 border-2 border-dashed border-[#237c99]/30 rounded-2xl text-[#237c99] hover:border-[#237c99] hover:bg-[#237c99]/5 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add Tournament Entry
                        </button>

                        {/* Tournament Form Modal */}
                        {showTournamentForm && editingTournament && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                                <div className="bg-[#1a2424] border border-[#237c99]/20 rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                                    <h3 className="text-xl font-bold text-[#e8f2f2] mb-6">
                                        {editingTournament.id?.startsWith("new-")
                                            ? "Add Tournament"
                                            : "Edit Tournament"}
                                    </h3>

                                    <form onSubmit={handleTournamentSave} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                Tournament Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={editingTournament.tournament_name}
                                                onChange={(e) =>
                                                    setEditingTournament({
                                                        ...editingTournament,
                                                        tournament_name: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g. PPA Tour Championship"
                                                className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={editingTournament.tournament_date || ""}
                                                    onChange={(e) =>
                                                        setEditingTournament({
                                                            ...editingTournament,
                                                            tournament_date: e.target.value || null,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingTournament.location || ""}
                                                    onChange={(e) =>
                                                        setEditingTournament({
                                                            ...editingTournament,
                                                            location: e.target.value || null,
                                                        })
                                                    }
                                                    placeholder="City, State"
                                                    className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-sm font-semibold text-[#c5e8a1]">
                                                Results
                                            </h4>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                    🏆 Singles Result
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingTournament.singles_result || ""}
                                                    onChange={(e) =>
                                                        setEditingTournament({
                                                            ...editingTournament,
                                                            singles_result: e.target.value || null,
                                                        })
                                                    }
                                                    placeholder="e.g. Gold, Semi-finalist, Round of 16"
                                                    className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                    🏆 Doubles Result
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingTournament.doubles_result || ""}
                                                    onChange={(e) =>
                                                        setEditingTournament({
                                                            ...editingTournament,
                                                            doubles_result: e.target.value || null,
                                                        })
                                                    }
                                                    placeholder="e.g. Silver, Quarter-finalist"
                                                    className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                    🏆 Mixed Doubles Result
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingTournament.mixed_doubles_result || ""}
                                                    onChange={(e) =>
                                                        setEditingTournament({
                                                            ...editingTournament,
                                                            mixed_doubles_result: e.target.value || null,
                                                        })
                                                    }
                                                    placeholder="e.g. Bronze, Finalist"
                                                    className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#e8f2f2]/70 mb-2">
                                                Notes
                                            </label>
                                            <textarea
                                                value={editingTournament.notes || ""}
                                                onChange={(e) =>
                                                    setEditingTournament({
                                                        ...editingTournament,
                                                        notes: e.target.value || null,
                                                    })
                                                }
                                                rows={2}
                                                placeholder="Any additional notes..."
                                                className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/20 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/20 focus:outline-none focus:ring-2 focus:ring-[#237c99]/40 focus:border-[#237c99] transition-all resize-none"
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="flex-1 py-3 bg-gradient-to-r from-[#237c99] to-[#1a5d73] text-white font-semibold rounded-xl hover:from-[#1a5d73] hover:to-[#237c99] transition-all disabled:opacity-50 cursor-pointer"
                                            >
                                                {saving ? "Saving..." : "Save Tournament"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowTournamentForm(false);
                                                    setEditingTournament(null);
                                                }}
                                                className="px-6 py-3 border border-[#e8f2f2]/10 text-[#e8f2f2]/60 rounded-xl hover:border-[#e8f2f2]/30 hover:text-[#e8f2f2] transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Tournament List */}
                        {tournaments.length === 0 ? (
                            <div className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-12 text-center">
                                <div className="text-5xl mb-4">🏆</div>
                                <h3 className="text-lg font-semibold text-[#e8f2f2] mb-2">
                                    No Tournaments Yet
                                </h3>
                                <p className="text-[#e8f2f2]/40 text-sm">
                                    Start adding your tournament history to build your player
                                    profile.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tournaments.map((t) => (
                                    <div
                                        key={t.id}
                                        className="bg-[#1a2424] border border-[#237c99]/15 rounded-2xl p-6 hover:border-[#237c99]/30 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-[#e8f2f2]">
                                                    {t.tournament_name}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-[#e8f2f2]/40">
                                                    {t.tournament_date && (
                                                        <span>
                                                            📅{" "}
                                                            {new Date(t.tournament_date).toLocaleDateString(
                                                                "en-IN",
                                                                {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                    )}
                                                    {t.location && <span>📍 {t.location}</span>}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingTournament(t);
                                                        setShowTournamentForm(true);
                                                    }}
                                                    className="p-2 text-[#237c99] hover:bg-[#237c99]/10 rounded-lg transition-all cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTournament(t.id)}
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Results Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {t.singles_result && (
                                                <div className="bg-[#121919]/50 rounded-xl p-3 border border-[#237c99]/10">
                                                    <p className="text-xs text-[#e8f2f2]/40 mb-1">
                                                        Singles
                                                    </p>
                                                    <p className="text-sm font-medium text-[#c5e8a1]">
                                                        {t.singles_result}
                                                    </p>
                                                </div>
                                            )}
                                            {t.doubles_result && (
                                                <div className="bg-[#121919]/50 rounded-xl p-3 border border-[#237c99]/10">
                                                    <p className="text-xs text-[#e8f2f2]/40 mb-1">
                                                        Doubles
                                                    </p>
                                                    <p className="text-sm font-medium text-[#c5e8a1]">
                                                        {t.doubles_result}
                                                    </p>
                                                </div>
                                            )}
                                            {t.mixed_doubles_result && (
                                                <div className="bg-[#121919]/50 rounded-xl p-3 border border-[#237c99]/10">
                                                    <p className="text-xs text-[#e8f2f2]/40 mb-1">
                                                        Mixed Doubles
                                                    </p>
                                                    <p className="text-sm font-medium text-[#c5e8a1]">
                                                        {t.mixed_doubles_result}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {t.notes && (
                                            <p className="mt-3 text-sm text-[#e8f2f2]/40 italic">
                                                {t.notes}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
