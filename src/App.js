import Form from './pages/Form';
import Table from './pages/Table';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Form} />
                <Route exact path="/table" component={Table} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;