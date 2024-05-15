import { createBrowserRouter, redirect } from 'react-router-dom';

import { RootView } from './views/RootView';
import { SearchPhotos } from './views/SearchPhotos';
import { SavedPhotos } from './views/SavedPhotos';

export const appName = '/react-image-search-app';
const paramsStr = `:page?/:query?`;

const appRouter = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: RootView,
        children: [
            {
                path: `${appName}/${paramsStr}`,
                Component: SearchPhotos
            },
            {
                path: `${appName}/saved/${paramsStr}`,
                Component: SavedPhotos,
                action: ({ params }) => {
                    const { page = 1, query = "" } = params;

                    return redirect(`${appName}/saved/${page}/${query}`);
                }
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