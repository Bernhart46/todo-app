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
      <div className="settings__data-container">
        <div className="settings__title">Theme:</div>
        <select
          onChange={onSelectChange}
          className="sort-select"
          style={{
            gridRow: "1",
            gridColumn: "2 / span 3",
            textAlign: "center",
          }}
          defaultValue={state.theme}
        >
          <option value="dark">Dark Theme</option>
          <option value="light">Light Theme (ugly)</option>
        </select>
      </div>
    </>
  );
};
