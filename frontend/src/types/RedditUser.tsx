import { Types } from "mongoose";

export type RedditUser = {
    is_employee: boolean;
	seen_layout_switch: boolean;
	has_visited_new_profile: boolean;
	pref_no_profanity: boolean;
	has_external_account: boolean;
	pref_geopopular: string;
	seen_redesign_modal: boolean;
	pref_show_trending: boolean;
	subreddit: {
		default_set: boolean;
		user_is_contributor: boolean;
		banner_img: string;
		restrict_posting: boolean;
		user_is_banned: boolean;
		free_form_reports: boolean;
		community_icon: string;
		show_media: boolean;
		icon_color: string;
		user_is_muted: boolean;
		display_name: string;
		header_img: string;
		title: string;
		coins: number;
		previous_names: string[];
		over_18: boolean;
		icon_size: [number, number];
		primary_color: string;
		icon_img: string;
		description: string;
		allowed_media_in_comments: any[];
		submit_link_label: string;
		header_size: any;
		restrict_commenting: boolean;
		subscribers: number;
		submit_text_label: string;
		is_default_icon: boolean;
		link_flair_position: string;
		display_name_prefixed: string;
		key_color: string;
		name: string;
		is_default_banner: boolean;
		url: string;
		quarantine: boolean;
		banner_size: [number, number];
		user_is_moderator: boolean;
		accept_followers: boolean;
		public_description: string;
		link_flair_enabled: boolean;
		disable_contributor_requests: boolean;
		subreddit_type: string;
		user_is_subscriber: boolean;
	};
	pref_show_presence: boolean;
	snoovatar_img: string;
	snoovatar_size: [number, number];
	gold_expiration: any;
	has_gold_subscription: boolean;
	is_sponsor: boolean;
	num_friends: number;
	features: {
		mod_service_mute_writes: boolean;
		promoted_trend_blanks: boolean;
		show_amp_link: boolean;
		chat: boolean;
		is_email_permission_required: true;
		mod_awards: boolean;
		expensive_coins_package: boolean;
		mweb_xpromo_revamp_v2: {
			owner: string;
			variant: string;
			experiment_id: number;
		};
		awards_on_streams: boolean;
		mweb_xpromo_modal_listing_click_daily_dismissible_ios: true;
		chat_subreddit: boolean;
		cookie_consent_banner: boolean;
		modlog_copyright_removal: boolean;
		do_not_track: boolean;
		images_in_comments: boolean;
		mod_service_mute_reads: boolean;
		chat_user_settings: boolean;
		use_pref_account_deployment: boolean;
		mweb_xpromo_interstitial_comments_ios: boolean;
		mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean;
		premium_subscriptions_table: boolean;
		mweb_xpromo_interstitial_comments_android: true;
		crowd_control_for_post: boolean;
		mweb_nsfw_xpromo: { owner: string; variant: string; experiment_id: number };
		noreferrer_to_noopener: boolean;
		chat_group_rollout: boolean;
		resized_styles_images: boolean;
		spez_modal: boolean;
		mweb_sharing_clipboard: {
			owner: string;
			variant: string;
			experiment_id: number;
		};
	};
	can_edit_name: boolean;
	verified: boolean;
	pref_autoplay: boolean;
	coins: number;
	has_paypal_subscription: boolean;
	has_subscribed_to_premium: boolean;
	id: string;
	has_stripe_subscription: boolean;
	oauth_client_id: string;
	can_create_subreddit: boolean;
	over_18: boolean;
	is_gold: boolean;
	is_mod: boolean;
	awarder_karma: number;
	suspension_expiration_utc: any;
	has_verified_email: boolean;
	is_suspended: boolean;
	pref_video_autoplay: boolean;
	has_android_subscription: boolean;
	in_redesign_beta: boolean;
	icon_img: string;
	pref_nightmode: boolean;
	awardee_karma: number;
	hide_from_robots: boolean;
	password_set: boolean;
	link_karma: number;
	force_password_reset: boolean;
	total_karma: number;
	seen_give_award_tooltip: boolean;
	inbox_count: number;
	seen_premium_adblock_modal: boolean;
	pref_top_karma_subreddits: boolean;
	pref_show_snoovatar: boolean;
	name: string;
	pref_clickgadget: number;
	created: number;
	gold_creddits: number;
	created_utc: number;
	has_ios_subscription: boolean;
	pref_show_twitter: boolean;
	in_beta: boolean;
	comment_karma: number;
	accept_followers: boolean;
	has_subscribed: boolean;
	linked_identities: any[];
	seen_subreddit_chat_ftux: boolean;
}

export type RedditKarma = {
	kind: string;
	data: string[];
}

export type RedditPost = {
	sr: string;
	title: string;
	text: string;
	url: string;
	flairName: string;
	flairId: string;
}

export type ScheduledRedditPost = {
	_id: Types.ObjectId;
	sr: string;
	title: string;
	text: string;
	url: string;
	flairName: string;
	flairId: string;
	scheduledTime: Date;
}

export type ScheduledPost = {
	_id: Types.ObjectId;
	user: Types.ObjectId;
	redditPost:{
		_id:Types.ObjectId;
		sr:string;
		url?:string;
		text?:string;
		flair_text?: string;
		flair_id?: string;
		title:string;
	};
	scheduledTime: Date;
	createdAt: any;
	updatedAt: any;
}

export type Flair = {
    id: string;
    text: string;
    emojiUrl: string;
	background_color: string;
	text_color: string;
}

export type Subreddt = {
	id: string;
	display_name: string;
	public_description: string;
}