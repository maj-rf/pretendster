import { Layout } from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
