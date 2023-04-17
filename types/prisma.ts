export type PrismaClientModels<T> = keyof Omit<
	T,
	| '$on'
	| '$connect'
	| '$disconnect'
	| '$use'
	| '$executeRaw'
	| '$executeRawUnsafe'
	| '$queryRaw'
	| '$queryRawUnsafe'
	| '$transaction'
	| '$transaction'
>
