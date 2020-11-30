import React, { useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Button, ButtonGroup, Col, Form } from "react-bootstrap";

function CarouselComponent({ items }) {
	const [carousel, setCarousel] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	// const slideTo = (i) => setCurrentIndex(i);
	// const onSlideChanged = (e) => setCurrentIndex(e.item);
	// const slideNext = () => setCurrentIndex(currentIndex + 1);
	// const slidePrev = () => setCurrentIndex(currentIndex - 1);

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 3 },
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
		<div className='caro-container rounded p-3'>
			<div className='d-flex justify-content-between'>
				<ButtonGroup className='pb-3'>
					<Button
						size='sm'
						onClick={() => carousel.slidePrev()}
						className='py-0'>
						{"<"}
					</Button>
					<Button
						size='sm'
						onClick={() => carousel.slideNext()}
						className='py-0'>
						{">"}
					</Button>
				</ButtonGroup>
				<h3>Tasks</h3>
				<Form className='w-50'>
					<Form.Group className='d-flex'>
						<Form.Label className='col-3 my-0 pr-2 d-flex justify-content-center align-items-center'>
							Sort By:
						</Form.Label>
						<Col className='px-0'>
							<Form.Control as='select' size='sm' custom>
								<option>Date Added</option>
								<option>Deadline</option>
								<option>Status</option>
							</Form.Control>
						</Col>
					</Form.Group>
				</Form>
			</div>

			<AliceCarousel
				mouseTracking
				// disableDotsControls
				disableButtonsControls
				items={renderedItems}
				responsive={responsive}
				ref={(el) => setCarousel(el)}
				// activeIndex={currentIndex}

				// onSlideChanged={onSlideChanged}
			/>
		</div>
	);
}

export default CarouselComponent;
