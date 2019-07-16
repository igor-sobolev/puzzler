import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { connect } from 'react-redux'

import { uploadAvatar, loadUserProfile } from '@/store/actions'

import { UserAvatar } from '@/components/UI/UserAvatar'
import { PageLayout } from '@/components/UI/PageLayout'
import { UserInfo } from '@/components/UI/UserInfo'
import { UploadDialog } from '@/components/Dialogs/UploadDialog'

class UserProfile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uploadAvatar: PropTypes.func,
    loadProfile: PropTypes.func,
    match: PropTypes.object,
    user: PropTypes.object
  }

  state = {
    uploadAvatar: false
  }

  onUploadOpenHandler = () => {
    this.setState({
      uploadAvatar: true
    })
  }

  onUploadCloseHandler = () => {
    this.setState({
      uploadAvatar: false
    })
  }

  componentDidMount () {
    this.props.loadProfile(this.props.match.params.id)
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
                  image={this.props.user.avatar}
                  onUpload={this.onUploadOpenHandler}
                />
              </Grid>
              <Grid item>
                <UserInfo user={this.props.user} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <UploadDialog
          open={this.state.uploadAvatar}
          onClose={this.onUploadCloseHandler}
          onSubmit={() => this.props.uploadAvatar(this.props.match.params.id)}
        />
      </PageLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadAvatar: (id) => dispatch(uploadAvatar(id)),
  loadProfile: (id) => dispatch(loadUserProfile(id))
})

const mapStateToProps = (state) => ({
  user: state.profile.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
