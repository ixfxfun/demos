type LabelledValue<TValue> = LabelledSingleValue<TValue> | LabelledValues<TValue>;
type LabelledSingleValue<TValue> = {
    label: string;
    value: TValue | undefined;
};
type LabelledValues<TValue> = {
    label: string;
    values: Array<TValue>;
};
/**
 * Array-backed tree node
 */
type TreeNode<TValue> = {
    parent: TreeNode<TValue> | undefined;
    value: TValue | undefined;
    childrenStore: ReadonlyArray<TreeNode<TValue>>;
};
type SimplifiedNode<TValue> = {
    value: TValue | undefined;
    childrenStore: ReadonlyArray<SimplifiedNode<TValue>>;
};
type LabelledNode<TValue> = TreeNode<LabelledValue<TValue>>;
/**
 * Traversable Tree
 */
type TraversableTree<TValue> = {
    /**
     * Direct children of node
     */
    children(): IterableIterator<TraversableTree<TValue>>;
    getParent(): TraversableTree<TValue> | undefined;
    getValue(): TValue;
    getIdentity(): any;
};

export type { LabelledSingleValue as L, SimplifiedNode as S, TreeNode as T, TraversableTree as a, LabelledValue as b, LabelledNode as c, LabelledValues as d };
