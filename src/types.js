// @flow

export type Message = {
  type: "ERROR" | "SUCCESS" | "PENDING",
  title: string,
  message: string,
  timeout?: number
}
