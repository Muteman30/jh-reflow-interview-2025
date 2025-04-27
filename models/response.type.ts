export type ReflowServerResponse<T> = {
  status: string,
  requestTime: string,
  data: ReflowServerResponseData<T>
}

export type ReflowServerResponseData<T> = {
  total: number,
  limit: number,
  offset: number,
  count: number,
  items: T[]
}