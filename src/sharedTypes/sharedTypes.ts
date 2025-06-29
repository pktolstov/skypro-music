export type TrackType = {
    _id: number;
    name: string;
    author: string;
    release_date: string;
    genre: string[];
    duration_in_seconds: number;
    album: string;
    logo: string | null;
    track_file: string;
    stared_user: string[];
}

export type TrackSetType = {
    _id: number,
    name: string,
    items: string[],
    owner: number[],
    __v: number
}
export type UserType = {
    email: string;
    username: string;
    _id: number;
}