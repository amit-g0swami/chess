// import { Chess } from "./features";
import { Provider } from "react-redux";
import { TableComponent } from "./features/table";
import { store } from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <TableComponent />;
    </Provider>
  );
}

export default App;
