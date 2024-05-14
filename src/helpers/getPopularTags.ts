import { SavedTags } from "./interfaces";

export const GetPopularTags = (tags: SavedTags[]): SavedTags[] => {
    const orderedTags = Array.from(tags).sort((a, b) => b.count - a.count);
    
    return orderedTags.slice(0, 5);
}