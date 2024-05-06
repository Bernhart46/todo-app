import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { changeTheme } from "../../store/visual/visual-slice";
import "../group-functions/interfaces/interface.css";

export const ThemeComponent = () => {
  const state = useSelector((state: RootState) => state).visual;
  const dispatch = useDispatch<AppDispatch>();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeTheme({ theme: e.target.value }));
  };

  return (
    <>
      <div className="settings__theme-container">
        <div className="settings__title">Theme:</div>
        <select
          onChange={onSelectChange}
          className="sort-select theme-select"
          value={state.theme}
        >
          <option value="dark">Dark Theme</option>
          <option value="proton">Proton Theme (quite nice)</option>
          <option value="light-blue">Light Blue Theme (ugly)</option>
          <option value="light-red">Light Red Theme (ugly)</option>
          <option value="light-orange">Light Orange Theme (ugly)</option>
          <option value="light-green">Light Green Theme (ugly)</option>
          <option value="light-purple">Light Purple Theme (ugly)</option>
          <option value="light-gray">Light Gray Theme (ugly)</option>
        </select>
      </div>
    </>
  );
};
