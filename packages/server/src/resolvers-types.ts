import { GraphQLResolveInfo } from 'graphql';
import { ItemWithId } from 'library/src/libs/items/types.js';
import { GraphQLContext } from './graphql/types.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FilterBetween = {
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type FormError = {
  __typename?: 'FormError';
  key: Scalars['String']['output'];
  message: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Item = {
  __typename?: 'Item';
  _id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  errors?: Maybe<Array<FormError>>;
  node?: Maybe<Item>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem: ItemResponse;
};


export type MutationAddItemArgs = {
  name: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  end: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  start: Scalars['Int']['output'];
  totalNodes: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  item: Item;
  items?: Maybe<Array<Maybe<Item>>>;
};


export type QueryItemArgs = {
  _id: Scalars['String']['input'];
};

export type SelectOption = {
  __typename?: 'SelectOption';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  FilterBetween: FilterBetween;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FormError: ResolverTypeWrapper<FormError>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Item: ResolverTypeWrapper<ItemWithId>;
  ItemResponse: ResolverTypeWrapper<Omit<ItemResponse, 'node'> & { node?: Maybe<ResolversTypes['Item']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  SelectOption: ResolverTypeWrapper<SelectOption>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  FilterBetween: FilterBetween;
  Float: Scalars['Float']['output'];
  FormError: FormError;
  Int: Scalars['Int']['output'];
  Item: ItemWithId;
  ItemResponse: Omit<ItemResponse, 'node'> & { node?: Maybe<ResolversParentTypes['Item']> };
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  SelectOption: SelectOption;
  String: Scalars['String']['output'];
}>;

export type FormErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['FormError'] = ResolversParentTypes['FormError']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ItemResponse'] = ResolversParentTypes['ItemResponse']> = ResolversObject<{
  errors?: Resolver<Maybe<Array<ResolversTypes['FormError']>>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addItem?: Resolver<ResolversTypes['ItemResponse'], ParentType, ContextType, RequireFields<MutationAddItemArgs, 'name'>>;
}>;

export type PageInfoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  end?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNodes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<QueryItemArgs, '_id'>>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
}>;

export type SelectOptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SelectOption'] = ResolversParentTypes['SelectOption']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  FormError?: FormErrorResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemResponse?: ItemResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SelectOption?: SelectOptionResolvers<ContextType>;
}>;

