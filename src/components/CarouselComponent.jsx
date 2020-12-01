import React, { useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Button, ButtonGroup, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function CarouselComponent({ items, title }) {
	const [carousel, setCarousel] = useState(null);

	const responsive = {
		0: { items: 1 },
		576: { items: 2 },
		768: { items: 3 },
		1024: { items: 5 },
	};

	const completionStatus = (status) => {
		if (status === 0) {
			return (
				<div className='badge badge-primary flex-grow-1 p-2'>
					Status: Not Yet Started
				</div>
			);
		} else if (status === 1) {
			return (
				<div className='badge badge-warning flex-grow-1 p-2'>
					Status: On Going
				</div>
			);
		} else {
			return (
				<div className='badge badge-success flex-grow-1 p-2'>
					Status: Finished
				</div>
			);
		}
	};

	const truncate = {
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 1,
		overflow: "hidden",
		textOverflow: "ellipsis",
	};

	console.log(`${title} length is ${items.length}`);

	const renderedItems = items.map((item, idx) => (
		<div key={idx} className='caro-item p-3 mx-2 rounded'>
			<h6 className='font-weight-bold' style={truncate}>
				{item.classname}
			</h6>
			<h4 className='font-weight-bold' style={truncate}>
				{item.name}
			</h4>
			<h6>
				Due: <span>{item.deadline}</span>
			</h6>
			<hr className='my-2' />
			<div className='d-flex justify-content-center'>
				{completionStatus(item.status)}
			</div>
		</div>
	));

	return (
		<>
			<div className='caro-container rounded p-3'>
				<div className='d-flex justify-content-center align-items-center'>
					<Col sm={5} md={7} className='px-0 d-flex'>
						<ButtonGroup className='pt-0 pb-3 h-100'>
							<Button
								size='sm'
								onClick={() => carousel?.slidePrev()}
								className='py-auto'>
								{"<"}
							</Button>
							<Button
								size='sm'
								onClick={() => carousel?.slideNext()}
								className='py-auto'>
								{">"}
							</Button>
						</ButtonGroup>
						<h4 className='d-inline-block mx-3 my-0 py-0 text-capitalize'>
							<Link to={`/${title}`}>{title}</Link>
						</h4>
					</Col>
					<Form className='col-7 col-md-5 px-0'>
						<Form.Group className='d-flex'>
							<Form.Label
								className='d-inline my-0 pr-2'
								style={{ minWidth: "70px" }}>
								Sort By:
							</Form.Label>
							<Form.Control className='d-inline' as='select' size='sm' custom>
								<option>Date Added</option>
								<option>Deadline</option>
								<option>Status</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</div>
				{items.length ? (
					<AliceCarousel
						// disableDotsControls
						disableButtonsControls
						items={renderedItems}
						responsive={responsive}
						ref={(el) => setCarousel(el)}
						// activeIndex={currentIndex}
						// onSlideChanged={onSlideChanged}
					/>
				) : (
					<div className='bg-vdark text-center py-3 rounded'>
						<h6>
							Yay! You have no unfinished <Link to={`/${title}`}>{title}</Link>
						</h6>
					</div>
				)}
			</div>
		</>
	);
}

export default CarouselComponent;
