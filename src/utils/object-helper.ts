import { IUser } from '../redux/users_reducer';

export const updateObjectInArray = (
  items: IUser[],
  itemId: number,
  objName: keyof IUser,
  newObjProps: { followed: boolean },
) => {
  return items.map((u) => {
    if (u[objName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
