import { Menu, Button, MenuItem, MenuList, Popper, Paper, Grow, ClickAwayListener} from '@material-ui/core'
import { Explore } from '@material-ui/icons';
import React, {useState, useReducer} from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { FaGlobeAfrica, FaTags, FaUserCircle } from "react-icons/fa";
import { getUser } from '../utils/utils';

export default function HeaderComponent() {
    const history = useHistory()
    const location = useLocation()

    const [user, setUser] = useState({})
    const [open, setOpen] = React.useState(false)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const anchorRef = React.useRef(null);

    React.useEffect(async () => {
        setOpen(false)
        forceUpdate()
        setUser(await getUser())
    }, [location])

    return (
        <div className="px-5 py-3 d-flex align-items-center" style={{borderBottom: "1px solid #f50057"}}>
            <Link to="/" className="text-decoration-none">
                <h1 className="text-danger font-weight-bold text-decoration-none">Places</h1>
            </Link>
            <div className="simple-menu mx-5" style={{flexGrow: 1}}>
                <Button 
                    ref={anchorRef} 
                    onClick={() => setOpen(!open)}
                    endIcon={<Explore color="secondary" />}
                >
                    Explore
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
                    style={{zIndex: 300}}
                >
                    {({ TransitionProps, placement }) => (
                       <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                       >
                            <Paper style={{backgroundColor: user && user.isDarkModeOn ? "#000" : ""}}>
                                <ClickAwayListener onClickAway={() => setOpen(false)}>
                                    <MenuList autoFocusItem={open}>
                                        <MenuItem>
                                            <Link to="/places" className="d-flex" style={{alignItems: 'center'}}>
                                                <p className="m-0 mx-3">Places</p>
                                                <FaGlobeAfrica color="#f50057" />
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="/tags" className="d-flex" style={{alignItems: 'center'}}>
                                                <p className="m-0 mx-3">Tags</p>
                                                <FaTags color="#f50057" />
                                            </Link>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow> 
                    )}
                </Popper>
            </div>
            <div>
                {
                    localStorage.getItem("token") ?

                    <Link to="/profile" className="primary-color">
                        <FaUserCircle size={40} color="#f50057"/>
                    </Link> :
                    <div>
                        <Link to="/register" className="text-decoration-none">
                            <Button variant="outlined" color="secondary" className="mx-2">Register</Button>
                        </Link>
                        <Link to="/login" className="text-decoration-none">
                            <Button variant="outlined" color="secondary" className="mx-2">Login</Button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
