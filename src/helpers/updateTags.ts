import { SavedTags } from "./interfaces";

export const updateTags = (tagsArray: SavedTags[], tagsToCheck: string[]) => {
    for (const tag of tagsToCheck) {
        const index = tagsArray.findIndex((item) => item.name === tag);

        if(index !== -1) {
            const removeTag = tagsArray[index].count - 1;
            
            if(removeTag === 0) {
                tagsArray.splice(index, 1);
            } else {
                tagsArray[index].count = removeTag;
            }
        }
    }
};