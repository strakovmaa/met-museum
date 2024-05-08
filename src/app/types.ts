export type Painting = {
  title: string;
  artistDisplayName: string;
  objectDate: string;
  tags: Tag[];
  primaryImageSmall: string;
  medium: string;
  objectURL: string;
  isHighlight: boolean;
};

export type Tag = {
  term: string;
  AAT_URL: string;
  Wikidata_URL: string;
};
