import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from "@mui/material/IconButton";

export default function Footer(){
    return(
        <section style={{backgroundColor:'black'}} className="shadow-lg mt-5 p-2">
            <div className="container-fluid pt-5 pb-1 ">
                <div className="col text-center text-white text-decoration-none">
                    <h6 className="pb-1 text-white">Follow Us:</h6>
                    <a href="#"  ><IconButton aria-label="delete" size="large" sx={{color:'white'}}><FacebookIcon /></IconButton></a>
                    <a href="#" ><IconButton aria-label="delete" size="large" sx={{color:'white'}}><InstagramIcon /></IconButton> </a>
                    <a href="#" ><IconButton aria-label="delete" size="large" sx={{color:'white'}}><TwitterIcon/></IconButton> </a>
                    <a href="#" ><IconButton aria-label="delete" size="large" sx={{color:'white'}}><YouTubeIcon/></IconButton> </a>
                </div>
            </div>

            <div className="container-fluid">
                <div className="col text-white text-center mt-3">
                    <h6 className="footer-head">Ceylon Spices Pvt Ltd</h6>
                    <h6 className="footer-link"> No 21, Sir Razik Fareed Mawatha, P.O. Box 856 Colombo 01, Sri Lanka.</h6>
                    <a className=" link-secondary link-offset-2 link-underline-opacity-0  mx-2 " href=""> Legal Notice </a>
                    <span className="vr"></span>
                    <a className=" link-secondary link-offset-2 link-underline-opacity-0  mx-2" href=""> Accessibility </a>
                    <span className="vr"></span>
                    <a className=" link-secondary link-offset-2 link-underline-opacity-0 mx-2" href=""> Security Measures </a>
                </div>
            </div>
        </section>
    );
}