import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

class ShopPage extends React.Component{

  unsubscribeFromSnapshot = null;

  componentDidMount() {

    const collectionRef = firestore.collection('collections');
    
    //whenever the collectionRef updates or whenever this code gets run for the first time
    //collectionRef will send us the snapshot representing the code of our collection array at the time when this code renders
    collectionRef.onSnapshot(async snapshot => {
      convertCollectionsSnapshotToMap(snapshot)
    })
  }

  render(){
    const {match} = this.props;
    return(
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`}  component={CollectionPage}/>
      </div>
    )
  }
}

export default ShopPage;
