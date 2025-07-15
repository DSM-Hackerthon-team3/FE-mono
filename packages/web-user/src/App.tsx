// import { RouterProvider } from "react-router-dom";
// import { Router } from "./router";
import { Input } from "./components/Input";
import { Button } from "./components/Button"
import { DropDown } from "./components/DropDown";
const grade = { data : ["1학년","2학년","3학년"]};

function App() {
  //return <RouterProvider router={Router} />;
  return <div>
    <Input />
    <Button />
    <DropDown props={grade}/>
    </div>
}

export default App;

