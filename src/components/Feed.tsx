import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import Loading from './Loading';
import PhotoHeader from './PhotoHeader';
import PhotoInfo from './PhotoInfo';
import CopyrightInfo from './CopyrightInfo';
import TransferOwnershipButton from './TransferOwnershipButton';
import { drawImageFromBytes } from '../utils/imageUtils';
import { last } from '../utils/misc';

import * as photoActions from '../redux/actions/photos';

import './Feed.scss';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.feed,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedFeed = (nextProps.feed != prevState.feed) && (nextProps.feed !== null)
    if (isUpdatedFeed) {
      return { isLoading: false }
    }
    return null
  }

  ComponentDidMount() {
    const { feed, getFeed } = this.props
    if (!feed) getFeed();
  }

  render() {
    const { feed, userAddress } = this.props
    if (this.state.isLoading) return <Loading />
    return (
      <div className="Feed">
        {
          feed.length !== 0
            ? feed.map(
              ({
                id,
                ownerHistory,
                data,
                name,
                location,
                caption,
                timestamp,
              }) => {
                const originalOwner = ownerHistory[0]
                const currentOwner = last(ownerHistory)
                const imageUrl = drawImageFromBytes(data)
                const issueDate = moment(timestamp * 1000).fromNow()
                return (
                  <div className="FeedPhoto" key={id}>
                    <PhotoHeader
                      currentOwner={currentOwner}
                      location={location}
                    />
                    <div className="FeedPhoto__image">
                      <img src={imageUrl} alt={name} />
                    </div>
                    <div className="FeedPhoto__info">
                      <PhotoInfo
                        name={name}
                        issueDate={issueDate}
                        caption={caption}
                      />
                      <CopyrightInfo
                        className="FeedPhoto__copyrightInfo"
                        id={id}
                        issueDate={issueDate}
                        originalOwner={originalOwner}
                        currentOwner={currentOwner}
                      />
                      {
                        userAddress === currentOwner && (
                          <TransferOwnershipButton
                            className="FeedPhoto__transferOwnership"
                            id={id}
                            issueDate={issueDate}
                            currentOwner={currentOwner}
                          />
                        )
                      }
                    </div>
                  </div>
                )
              })
            : <span className="Feed_empty">사진이 없어요 :D</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feed: state.photos.feed,
  userAddress: state.auth.address,
})

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(photoActions.getFeed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)