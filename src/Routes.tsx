import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { RootView } from './views/RootView';
import { SearchPhotos } from './views/SearchPhotos';
import { SavedPhotos } from './views/SavedPhotos';

export const appName = '/react-image-search-app';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path={appName} element={<RootView />}>
      <Route path={appName} element={<SearchPhotos />} />
      <Route path={appName + "/saved"} element={<SavedPhotos />} />
    </Route>
  ));

export default appRouter;