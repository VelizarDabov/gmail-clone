import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropdownIcon from '@mui/icons-material/ArrowDownward';
import NotificationIcon from '@mui/icons-material/Notifications';
import AppIcon from '@mui/icons-material/Apps';
import { Avatar, IconButton} from '@mui/material';
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className='header__left'>
            <IconButton>
            <MenuIcon />
            </IconButton>
      <img src='https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail2020.logo.png' alt='' />
        </div>

        <div className='header__middle'>
<SearchIcon />
<input placeholder='Search meil' type='text'/>
<ArrowDropdownIcon className='header__inputCaret'/>

        </div>

        <div className='header__right'>
            <IconButton>
                <AppIcon />
            </IconButton>
<IconButton>
    <NotificationIcon />
</IconButton>
<Avatar/>
        </div>
       
   
    </div>
  )
}

export default Header