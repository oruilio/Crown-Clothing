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
    
    //fetch('https://firestore.googleapis.com/v1/projects/crwn-db-c5d37/databases/(default)/documents/collections')
    //.then(response => response.json())
    
    //we no longer leveraging the live updates stream style of the observable pattern
    collectionRef.get().then(snapshot => {
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
