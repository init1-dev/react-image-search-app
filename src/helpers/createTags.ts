import { SavedState, SavedTags, TagInterface } from "./interfaces";

export const createTags = (state: SavedState, tags: TagInterface[]) => {
    tags.forEach((tag: TagInterface) => {
        const existingTagIndex = state.tags.findIndex((savedTag: SavedTags) => savedTag.name === tag.title);
        if(existingTagIndex !== -1) {
            state.tags[existingTagIndex].count++;
        } else {
            state.tags.push({ name: tag.title, count: 1 });
        }
    });
}