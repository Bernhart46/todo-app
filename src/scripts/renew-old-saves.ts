import { sorts, todoChild, todoGroup } from "../store/todo/todo-slice";

export function renewOldSaves(oldData: todoGroup[]): todoGroup[] {
  const newData = oldData.map((todoGroup) => {
    return {
      ...todoGroup,
      children: todoGroup.children.map((todoChild) => {
        return {
          ...todoChild,
          status: todoChild.status.toLowerCase(),
        } as todoChild;
      }),
      sort: todoGroup.sort || {
        not_started: "random" as sorts,
        in_progress: "random" as sorts,
        done: "random" as sorts,
      },
    };
  });

  return newData;
}
