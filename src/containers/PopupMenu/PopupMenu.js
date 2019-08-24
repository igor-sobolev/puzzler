import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export const PopupMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleClick (event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose () {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        size="small"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {props.children}
      </Menu>
    </div>
  )
}

PopupMenu.propTypes = {
  children: PropTypes.any
}
