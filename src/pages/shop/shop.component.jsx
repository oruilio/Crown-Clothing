import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{

  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections');
    
    //whenever the collectionRef updates or whenever this code gets run for the first time
    //collectionRef will send us the snapshot representing the code of our collection array at the time when this code renders
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading:false })
    })
  }

  render(){
    const { match } = this.props;
    const { loading } = this.state;
    return(
      <div className='shop-page'>
        <Route exact path={`${match.path}`} 
          render={(props)=> <CollectionOverviewWithSpinner isLoading={loading} {...props} />} 
        />
        <Route path={`${match.path}/:collectionId`}  
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
