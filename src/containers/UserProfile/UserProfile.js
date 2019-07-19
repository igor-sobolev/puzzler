import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStyles, withStyles } from '@material-ui/styles'

import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import config from '@/properties'
import {
  uploadAvatar,
  loadUserProfile,
  openUploadAvatarDialog,
  closeUploadAvatarDialog,
  startEditProfile,
  endEditProfile
} from '@/store/actions'

import { UserAvatar } from '@/components/UI/UserAvatar'
import { PageLayout } from '@/components/UI/PageLayout'
import { UserInfo } from '@/components/UI/UserInfo'
import { UploadDialog } from '@/components/Dialogs/UploadDialog'

const { SERVER_URL } = config

const styles = createStyles((theme) => ({
  profileCard: {
    position: 'relative',
    overflow: 'visible'
  },
  editBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(30%, -30%)',
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  profileContainer: {
    padding: theme.spacing(0, 2, 0, 1)
  }
}))

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
    closeUploadAvatarDialog: PropTypes.func,
    handleEditStart: PropTypes.func,
    handleEditEnd: PropTypes.func,
    edit: PropTypes.bool
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
        <Card className={this.props.classes.profileCard}>
          <CardContent>
            <Container
              maxWidth="md"
              className={this.props.classes.profileContainer}
            >
              <Grid
                container
                direction="row"
                spacing={1}
              >
                <Grid item>
                  <UserAvatar
                    image={this.resolveAvatar()}
                    edit={this.props.edit}
                    onUpload={this.props.openUploadAvatarDialog}
                    isCurrentUser={this.isCurrentUser()}
                  />
                </Grid>
                <Grid item>
                  <UserInfo
                    edit={this.props.edit}
                    user={this.props.user}
                    isCurrentUser={this.isCurrentUser()}
                    handleCancel={this.props.handleEditEnd}
                  />
                </Grid>
              </Grid>
            </Container>
          </CardContent>
          {this.props.edit ? null : (
            <Fab
              size="small"
              className={this.props.classes.editBtn}
              onClick={this.props.handleEditStart}
            >
              <EditIcon />
            </Fab>
          )}
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
  closeUploadAvatarDialog: () => dispatch(closeUploadAvatarDialog()),
  handleEditStart: () => dispatch(startEditProfile()),
  handleEditEnd: () => dispatch(endEditProfile())
})

const mapStateToProps = (state) => ({
  user: state.profile.user,
  showUploadAvatarDialog: state.profile.uploadAvatar,
  authenticatedUser: state.auth.user,
  edit: state.profile.editProfile
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile))
