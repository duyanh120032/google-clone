

  export interface Result {
      url: string;
      title: string;
      content: string;
      engine: string;
      parsed_url: string[];
      engines: string[];
      positions: number[];
      score: number;
      category: string;
      pretty_url: string;
  }

  export interface Url {
      title: string;
      url: string;
      entity: string;
  }

  export interface Attribute {
      label: string;
      value: string;
      entity: string;
  }

  export interface Infobox {
      infobox: string;
      id: string;
      content: string;
      img_src?: any;
      urls: Url[];
      attributes: Attribute[];
      engine: string;
      engines: string[];
  }

  export interface ISearch {
      query: string;
      number_of_results: number;
      results: Result[];
      answers: any[];
      corrections: any[];
      infoboxes: Infobox[];
      suggestions: string[];
      unresponsive_engines: string[][];
  }
