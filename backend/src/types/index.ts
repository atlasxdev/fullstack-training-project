export interface RawAppMetaData {
    provider: string;
    providers: string[];
}

export interface RawUserMetaData {
    sub: string;
    email: string;
    password: string;
    username: string;
    email_verified: boolean;
    phone_verified: boolean;
}

export interface UserRecord {
    id: string;
    aud: string;
    role: string;
    email: string;
    phone: string | null;
    created_at: string;
    deleted_at: string | null;
    invited_at: string | null;
    updated_at: string;
    instance_id: string;
    is_sso_user: boolean;
    banned_until: string | null;
    confirmed_at: string;
    email_change: string;
    is_anonymous: boolean;
    phone_change: string;
    is_super_admin: boolean | null;
    recovery_token: string;
    last_sign_in_at: string | null;
    recovery_sent_at: string | null;
    raw_app_meta_data: RawAppMetaData;
    confirmation_token: string;
    email_confirmed_at: string | null;
    encrypted_password: string;
    phone_change_token: string;
    phone_confirmed_at: string | null;
    raw_user_meta_data: RawUserMetaData;
    confirmation_sent_at: string;
    email_change_sent_at: string | null;
    phone_change_sent_at: string | null;
    email_change_token_new: string;
    reauthentication_token: string;
    reauthentication_sent_at: string | null;
    email_change_token_current: string;
    email_change_confirm_status: number;
}

export interface WebhookPayload {
    type: string;
    table: string;
    record: UserRecord;
    schema: string;
    old_record: UserRecord;
}
