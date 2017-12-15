import { Action } from '@ngrx/store';
import { ComponentDataLayout, AttachmentDataLayout } from './component.models';

export const QUERY  = '[Component] Query';
export const CREATE = '[Component] Create';
export const UPDATE = '[Component] Update';
export const DELETE = '[Component] Delete';

export const PROVIDE_MOCK_DATA = 'ProvideMockData';
export class ProvideMockData implements Action {
  readonly type = PROVIDE_MOCK_DATA;
  constructor(public components: ComponentDataLayout[]) { }
}

export const PROVIDE_MOCK_DATA_ATTACHMENTS = 'ProvideMockDataAttachments';
export class ProvideMockDataAttachments implements Action {
  readonly type = PROVIDE_MOCK_DATA_ATTACHMENTS;
  constructor(public attachments: AttachmentDataLayout[]) { }
}

export class Query implements Action {
  readonly type = QUERY;
  constructor() { }
}

export class Create implements Action {
  readonly type = CREATE;
  constructor() { }
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor() { }
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor() { }
}

export type All =
  ProvideMockData | ProvideMockDataAttachments;
