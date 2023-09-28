import { KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { addNewTask, removeGroup } from '../store/todo/todo-slice';
import { setNavbarScrollTop } from '../store/visual/visual-slice';

export const TodoCreationComponent = ({
  groupName,
  scrollToBottom,
}: {
  groupName: string;
  scrollToBottom: () => void;
}) => {
  const [isCreateToggled, setIsCreateToggled] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const groups = useSelector((state: RootState) => state.todo);
  const group = groups.find((elem) => elem.name === groupName);

  const dispatch = useDispatch<AppDispatch>();

  const cancelCreation = () => {
    resetForm();
  };

  const keyboardCheck = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addTask();
    }
    if (e.code === 'Escape') {
      cancelCreation();
    }
  };

  const resetForm = () => {
    setIsError(false);
    setTitle('');
    setDescription('');
    setIsCreateToggled(false);
  };

  const addTask = () => {
    if (title.trim() === '') {
      setIsError(true);
      return;
    }
    dispatch(
      addNewTask({
        groupName,
        title,
        description,
      })
    );
    resetForm();
  };

  return group ? (
    <>
      {!isCreateToggled ? (
        <div className="todo-buttons">
          {group.children.length < 20 && (
            <div
              className="todo-creation-button"
              tabIndex={401}
              onClick={() => {
                setIsCreateToggled(!isCreateToggled);

                scrollToBottom();
              }}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  setIsCreateToggled(true);
                  scrollToBottom();
                }
              }}
            >
              Create Task
            </div>
          )}
          <div
            className="remove-group-button"
            tabIndex={406}
            onClick={() => {
              dispatch(removeGroup({ groupName }));
              dispatch(setNavbarScrollTop({ number: 0 }));
              navigate('/');
            }}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                dispatch(removeGroup({ groupName }));
                dispatch(setNavbarScrollTop({ number: 0 }));
                navigate('/');
              }
            }}
          >
            Remove Group
          </div>
        </div>
      ) : (
        <div className="todo-creation-form">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
              isError && setIsError(false);
            }}
            onKeyUp={(e) => keyboardCheck(e)}
            tabIndex={isCreateToggled ? 402 : -1}
            className="todo-creation-title"
            style={{
              borderBottomColor: isError ? 'red' : 'white',
              outlineColor: isError ? 'red' : 'white',
            }}
          />
          <button
            type="button"
            onClick={addTask}
            className="todo-creation-add-button"
            tabIndex={isCreateToggled ? 404 : -1}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                addTask();
              }
            }}
          >
            Add
          </button>

          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            tabIndex={isCreateToggled ? 403 : -1}
            className="todo-creation-description"
            onKeyUp={(e) => keyboardCheck(e)}
          />
          <button
            type="button"
            onClick={cancelCreation}
            className="todo-creation-cancel-button"
            tabIndex={isCreateToggled ? 405 : -1}
            onKeyUp={(e) => {
              if (e.code === 'Escape') {
                cancelCreation();
              }
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  ) : (
    <h1>ERROR</h1>
  );
};
