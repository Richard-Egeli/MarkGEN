export interface CStruct {
  name: string;
  fields: Record<string, string>;
  comments: string;
}

export type CEnum = CStruct;
