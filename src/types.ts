import { RefObject, ReactElement } from 'react';

export type ConnectableElement = RefObject<any> | ReactElement | Element | null;
export type ElementRefWrapper = (elementOrNode: ConnectableElement) => ReactElement | null;

