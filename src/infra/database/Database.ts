export default interface Database {
  many(query: string, parameters: any): Promise<any>;
  one(query: string, parameters: any): Promise<any>;
  none(query: string, parameters: any): Promise<void>;
}
