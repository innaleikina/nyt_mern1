// import React, { Component } from 'react';
// import Search from "./components/search/search";
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div class="header">
//           <h2>New York Times Article Scrubber</h2>
//           <p> Search for and annotate articles of interest</p>
//         </div>

//          <Search/>
//       </div>
//     );
//   }
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./components/pages/Articles";


const App = () => (
  <Router>
    <div>
  
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/books" component={Articles} />
        <Route exact path="/books/:id" component={Articles} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;

