type SearchParamsSchema = { [key: string]: string | string[] | undefined };

export type SearchPageProps = {
  searchParams: SearchParamsSchema;
};
