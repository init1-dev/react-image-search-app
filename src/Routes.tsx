import { createBrowserRouter, redirect } from 'react-router-dom';

import { RootView } from './views/RootView';
import { SearchPhotos } from './views/SearchPhotos';
import { SavedPhotos } from './views/SavedPhotos';

export const appName = '/react-image-search-app';

const appRouter = createBrowserRouter([
    {
        id: "root",
        path: appName,
        Component: RootView,
        children: [
            {
                path: appName,
                Component: SearchPhotos
            },
            {
                path: appName + "/saved",
                Component: SavedPhotos
            },
            {
                path: "*",
                async loader() {
                    return redirect(appName);
                }
            }
        ]
    }
]);

export default appRouter;