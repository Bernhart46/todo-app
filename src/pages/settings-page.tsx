import { DataComponent } from "../components/settings/data-component";
import "./settings-page.css";

export const SettingsPage = () => {
  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Settings</h1>
      <hr />
      <DataComponent />
      <hr />
    </div>
  );
};
