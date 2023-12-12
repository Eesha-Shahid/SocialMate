export class CreateRedditPostDto {
    sr: string;
	title: string;
	text?: string;
	url?: string;
	flair_text?: string;
	flair_id?: string;   
}