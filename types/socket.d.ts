interface WebsimSocketParty {}

type KeyValue = { [key: string]: any };

interface CollectionAPI<T extends string> {
  getList: <TData extends KeyValue>() => Promise<
    (TData & {
      id: string;
      $type: T;
      created_at: string;
      updated_at: string;
      user_id: string;
      username: string;
    })[]
  >;
  create: <TData extends KeyValue>(
    data: TData
  ) => Promise<
    TData & {
      id: string;
      $type: T;
      created_at: string;
      username: string;
    }
  >;
  update: <T_Id extends string, TData extends KeyValue>(
    id: T_Id,
    data: TData
  ) => Promise<
    TData & {
      id: T_Id;
      $type: T;
      created_at: string;
      username: string;
    }
  >;
  upsert: (data: KeyValue) => Promise<KeyValue>;
  delete: (id: string) => Promise<void>;
  subscribe: (callback: (records: any[]) => void) => () => void;
  filter: (filters: KeyValue) => CollectionAPI<T>;
}

declare class WebsimSocket {
  constructor();

  readonly CONNECTING: 0;
  readonly OPEN: 1;
  readonly CLOSING: 2;
  readonly CLOSED: 3;

  readonly binaryType: "arraybuffer" | (string & {});
  readonly bufferedAmount: number;
  readonly extensions: string;
  readonly protocol: "ws" | "wss";
  readonly readyState: 0 | 1 | 2 | 3;
  readonly url: string;

  accept(): void;
  serializeAttachment(): void;
  deserializeAttachment(): void;

  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror: ((this: WebSocket, ev: Event) => any) | null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen: ((this: WebSocket, ev: Event) => any) | null;

  dispatchEvent(event: Event | MessageEvent | CloseEvent | ErrorEvent): boolean;

  onPeersChanged:
    | ((peers: {
        [clientId: string]: { avatarUrl: string; username: string };
      }) => any)
    | null;

  close(_code?: number, _reason?: string): void;
  send(data: string | object): void;

  collection<T extends string>($type: T): CollectionAPI<T>;

  clientId: string;

  party: unknown;
  peers: unknown;
  presence: unknown;
  roomState: unknown;
}

interface Window {
  readonly WebsimSocket: typeof WebsimSocket;
}
