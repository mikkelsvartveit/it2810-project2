import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import LoginPage from "../pages/LoginPage";

it("Login Page renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
