import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

//turn the object collections into array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) :[]
)

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
  );