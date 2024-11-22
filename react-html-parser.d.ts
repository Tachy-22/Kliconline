
declare module 'react-html-parser' {
  import { ReactElement } from 'react';
  
  function ReactHtmlParser(
    html: string,
    options?: {
      decodeEntities?: boolean;
      transform?: (node: any, index: number) => ReactElement | void | null;
      preprocessNodes?: (nodes: any[]) => any[];
    }
  ): ReactElement[];

  export = ReactHtmlParser;
}