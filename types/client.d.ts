type ChatCompletionsMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string };

interface WebsimUser {
  id: string;
  username: string;
  avatar_url: `https://${string}`;
}

interface WebsimClientAPI {
  getUser(): Promise<WebsimUser>;
  /** Alias for getUser */
  getCurrentUser(): Promise<WebsimUser>;
  /**@deprecated Use getBootstrap instead */
  getDistinctId(): Promise<string>;
  getBootstrap(): Promise<{
    distinct_id: string;
    session_id: string;
  }>;
  getCreatedBy(): Promise<WebsimUser>;
  getCreator(): Promise<WebsimUser>;
  getCurrentProject(): Promise<{
    id: string;
    title: string;
    description: string;
  }>;
  getColorScheme(): Promise<"light" | "dark">;

  postComment({
    content,
    credits,
  }: {
    content: string;
    credits: number;
  }): Promise<{} | { error: "User has not interacted with the page" }>;

  addEventListener(
    eventType: "comment:created",
    callback: (data: any) => void
  ): () => void;

  upload: (file: File) => Promise<string>;

  chat: {
    completions: {
      create: ({
        messages,
        json,
      }: {
        messages: ChatCompletionsMessage[];
        json?: boolean;
      }) => Promise<ChatCompletionsMessage>;
    };
  };

  imageGen: (args: {
    prompt: string;
    aspect_ratio?: string;
    width?: number;
    height?: number;
    seed?: number;
    transparent?: boolean;
  }) => Promise<{ url: string }>;

  textToSpeech: (args: {
    text: string;
    voice?: string;
    voice_sample?: string;
  }) => Promise<{ url: string }>;

  experimental: {
    v0: {
      login: () => Promise<void>;

      /**
       * Saves the given htmlContent to a new websim site.
       * @param htmlContent html content to save
       * @returns object with id of the saved site
       */
      save(htmlContent: string): Promise<{ id: string }>;

      /**
       * Returns the HTML for the given siteId. Defaults to the current websimsite.
       * @param siteId
       * @returns HTML for the given siteId.
       */
      getHTML(siteId?: string): Promise<string>;
    };
  };

  internal_only_experimental: {};
}

declare const websim: WebsimClientAPI;

interface Window {
  readonly websim: WebsimClientAPI;
}
