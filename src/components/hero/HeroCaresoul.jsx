import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../assets/Caresoul/ComingSoon.png'
import image2 from '../../assets/Caresoul/Caresoul-1.png'
import image3 from '../../assets/Caresoul/Caresoul-2.png'
import image4 from '../../assets/Caresoul/Caresoul-3.png'
import image5 from '../../assets/Caresoul/Caresoul-4.png'
import image6 from '../../assets/Caresoul/Caresoul-5.png'
import image7 from '../../assets/Caresoul/Caresoul-6.png'
import image8 from '../../assets/Caresoul/Caresoul-8.png'
import Container from 'react-bootstrap/Container';


export default function HeroCaresoul(){
    return(

            <Container fluid="sm" className=" rounded-5 mt-3 w-75 ">
                <Carousel  fade className="shadow-sm" indicators={true}>
                    <Carousel.Item>
                        <img src={image1} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-1" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image2} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-2" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image3} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-3" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image4} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-4" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image5} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-5" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image6} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-5" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image7} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-5" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={image8} className="d-block w-100 rounded-5 shadow-lg" alt="caresoul-5" />
                    </Carousel.Item>
                </Carousel>
            </Container>





    );
}