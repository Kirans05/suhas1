import {createRoot} from "react-dom/client"
import App from "./app"


let rootId = document.getElementById("root")
let root = createRoot(rootId)
root.render(<App />)