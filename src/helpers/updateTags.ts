import { SavedTags } from "./interfaces";

export const updateTags = (tagsArray: SavedTags[], tagsToCheck: string[]) => {
    for (const tag in tagsToCheck) {
        const index = tagsArray.findIndex((item) => item.name === tag);

        if(index !== -1) {
            tagsArray[index].count -= 1;

            if(tagsArray[index].count === 0) {
                tagsArray.slice(index, 1);
            }
        }
    }
    return tagsArray;
};