import React, { useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Button, ButtonGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CompletionStatus from "./CompletionStatus";
import EntryModal from "./EntryModal";

function CarouselComponent(props) {
	const { items, title, classes } = props;
	const [carousel, setCarousel] = useState(null);

	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});

	const handleEdit = (item) => {
		setModalData(item);
		setModalShow(true);
	};

	const responsive = {
		0: { items: 1 },
		576: { items: 2 },
		768: { items: 3 },
		1024: { items: 4 },
	};

	const renderedItems = items.map((item, idx) => (
		<div
			key={idx}
			className='caro-item p-3 mx-2 rounded'
			onClick={() => handleEdit(item)}>
			{title === "tasks" ? (
				<small
					className='font-weight-bold truncate'
					title={
						classes.find((el) => el.classCode === item.classCode).className
					}>
					{classes.find((el) => el.classCode === item.classCode).className}
				</small>
			) : null}
			<h4 className='font-weight-bold truncate' title={item.name}>
				{item.name}
			</h4>
			<h6>
				Due: <span>{item.deadline}</span>
			</h6>
			<hr className='my-2' />
			<div className='d-flex justify-content-center'>
				<CompletionStatus status={item.status} />
			</div>
		</div>
	));

	return (
		<>
			<div className='caro-container rounded p-3'>
				<div className='d-flex justify-content-center align-items-center'>
					<Col className='px-0 d-flex w-100'>
						<ButtonGroup className='pt-0 pb-3 h-100'>
							<Button
								variant='outline-success'
								size='sm'
								onClick={() => carousel?.slidePrev()}
								className='py-auto'>
								{"<"}
							</Button>
							<Button
								variant='outline-success'
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
				</div>
				{items.length ? (
					<AliceCarousel
						// disableDotsControls
						mouseTracking
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
			<EntryModal
				modalShow={modalShow}
				setModalShow={setModalShow}
				dataItem={modalData}
				type='edit'
			/>
		</>
	);
}

export default CarouselComponent;
