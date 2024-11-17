export enum ORDER_STATUS {
  PREPARE = "PREPARE",
  SHIP = "SHIP",
  RECEIVE = "RECEIVE",
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
}

export function statusParamMapper(param: string) {
  if (param.startsWith("to"))
    if (param.toUpperCase().slice(2) in ORDER_STATUS)
      return ORDER_STATUS[param.toUpperCase().slice(2) as ORDER_STATUS];
    else return param;
  else if (param === "completed") return ORDER_STATUS.COMPLETED;
  else return param;
}
