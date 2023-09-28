import { useState, useEffect, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  loadState,
  moveChildDown,
  moveChildUp,
  moveGroupDown,
  moveGroupUp,
  todoGroup,
} from '../store/todo/todo-slice';
import { setStateLoaded } from '../store/visual/visual-slice';

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  return [size.width, size.height];
};

export const useGetGroupAmount = () => {
  const length = useSelector((state: RootState) => state.todo.length);

  return length;
};

type useChangeIndexProp = {
  event: KeyboardEvent<HTMLDivElement | HTMLAnchorElement>;
  groupName: string;
  childName?: string | undefined;
};

export const useChangeIndex = () => {
  const dispatch = useDispatch<AppDispatch>();

  const func = ({ event, groupName, childName }: useChangeIndexProp) => {
    if (event.code !== 'ArrowUp' && event.code !== 'ArrowDown') return;

    if (event.code === 'ArrowUp') {
      if (childName) {
        dispatch(moveChildUp({ groupName, childName }));
      } else {
        dispatch(moveGroupUp({ groupName }));
      }
    }
    if (event.code === 'ArrowDown') {
      if (childName) {
        dispatch(moveChildDown({ groupName, childName }));
      } else {
        dispatch(moveGroupDown({ groupName }));
      }
    }
  };

  return func;
};

export const useSave = () => {
  const todoState = useSelector((state: RootState) => state.todo);
  const func = () => {
    localStorage.setItem('state', JSON.stringify(todoState));
  };
  return func;
};

export const useLoad = () => {
  const defaultData: todoGroup[] = [
    {
      name: 'Test Group 1',
      children: [
        {
          id: 2826651,
          name: 'Test Item 1',
          description: 'Just some description to the Test Item 1.',
          status: 'NOT_STARTED',
        },
        {
          id: 5368738,
          name: 'Test Item 2',
          description: 'Just some description to the Test Item 2.',
          status: 'IN_PROGRESS',
        },
      ],
    },
  ];

  const dispatch = useDispatch();
  const func = () => {
    const stringData = localStorage.getItem('state');
    console.log('LocalStorage size: ', stringData?.length);
    const data = stringData
      ? (JSON.parse(stringData) as todoGroup[])
      : defaultData;
    dispatch(loadState({ data }));
    dispatch(setStateLoaded());
  };

  return func;
};
