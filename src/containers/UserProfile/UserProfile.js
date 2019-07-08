import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { UserAvatar } from '@/components/UI/UserAvatar'
import { PageLayout } from '@/components/UI/PageLayout'
import { PageHeading } from '@/components/UI/PageHeading'
import { UserInfo } from '@/components/UI/UserInfo'

const user = {
  avatar: 'https://www.remove.bg/images/samples/combined/s1.jpg',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com'
}

class UserProfile extends Component {
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
                <UserAvatar image={user.avatar} />
              </Grid>
              <Grid item>
                <UserInfo user={user} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </PageLayout>
    )
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object
}

export default UserProfile
