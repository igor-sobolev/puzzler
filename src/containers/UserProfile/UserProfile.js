import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { connect } from 'react-redux'

import { uploadAvatar } from '@/store/actions'

import { UserAvatar } from '@/components/UI/UserAvatar'
import { PageLayout } from '@/components/UI/PageLayout'
import { PageHeading } from '@/components/UI/PageHeading'
import { UserInfo } from '@/components/UI/UserInfo'
import { UploadDialog } from '@/components/Dialogs/UploadDialog'

const user = {
  avatar: 'https://www.remove.bg/images/samples/combined/s1.jpg',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com'
}

class UserProfile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uploadAvatar: PropTypes.func
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

  render () {
    return (
      <PageLayout>
        <PageHeading>User Profile</PageHeading>
        <Card>
          <CardContent>
            <Grid
              container
              direction="row"
              spacing={1}
            >
              <Grid item>
                <UserAvatar
                  image={user.avatar}
                  onUpload={this.onUploadOpenHandler}
                />
              </Grid>
              <Grid item>
                <UserInfo user={user} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <UploadDialog
          open={this.state.uploadAvatar}
          onClose={this.onUploadCloseHandler}
          onSubmit={this.props.uploadAvatar}
        />
      </PageLayout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadAvatar: () => dispatch(uploadAvatar())
})

export default connect(null, mapDispatchToProps)(UserProfile)
