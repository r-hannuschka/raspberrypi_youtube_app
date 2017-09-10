import { IThumbnail } from './thumbnail.interface';

export interface ISnippet {
    categoryId: string;

    channelId: string;

    channelTitle: string;

    defaultAudioLanguage: string;

    description: string;

    liveBroadcastContent: string;

    localized: {
        description: string;

        title: string;
    };

    publishedAt: string;

    tags: string[];

    thumbnails: {
        default: IThumbnail;
        high: IThumbnail;
        maxres: IThumbnail;
        medium: IThumbnail;
        standard: IThumbnail;
    };

    title: string;
}
