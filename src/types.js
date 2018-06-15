// @flow

export type Message = {
  type: "ERROR" | "SUCCESS" | "INFO",
  title: string,
  message: string,
  timeout?: number
}
