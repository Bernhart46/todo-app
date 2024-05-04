import { DataComponent } from "../components/settings/data-component";
import { ThemeComponent } from "../components/settings/theme-component";
import "./settings-page.css";

export const SettingsPage = () => {
  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Settings</h1>
      <hr />
      <div className="settings-container">
        <DataComponent />
      </div>
      <hr />
      <div className="settings-container">
        <ThemeComponent />
      </div>
      <hr />
    </div>
  );
};
