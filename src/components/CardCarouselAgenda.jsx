import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Slider from "react-slick";
import { useWindowSize } from "../hooks/useWindowSize";
import "../styles/carousel.scss";

function CardCarousel({ items, collapsed, contentRef }) {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 770,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const size = useWindowSize();

	const tolerance = 55;
	const sidebarSize = 270 + tolerance;
	const sidebarCollapsedSize = 80 + tolerance;

	const widthControl = {
		width: !collapsed
			? size.width - sidebarSize
			: size.width - sidebarCollapsedSize,
		marginBottom: "3rem",
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


	const renderedItems = items.map((item, idx) => (
		<div
			key={idx}
			className='bg-dark rounded caro-item p-3'>
			<h6 className='font-weight-bold'>{item.classname}</h6>
			<h4 className='font-weight-bold'>{item.name}</h4>
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
		<div id='slider-width-control' style={widthControl}>
			<Slider className='slider-container mx-5 mt-3 p-3 rounded' {...settings}>
				{renderedItems}
				{renderedItems}
			</Slider>
		</div>
	);
}

export default CardCarousel;
