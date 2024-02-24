import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { RootView } from './views/RootView';
import { SearchPhotos } from './views/SearchPhotos';
import { SavedPhotos } from './views/SavedPhotos';
// import { Contact } from './views/Contact';

export const appName = '/react-image-search-app';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path={appName} element={<RootView />}>
      <Route path={appName} element={<SearchPhotos />} />
      <Route path={appName + "/saved"} element={<SavedPhotos />} />
      {/* <Route path={appName + "/contact"} element={<Contact />} /> */}
    </Route>
  ));

export default appRouter;