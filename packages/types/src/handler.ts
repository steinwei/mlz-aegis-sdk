import { BaseClientType } from './';

export type EventTypes = 'error' | string;

export type NotifyFieldsType<T extends EventTypes = EventTypes> = (eventName: T, data?: any) => void;

export interface BaseHandlerType<T extends EventTypes = EventTypes, C extends BaseClientType = BaseClientType> {
  // 事件枚举
  name: T;
  // 监控事件，并在该事件中用notify通知订阅中心
  monitor: (this: C, notify: NotifyFieldsType<T>) => void;
  // 在monitor中触发数据并将数据传入当前函数，拿到数据做数据格式转换(会将tranform放入Subscrib的handers)
  transform?: (this: C, collectedData: any) => any;
  // 拿到转换后的数据进行breadcrumb、report等等操作
  consumer?: (this: C, transformedData: any) => void;
}
