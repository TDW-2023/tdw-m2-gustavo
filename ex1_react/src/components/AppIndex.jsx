import { Link } from 'react-router-dom';

function AppIndex() {

    return(
        <div>
        <ul>
            <h3>Index</h3>
          <li>
                <Link to="/ex1">EX1 - First Todo: "todo, filter, search and form"</Link>
          </li>
          <br/>
          {/* <li>
                <Link to="/ex2">EX2 - Second Todo: "style components - only app.js"</Link>
          </li> */}
        </ul>
        </div>
    );
}

export default AppIndex;
