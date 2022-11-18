import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './components/Layouts';
import HeaderOnly from './components/Layouts/HeaderOnly';
import { publicRoutes } from './router';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout
                      if (route.layout === null) {
                        Layout = Fragment
                      }  else if(route.layout === HeaderOnly) {
                        Layout = HeaderOnly
                      }                 
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
