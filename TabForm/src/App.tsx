import { type JSX } from "react";
import Navigator from "./Component/Navigator";
import "./App.css";

export default function App(): JSX.Element {

  return (
    <div className="App">
      <div className="navigator">
        <Navigator />
      </div>
    </div>
  );
}
