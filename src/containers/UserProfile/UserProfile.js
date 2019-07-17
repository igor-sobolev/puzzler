import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { connect } from 'react-redux'

import config from '@/properties'
import {
  uploadAvatar,
  loadUserProfile,
  openUploadAvatarDialog,
  closeUploadAvatarDialog
} from '@/store/actions'

import { UserAvatar } from '@/components/UI/UserAvatar'
import { PageLayout } from '@/components/UI/PageLayout'
import { UserInfo } from '@/components/UI/UserInfo'
import { UploadDialog } from '@/components/Dialogs/UploadDialog'

const { SERVER_URL } = config

class UserProfile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uploadAvatar: PropTypes.func,
    loadProfile: PropTypes.func,
    match: PropTypes.object,
    user: PropTypes.object,
    authenticatedUser: PropTypes.object,
    showUploadAvatarDialog: PropTypes.bool,
    openUploadAvatarDialog: PropTypes.func,
    closeUploadAvatarDialog: PropTypes.func
  }

  componentDidMount () {
    this.props.loadProfile(this.props.match.params.id)
  }

  resolveAvatar = () => {
    return this.props.user.avatar ? SERVER_URL + this.props.user.avatar : null
  }

  isCurrentUser = () => {
    return (
      this.props.authenticatedUser &&
      this.props.authenticatedUser._id &&
      this.props.authenticatedUser._id === this.props.user._id
    )
  }

  render () {
    return (
      <PageLayout title="User Profile">
        <Card>
          <CardContent>
            <Grid
              container
              direction="row"
              spacing={1}
            >
              <Grid item>
                <UserAvatar
                  image={this.resolveAvatar()}
                  onUpload={this.props.openUploadAvatarDialog}
                  isCurrentUser={this.isCurrentUser()}
                />
              </Grid>
              <Grid item>
                <UserInfo
                  user={this.props.user}
                  isCurrentUser={this.isCurrentUser()}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <UploadDialog
          open={this.props.showUploadAvatarDialog}
          onClose={this.props.closeUploadAvatarDialog}
          handleSubmit={() => this.props.uploadAvatar(this.props.match.params.id)}
        />
      </PageLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadAvatar: (id) => {
    console.log('dispatch')
    dispatch(uploadAvatar(id))
  },
  loadProfile: (id) => dispatch(loadUserProfile(id)),
  openUploadAvatarDialog: () => dispatch(openUploadAvatarDialog()),
  closeUploadAvatarDialog: () => dispatch(closeUploadAvatarDialog())
})

const mapStateToProps = (state) => ({
  user: state.profile.user,
  showUploadAvatarDialog: state.profile.uploadAvatar,
  authenticatedUser: state.auth.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)
