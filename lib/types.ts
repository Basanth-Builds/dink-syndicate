export interface Profile {
    id: string;
    name: string;
    age: number | null;
    gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say' | null;
    dominant_hand: 'Right' | 'Left' | 'Ambidextrous' | null;
    dupr_id: string | null;
    bio: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    has_sponsorship: boolean;
    sponsorship_details: string | null;
    next_tournament: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface TournamentHistory {
    id: string;
    profile_id: string;
    tournament_name: string;
    tournament_date: string | null;
    location: string | null;
    singles_result: string | null;
    doubles_result: string | null;
    mixed_doubles_result: string | null;
    notes: string | null;
    created_at: string;
}
