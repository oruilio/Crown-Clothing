import React from 'react';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {items
        .filter((item, idx) => idx < 4)
        .map(({ id, name }) => (
          <div key={id}>{name}</div>
        ))}
    </div>
  </div>
);

export default CollectionPreview;