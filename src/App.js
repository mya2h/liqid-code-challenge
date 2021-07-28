import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from './components/Home'
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
