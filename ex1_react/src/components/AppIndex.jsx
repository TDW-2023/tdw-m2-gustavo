import { Link } from "react-router-dom";

function AppIndex() {

    return(
        <div>
        <ul>
            <h3>Index</h3>
          <li>
                <Link to="/ex1">EX1 - First Todo: "todo, filter, search and form"</Link>
          </li>
          <br/>
          <li>
                <Link to="/ex2">EX2 - Second Todo: "styled components - only app.js"</Link>
          </li>
          <br/>
          <li>
                <Link to="/ex3">EX3 - Third Todo: "props types - only app.js"</Link>
          </li>
        </ul>
        </div>
    );
}

export default AppIndex;
