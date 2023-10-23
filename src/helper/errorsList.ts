export type ErrorsType = {
  type: string,
  value: string,
  msg: string,
  path: string,
  location: string
}


export const getListErrors = (err: ErrorsType[]): string[] => {
  return err.map(error => error.msg);
}