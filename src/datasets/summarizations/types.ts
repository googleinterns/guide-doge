export type SummarizationQuery = () => Summarization[];

export interface Summarization {
  text: string;
  validity: number;
}
