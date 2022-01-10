import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate  } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
const Navbar = () => {
  const navigate  = useNavigate ();
 
  return (
    <AppBar position="fixed" sx={{background:"#1e6667"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 6, display: { xs: 'none', md: 'flex' }, }}
          >
              Delivery Management
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                key={0}
                onClick={
                    ()=>{
                        navigate("/DeliveryPage")
                    }
                    }
                    startIcon={<LocalShippingIcon/>}
                sx={{ my: 2, color: 'white', display: 'flex',mr:2 }}
              >
                Deliveries
              </Button>

              <Button
                key={1}
                onClick={
                    ()=>{
                        navigate("/CustomerPage")
                    }
                    }
                    startIcon={<AccessibilityNewIcon/>}
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
                Customers
              </Button>
            
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;